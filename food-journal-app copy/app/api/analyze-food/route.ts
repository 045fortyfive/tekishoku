import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"

export async function POST(request: NextRequest) {
  try {
    const { image, type } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Remove data URL prefix if present
    const base64Image = image.replace(/^data:image\/[a-z]+;base64,/, "")

    const itemType = type === "liquid" ? "liquid/beverage" : "food"

    // Use the correct model name: grok-2-vision-1212 instead of grok-vision-beta
    const { text } = await generateText({
      model: xai("grok-2-vision-1212"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this ${itemType} image and provide:
1. The main ${itemType} name (be specific but concise)
2. Estimated calories for the portion shown
3. Estimated weight/volume in ounces (oz) for the portion shown
${
  type === "food"
    ? `
4. Estimated protein content in grams
5. Estimated vegetable servings (1 serving = 1 cup raw or 1/2 cup cooked vegetables)
`
    : `
4. Water content in fluid ounces (for hydration tracking)
`
}

For food: estimate protein content and vegetable servings
For liquids: estimate water content for hydration tracking

Respond in this exact JSON format:
{
  "foodName": "specific ${itemType} name",
  "calories": estimated_number,
  "oz": estimated_ounces_as_number,
  ${
    type === "food"
      ? `
  "protein": estimated_protein_grams,
  "vegetables": estimated_vegetable_servings,
  `
      : `
  "water": estimated_water_ounces,
  `
  }
  "confidence": "high/medium/low"
}

Be practical with estimates:
${
  type === "food"
    ? `
- Chicken breast (6oz): ~280 cal, 50g protein, 0 vegetables
- Broccoli (1 cup): ~25 cal, 3g protein, 1 serving vegetables
- Mixed salad (2 cups): ~20 cal, 2g protein, 2 servings vegetables
- Steak (8oz): ~400 cal, 60g protein, 0 vegetables
`
    : `
- Water: 0 calories, water content = total volume
- Coffee: ~5 calories per 8oz, water content = total volume
- Soda: ~150 calories per 12oz, water content = 0 (doesn't count for hydration)
- Juice: varies, water content = 80% of volume
`
}`,
            },
            {
              type: "image",
              image: base64Image,
            },
          ],
        },
      ],
      temperature: 0.1,
    })

    // Parse the AI response
    let result
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found in response")
      }
    } catch (parseError) {
      console.log("Failed to parse AI response as JSON:", text)
      // Fallback: try to extract values from text
      const foodNameMatch = text.match(/(?:food|item|liquid)[:\s]*([^,\n]+)/i)
      const caloriesMatch = text.match(/(\d+)\s*cal/i)
      const ozMatch = text.match(/(\d+(?:\.\d+)?)\s*oz/i)
      const proteinMatch = text.match(/(\d+(?:\.\d+)?)\s*g?\s*protein/i)
      const vegetableMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:serving|cup).*vegetable/i)
      const waterMatch = text.match(/(\d+(?:\.\d+)?)\s*oz.*water/i)

      result = {
        foodName: foodNameMatch?.[1]?.trim() || `Unknown ${itemType}`,
        calories: caloriesMatch ? Number.parseInt(caloriesMatch[1]) : type === "liquid" ? 0 : 200,
        oz: ozMatch ? Number.parseFloat(ozMatch[1]) : type === "liquid" ? 8 : 4,
        confidence: "low",
      }

      if (type === "food") {
        result.protein = proteinMatch ? Number.parseFloat(proteinMatch[1]) : 10
        result.vegetables = vegetableMatch ? Number.parseFloat(vegetableMatch[1]) : 0
      } else {
        result.water = waterMatch ? Number.parseFloat(waterMatch[1]) : result.oz
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error analyzing food image:", error)

    // Return a more helpful error message
    let errorMessage = "Failed to analyze image"
    if (error instanceof Error) {
      errorMessage = error.message
    }

    const itemType = request.json().then((data) => data.type) === "liquid" ? "liquid" : "food"

    const fallbackResult = {
      error: errorMessage,
      foodName: `Unknown ${itemType}`,
      calories: itemType === "liquid" ? 0 : 200,
      oz: itemType === "liquid" ? 8 : 4,
      confidence: "none",
    }

    if (itemType === "food") {
      fallbackResult.protein = 10
      fallbackResult.vegetables = 0
    } else {
      fallbackResult.water = 8
    }

    return NextResponse.json(fallbackResult, { status: 200 })
  }
}
