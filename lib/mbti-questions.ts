
export interface Question {
  id: number;
  text: string;
  dimension: "EI" | "SN" | "TF" | "JP";
  // The following define the meaning of a high score (e.g. 4 or 5)
  // For EI, a high score means E. For SN, a high score means S.
  // For TF, a high score means T. For JP, a high score means J.
}

export const questions: Question[] = [
  // E/I Questions (High score = E, Low score = I)
  { id: 1, text: "大人数のパーティーや集まりに参加した後、エネルギーが満たされた感じがする", dimension: "EI" },
  { id: 2, text: "長時間の社交の後は、一人で過ごす時間が必要だと感じる", dimension: "EI" }, // Inverted
  { id: 3, text: "初対面の人との会話を自分から始めることが多い", dimension: "EI" },
  { id: 4, text: "考えを整理するときは、誰かと話すことで明確になることが多い", dimension: "EI" },
  { id: 5, text: "活動的で忙しい生活スタイルを好む", dimension: "EI" },
  { id: 6, text: "集中している作業を中断されると、イライラすることが多い", dimension: "EI" }, // Inverted
  { id: 7, text: "広い友人・知人ネットワークを持つことを好む", dimension: "EI" },
  { id: 8, text: "行動する前に十分に考える時間を取りたい", dimension: "EI" }, // Inverted
  { id: 9, text: "グループの中で注目を集めることが苦にならない", dimension: "EI" },
  { id: 10, text: "多くの人と浅く交流するより、少数の人と深く交流する方を好む", dimension: "EI" }, // Inverted

  // S/N Questions (High score = S, Low score = N)
  { id: 11, text: "会話で細部よりも全体的な概念や意味に注目する", dimension: "SN" }, // Inverted
  { id: 12, text: "問題を解決するとき、実証済みの方法を好む", dimension: "SN" },
  { id: 13, text: "現在の現実よりも将来の可能性について考えることが多い", dimension: "SN" }, // Inverted
  { id: 14, text: "直感的な印象よりも、具体的な事実や証拠を信頼する", dimension: "SN" },
  { id: 15, text: "実践的な応用よりも理論的な概念に興味を持つ", dimension: "SN" }, // Inverted
  { id: 16, text: "説明するとき、比喩やアナロジーを多用する", dimension: "SN" }, // Inverted
  { id: 17, text: "革新的なアイデアよりも、実用的なスキルの習得に時間を使いたい", dimension: "SN" },
  { id: 18, text: "物事の間のパターンや関連性に自然と気づくことが多い", dimension: "SN" }, // Inverted
  { id: 19, text: "具体的で詳細な指示を好む", dimension: "SN" },
  { id: 20, text: "安定性と予測可能性よりも、変化と新しい刺激を求める", dimension: "SN" }, // Inverted

  // T/F Questions (High score = T, Low score = F)
  { id: 21, text: "決断をするとき、人々の感情よりも論理的な分析を重視する", dimension: "TF" },
  { id: 22, text: "議論において、調和を保つより真実を追求することを重視する", dimension: "TF" },
  { id: 23, text: "フィードバックを与えるとき、思いやりよりも率直さを優先する", dimension: "TF" },
  { id: 24, text: "人間関係の問題に直面したとき、感情的な側面より実用的な解決策を探す", dimension: "TF" },
  { id: 25, text: "他者の問題を分析するより、共感することが自然である", dimension: "TF" }, // Inverted
  { id: 26, text: "人や状況を評価するとき、公平性と一貫性を最も重視する", dimension: "TF" },
  { id: 27, text: "感情を表現することよりも感情をコントロールすることを重視する", dimension: "TF" },
  { id: 28, text: "対立を解決するとき、人間関係への影響より問題の論理的解決を優先する", dimension: "TF" },
  { id: 29, text: "他者の批判を個人的に受け止めることが少ない", dimension: "TF" },
  { id: 30, text: "困難な決断でも、一度下した決断への自信がある", dimension: "TF" },

  // J/P Questions (High score = J, Low score = P)
  { id: 31, text: "予定や計画を事前に立てることを好む", dimension: "JP" },
  { id: 32, text: "締め切り直前よりも早めに作業を完了させたい", dimension: "JP" },
  { id: 33, text: "整理された環境で作業することを好む", dimension: "JP" },
  { id: 34, text: "さらなる情報を待つよりも、利用可能な情報で決断したい", dimension: "JP" },
  { id: 35, text: "急な計画変更にストレスを感じることが多い", dimension: "JP" },
  { id: 36, text: "一つのプロジェクトを完了させてから次に移ることを好む", dimension: "JP" },
  { id: 37, text: "決断を下す前に、できるだけ多くの選択肢を探りたい", dimension: "JP" }, // Inverted
  { id: 38, text: "詳細なスケジュールやTo-Doリストを作成して従うことが多い", dimension: "JP" },
  { id: 39, text: "仕事と遊びの明確な区別を持っている", dimension: "JP" },
  { id: 40, text: "日々の活動に自然と構造と順序を組み込む傾向がある", dimension: "JP" },
];


// Reduced number of questions for quicker testing
// export const questions: Question[] = [
//     // E/I Questions (High score = E, Low score = I)
//     { id: 1, text: "大人数のパーティーや集まりに参加した後、エネルギーが満たされた感じがする", dimension: "EI" },
//     { id: 2, text: "長時間の社交の後は、一人で過ごす時間が必要だと感じる", dimension: "EI" }, 
//     // S/N Questions (High score = S, Low score = N)
//     { id: 11, text: "会話で細部よりも全体的な概念や意味に注目する", dimension: "SN" }, 
//     { id: 12, text: "問題を解決するとき、実証済みの方法を好む", dimension: "SN" },
//     // T/F Questions (High score = T, Low score = F)
//     { id: 21, text: "決断をするとき、人々の感情よりも論理的な分析を重視する", dimension: "TF" },
//     { id: 22, text: "議論において、調和を保つより真実を追求することを重視する", dimension: "TF" },
//     // J/P Questions (High score = J, Low score = P)
//     { id: 31, text: "予定や計画を事前に立てることを好む", dimension: "JP" },
//     { id: 32, text: "締め切り直前よりも早めに作業を完了させたい", dimension: "JP" },
// ];


export interface Answer {
  questionId: number;
  dimension: "EI" | "SN" | "TF" | "JP";
  value: number; // 1-5 (Strongly Disagree to Strongly Agree)
}

export interface DimensionScores {
  E: number; I: number;
  S: number; N: number;
  T: number; F: number;
  J: number; P: number;
}

export interface PreferenceResult {
  preference: string;
  strength: number; // Percentage (0-100)
  score1: number;
  score2: number;
}

export interface Preferences {
  EI: PreferenceResult;
  SN: PreferenceResult;
  TF: PreferenceResult;
  JP: PreferenceResult;
}

export interface MBTIResult {
  type: string;
  preferences: Preferences;
}

// Inverted questions: A high score (e.g., 5) means the opposite for the primary trait of the dimension.
// E.g., for EI, primary is E. If Q is inverted, 5 means more I.
const INVERTED_QUESTION_IDS: Record<"EI" | "SN" | "TF" | "JP", number[]> = {
    EI: [2, 6, 8, 10], // Q2: "一人で過ごす時間が必要" (I)
    SN: [11, 13, 15, 16, 18, 20], // Q11: "全体的な概念や意味に注目" (N)
    TF: [25], // Q25: "共感することが自然" (F)
    JP: [37], // Q37: "多くの選択肢を探りたい" (P)
};


export function calculateMBTIType(answers: Answer[]): MBTIResult {
  console.log('🧮 Starting MBTI calculation with', answers.length, 'answers');

  if (answers.length === 0) {
    throw new Error('No answers provided for MBTI calculation');
  }

  if (answers.length !== 40) {
    console.warn('⚠️ Expected 40 answers, got', answers.length);
  }

  const dimensionScores: DimensionScores = {
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0,
  };

  // Count answers per dimension for validation
  const dimensionCounts = { EI: 0, SN: 0, TF: 0, JP: 0 };

  answers.forEach((answer) => {
    const { questionId, dimension, value } = answer;

    if (!dimension || value === undefined || value === null) {
      console.error('❌ Invalid answer:', answer);
      throw new Error(`Invalid answer for question ${questionId}`);
    }

    if (value < 1 || value > 5) {
      console.error('❌ Invalid answer value:', value, 'for question', questionId);
      throw new Error(`Invalid answer value ${value} for question ${questionId}. Must be 1-5.`);
    }

    dimensionCounts[dimension]++;

    const score = value - 3; // Convert 1-5 scale to -2 to +2 (0 is neutral)

    // Determine if the question is inverted for its dimension's primary trait
    const isCurrentQuestionInverted = INVERTED_QUESTION_IDS[dimension].includes(questionId);

    switch (dimension) {
      case "EI": // Primary: E, Secondary: I
        if (isCurrentQuestionInverted) { // High score means I
            if (score > 0) dimensionScores.I += score;
            else if (score < 0) dimensionScores.E += Math.abs(score);
        } else { // High score means E
            if (score > 0) dimensionScores.E += score;
            else if (score < 0) dimensionScores.I += Math.abs(score);
        }
        break;
      case "SN": // Primary: S, Secondary: N
        if (isCurrentQuestionInverted) { // High score means N
            if (score > 0) dimensionScores.N += score;
            else if (score < 0) dimensionScores.S += Math.abs(score);
        } else { // High score means S
            if (score > 0) dimensionScores.S += score;
            else if (score < 0) dimensionScores.N += Math.abs(score);
        }
        break;
      case "TF": // Primary: T, Secondary: F
        if (isCurrentQuestionInverted) { // High score means F
            if (score > 0) dimensionScores.F += score;
            else if (score < 0) dimensionScores.T += Math.abs(score);
        } else { // High score means T
            if (score > 0) dimensionScores.T += score;
            else if (score < 0) dimensionScores.F += Math.abs(score);
        }
        break;
      case "JP": // Primary: J, Secondary: P
        if (isCurrentQuestionInverted) { // High score means P
            if (score > 0) dimensionScores.P += score;
            else if (score < 0) dimensionScores.J += Math.abs(score);
        } else { // High score means J
            if (score > 0) dimensionScores.J += score;
            else if (score < 0) dimensionScores.P += Math.abs(score);
        }
        break;
    }
  });

  console.log('📊 Dimension answer counts:', dimensionCounts);
  console.log('📊 Final dimension scores:', dimensionScores);

  // Validate that we have answers for all dimensions
  Object.entries(dimensionCounts).forEach(([dimension, count]) => {
    if (count === 0) {
      throw new Error(`No answers found for dimension ${dimension}`);
    }
  });

  const preferences: Preferences = {
    EI: calculatePreferenceStrength(dimensionScores.E, dimensionScores.I, "E", "I"),
    SN: calculatePreferenceStrength(dimensionScores.S, dimensionScores.N, "S", "N"),
    TF: calculatePreferenceStrength(dimensionScores.T, dimensionScores.F, "T", "F"),
    JP: calculatePreferenceStrength(dimensionScores.J, dimensionScores.P, "J", "P"),
  };

  const type = preferences.EI.preference + preferences.SN.preference + preferences.TF.preference + preferences.JP.preference;

  console.log('✅ MBTI calculation complete:', {
    type,
    preferences: {
      EI: `${preferences.EI.preference} (${preferences.EI.strength.toFixed(1)}%)`,
      SN: `${preferences.SN.preference} (${preferences.SN.strength.toFixed(1)}%)`,
      TF: `${preferences.TF.preference} (${preferences.TF.strength.toFixed(1)}%)`,
      JP: `${preferences.JP.preference} (${preferences.JP.strength.toFixed(1)}%)`
    }
  });

  return { type, preferences };
}

function calculatePreferenceStrength(
  score1: number, // Score for the first pole (e.g., E)
  score2: number, // Score for the second pole (e.g., I)
  pole1: string,  // Label for the first pole
  pole2: string   // Label for the second pole
): PreferenceResult {
  const totalMagnitude = Math.abs(score1) + Math.abs(score2);

  if (totalMagnitude === 0) {
    // Undifferentiated or perfectly balanced. Default to the first pole with 0% strength beyond neutral.
    // Or, one could argue this means 50/50, but in MBTI terms, it's often a slight preference.
    // Let's indicate it as a weak preference for pole1.
    return { preference: pole1, strength: 0, score1, score2 }; 
  }
  
  // Max possible score for a dimension (e.g. 5 questions * 2 points each = 10)
  // This needs to be adjusted based on the actual number of questions per dimension.
  // For simplicity, let's use the sum of absolute scores as the basis for percentage.
  // This will represent "strength of preference" rather than absolute position on a scale.

  if (score1 === 0 && score2 === 0) {
    // truly neutral, very slight preference for pole1 by convention
    return { preference: pole1, strength: 0, score1, score2 };
  }

  if (score1 >= score2) {
    return { preference: pole1, strength: totalMagnitude === 0 ? 50 : (score1 / totalMagnitude) * 100, score1, score2 };
  } else {
    return { preference: pole2, strength: totalMagnitude === 0 ? 50 : (score2 / totalMagnitude) * 100, score1, score2 };
  }
}
