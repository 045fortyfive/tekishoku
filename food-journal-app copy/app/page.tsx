"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  X,
  Settings,
  Camera,
  Upload,
  Loader2,
  Droplets,
  AlertTriangle,
  Target,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  oz?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  vegetables?: number; // servings
  water?: number; // oz
  time: string;
  type: "food" | "liquid";
}

interface UserProfile {
  name: string;
  targetCalories: number;
  targetProtein: number;
  targetVegetables: number;
  targetWater: number;
}

interface Goals {
  protein: boolean;
  vegetables: boolean;
  water: boolean;
}

export default function Dashboard() {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    targetCalories: 2000,
    targetProtein: 110, // grams for 6'1" 160lb 26yo male
    targetVegetables: 3, // servings
    targetWater: 64, // oz
  });
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [addType, setAddType] = useState<"food" | "liquid">("food");
  const [quickFood, setQuickFood] = useState({
    name: "",
    calories: "",
    oz: "",
    protein: "",
    vegetables: "",
    water: "",
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [photoMode, setPhotoMode] = useState(false);
  const [showDietCokeAlert, setShowDietCokeAlert] = useState(false);
  const [goalsAchieved, setGoalsAchieved] = useState<Goals>({
    protein: false,
    vegetables: false,
    water: false,
  });
  const [showConfetti, setShowConfetti] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dynamicFields, setDynamicFields] = useState([
    {
      id: "calories",
      label: "Calories",
      placeholder: "🔥 Calories",
      type: "number",
      required: true,
    },
    {
      id: "servings",
      label: "Servings",
      placeholder: "🍽️ Servings",
      type: "number",
      required: false,
    },
  ]);

  useEffect(() => {
    const savedEntries = localStorage.getItem("foodEntries");
    const savedProfile = localStorage.getItem("userProfile");

    if (savedEntries) {
      setFoodEntries(JSON.parse(savedEntries));
    }
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  const selectedDateEntries = foodEntries.filter((entry) => {
    const selectedDateString = selectedDate.toDateString();
    const entryDate = new Date(entry.time).toDateString();
    return selectedDateString === entryDate;
  });

  const selectedDateFood = selectedDateEntries.filter(
    (entry) => entry.type === "food",
  );
  const selectedDateLiquids = selectedDateEntries.filter(
    (entry) => entry.type === "liquid",
  );

  // Calculate totals
  const totalCalories = selectedDateEntries.reduce(
    (sum, entry) => sum + entry.calories,
    0,
  );
  const totalProtein = selectedDateEntries.reduce(
    (sum, entry) => sum + (entry.protein || 0),
    0,
  );
  const totalVegetables = selectedDateEntries.reduce(
    (sum, entry) => sum + (entry.vegetables || 0),
    0,
  );
  const totalWater = selectedDateEntries.reduce(
    (sum, entry) => sum + (entry.water || 0),
    0,
  );

  // Calculate progress
  const calorieProgress = (totalCalories / userProfile.targetCalories) * 100;
  const proteinProgress = (totalProtein / userProfile.targetProtein) * 100;
  const vegetableProgress =
    (totalVegetables / userProfile.targetVegetables) * 100;
  const waterProgress = (totalWater / userProfile.targetWater) * 100;

  const remainingCalories = userProfile.targetCalories - totalCalories;

  // Check for goal achievements
  useEffect(() => {
    const newGoals = {
      protein: totalProtein >= userProfile.targetProtein,
      vegetables: totalVegetables >= userProfile.targetVegetables,
      water: totalWater >= userProfile.targetWater,
    };

    // Trigger confetti for newly achieved goals
    Object.keys(newGoals).forEach((goal) => {
      const goalKey = goal as keyof Goals;
      if (newGoals[goalKey] && !goalsAchieved[goalKey]) {
        triggerConfetti(goal);
      }
    });

    setGoalsAchieved(newGoals);
  }, [totalProtein, totalVegetables, totalWater, userProfile]);

  const triggerConfetti = (goalType: string) => {
    setShowConfetti(goalType);
    setTimeout(() => setShowConfetti(null), 3000);
  };

  const checkForDietCoke = (name: string) => {
    const dietCokeVariants = [
      "diet coke",
      "diet cola",
      "coke zero",
      "zero coke",
      "diet pepsi",
      "pepsi zero",
      "diet soda",
    ];

    return dietCokeVariants.some((variant) =>
      name.toLowerCase().includes(variant),
    );
  };

  const analyzePhoto = async (file: File) => {
    setIsAnalyzing(true);

    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const response = await fetch("/api/analyze-food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64, type: addType }),
      });

      const result = await response.json();

      if (result.error) {
        console.warn("AI analysis warning:", result.error);
      }

      // Pre-populate the form with AI results or fallback data
      setQuickFood({
        name: result.foodName || "",
        calories: result.calories?.toString() || "",
        oz: result.oz?.toString() || "",
        protein: result.protein?.toString() || "",
        vegetables: result.vegetables?.toString() || "",
        water: result.water?.toString() || "",
      });

      setPhotoMode(false);
      setShowQuickAdd(true);
    } catch (error) {
      console.error("Error analyzing photo:", error);
      alert("Failed to analyze photo. Please enter food manually.");

      setPhotoMode(false);
      setShowQuickAdd(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      analyzePhoto(file);
      // Reset the input so the same file can be selected again
      event.target.value = "";
    }
  };

  const addQuickFood = () => {
    if (!quickFood.name.trim() || !quickFood.calories) return;

    // Check for diet coke before adding
    if (addType === "liquid" && checkForDietCoke(quickFood.name)) {
      setShowDietCokeAlert(true);
      setTimeout(() => setShowDietCokeAlert(false), 5000);
    }

    // Create date for selected day but with current time
    const entryDate = new Date(selectedDate);
    entryDate.setHours(new Date().getHours());
    entryDate.setMinutes(new Date().getMinutes());
    entryDate.setSeconds(new Date().getSeconds());

    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      name: quickFood.name.trim(),
      calories: Number.parseInt(quickFood.calories),
      oz: quickFood.oz ? Number.parseFloat(quickFood.oz) : undefined,
      protein: quickFood.protein
        ? Number.parseFloat(quickFood.protein)
        : undefined,
      vegetables: quickFood.vegetables
        ? Number.parseFloat(quickFood.vegetables)
        : undefined,
      water: quickFood.water ? Number.parseFloat(quickFood.water) : undefined,
      time: entryDate.toISOString(),
      type: addType,
    };

    const updatedEntries = [...foodEntries, newEntry];
    setFoodEntries(updatedEntries);
    localStorage.setItem("foodEntries", JSON.stringify(updatedEntries));

    // Reset form and dynamic fields
    setQuickFood({
      name: "",
      calories: "",
      oz: "",
      protein: "",
      vegetables: "",
      water: "",
    });
    setDynamicFields([
      {
        id: "calories",
        label: "Calories",
        placeholder: "🔥 Calories",
        type: "number",
        required: true,
      },
      {
        id: "servings",
        label: "Servings",
        placeholder: "🍽️ Servings",
        type: "number",
        required: false,
      },
    ]);
    setShowQuickAdd(false);
  };

  const deleteEntry = (id: string) => {
    const updatedEntries = foodEntries.filter((entry) => entry.id !== id);
    setFoodEntries(updatedEntries);
    localStorage.setItem("foodEntries", JSON.stringify(updatedEntries));
  };

  const recentFoods = [
    ...new Set(
      foodEntries
        .filter((entry) => entry.type === "food")
        .slice(-10)
        .map((entry) => ({
          name: entry.name,
          calories: entry.calories,
          oz: entry.oz,
          protein: entry.protein,
          vegetables: entry.vegetables,
        })),
    ),
  ].slice(0, 5);

  const recentLiquids = [
    ...new Set(
      foodEntries
        .filter((entry) => entry.type === "liquid")
        .slice(-10)
        .map((entry) => ({
          name: entry.name,
          calories: entry.calories,
          oz: entry.oz,
          water: entry.water,
        })),
    ),
  ].slice(0, 5);

  const addRecentItem = (item: any, type: "food" | "liquid") => {
    // Check for diet coke before adding
    if (type === "liquid" && checkForDietCoke(item.name)) {
      setShowDietCokeAlert(true);
      setTimeout(() => setShowDietCokeAlert(false), 5000);
    }

    // Create date for selected day but with current time
    const entryDate = new Date(selectedDate);
    entryDate.setHours(new Date().getHours());
    entryDate.setMinutes(new Date().getMinutes());
    entryDate.setSeconds(new Date().getSeconds());

    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      name: item.name,
      calories: item.calories,
      oz: item.oz,
      protein: item.protein,
      vegetables: item.vegetables,
      water: item.water,
      time: entryDate.toISOString(),
      type: type,
    };

    const updatedEntries = [...foodEntries, newEntry];
    setFoodEntries(updatedEntries);
    localStorage.setItem("foodEntries", JSON.stringify(updatedEntries));
  };

  const CircularProgress = ({
    progress,
    size = 80,
    strokeWidth = 8,
    color = "blue",
  }: {
    progress: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset =
      circumference - (Math.min(progress, 100) / 100) * circumference;

    return (
      <div
        className="relative"
        style={{ width: size, height: size }}
        data-oid="3pw-qu7"
      >
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          data-oid="kjuxr9h"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
            data-oid="el.ldwf"
          />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`text-${color}-500 transition-all duration-500 ease-out`}
            strokeLinecap="round"
            data-oid="u1er:ri"
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-oid="x-v.qi9"
        >
          <span
            className="text-xs font-semibold text-gray-700"
            data-oid="eclnlaf"
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-slate-100 p-4 relative overflow-hidden"
      data-oid="1yfjol1"
    >
      {/* Background Elements */}
      <div
        className="fixed inset-0 bg-blue-400/20 blur-3xl rounded-full w-96 h-96 -top-48 -left-48"
        data-oid="hrnx9p3"
      ></div>
      <div
        className="fixed inset-0 bg-purple-400/20 blur-3xl rounded-full w-80 h-80 top-1/3 -right-40"
        data-oid="zgi.zr-"
      ></div>
      <div
        className="fixed inset-0 bg-green-400/20 blur-3xl rounded-full w-72 h-72 bottom-0 left-1/3"
        data-oid="0dd:bwr"
      ></div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div
          className="fixed inset-0 pointer-events-none z-50"
          data-oid="-f:vbp_"
        >
          <div className="confetti-container" data-oid="2fd..3c">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: [
                    "#ff6b6b",
                    "#4ecdc4",
                    "#45b7d1",
                    "#96ceb4",
                    "#feca57",
                  ][Math.floor(Math.random() * 5)],
                }}
                data-oid="4uya7he"
              />
            ))}
          </div>
        </div>
      )}

      <div
        className="max-w-md mx-auto space-y-6 relative z-10"
        data-oid="pi1vm09"
      >
        {/* Header */}
        <div className="text-center space-y-4" data-oid="lm7hpih">
          <div
            className="flex items-center justify-center gap-3"
            data-oid="l48jmb4"
          >
            <div
              className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg"
              data-oid="zpbmwie"
            >
              <div className="text-2xl" data-oid="wkba9t:">
                🍱
              </div>
            </div>
            <div data-oid="qsufz-g">
              <h1
                className="text-3xl font-bold text-slate-800"
                data-oid="os2a:yu"
              >
                Bento
              </h1>
              <p className="text-sm text-slate-600" data-oid="0301zf0">
                Because I was hungry by{" "}
                <a
                  href="https://linkedin.com/in/emanuelperez8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                  data-oid="k5fs9fs"
                >
                  Emanuel
                </a>
              </p>
            </div>
            <Link href="/profile" data-oid="ikem9nu">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30"
                data-oid=":j180w8"
              >
                <Settings
                  className="h-5 w-5 text-slate-700"
                  data-oid="nbsfv:1"
                />
              </Button>
            </Link>
          </div>
        </div>

        {/* Date Navigation */}
        <div
          className="bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg p-4"
          data-oid="a_no6f9"
        >
          <div className="flex items-center justify-between" data-oid="96fo4z3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const prevDay = new Date(selectedDate);
                prevDay.setDate(prevDay.getDate() - 1);
                setSelectedDate(prevDay);
              }}
              className="bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 rounded-xl"
              data-oid="1cghig:"
            >
              <ChevronLeft className="h-4 w-4" data-oid="cvxlo-j" />
            </Button>

            <div className="text-center" data-oid="0uqrkxi">
              <h2
                className="text-lg font-semibold text-slate-800"
                data-oid="hssu6m3"
              >
                {selectedDate.toDateString() === new Date().toDateString()
                  ? "Today"
                  : selectedDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
              </h2>
              <p className="text-sm text-slate-600" data-oid="avzp_mc">
                {selectedDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const nextDay = new Date(selectedDate);
                nextDay.setDate(nextDay.getDate() + 1);
                setSelectedDate(nextDay);
              }}
              className="bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 rounded-xl"
              disabled={
                selectedDate.toDateString() === new Date().toDateString()
              }
              data-oid="hwbz24h"
            >
              <ChevronRight className="h-4 w-4" data-oid="x5a1d8a" />
            </Button>
          </div>

          {selectedDate.toDateString() !== new Date().toDateString() && (
            <div className="mt-3 text-center" data-oid="t7shpe.">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDate(new Date())}
                className="bg-white/30 backdrop-blur-xl border border-white/50 hover:bg-white/50 rounded-xl text-xs"
                data-oid="lfo9kq_"
              >
                Jump to Today
              </Button>
            </div>
          )}
        </div>

        {/* Diet Coke Alert */}
        {showDietCokeAlert && (
          <div
            className="bg-orange-100/80 backdrop-blur-xl border border-orange-200/50 rounded-2xl p-4 shadow-lg"
            data-oid="s2gytrd"
          >
            <div className="flex items-start gap-3" data-oid=":hslkan">
              <AlertTriangle
                className="h-5 w-5 text-orange-600 mt-0.5"
                data-oid="erxg-.i"
              />

              <div className="text-orange-800" data-oid="olpf9:i">
                <strong data-oid="dn60njo">Reality Check:</strong> You will not
                get 8-pack abs by the end of summer drinking Diet Coke! 🥤💪
              </div>
            </div>
          </div>
        )}

        {/* Goal Achievement Banner */}
        {showConfetti && (
          <div
            className="bg-green-100/80 backdrop-blur-xl border border-green-200/50 rounded-2xl p-4 shadow-lg"
            data-oid="36a976a"
          >
            <div className="flex items-center gap-3" data-oid="v1ibst_">
              <Trophy className="h-6 w-6 text-yellow-500" data-oid="s:fn3fp" />
              <div className="text-green-800" data-oid="1p8__un">
                <strong data-oid="8fw-est">🎉 Goal Achieved!</strong> You hit
                your {showConfetti} target! Keep it up! 💪
              </div>
            </div>
          </div>
        )}

        {/* Goals Dashboard */}
        <div
          className="bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg p-6"
          data-oid="_1n-913"
        >
          <div className="flex items-center gap-2 mb-4" data-oid="rb_33n2">
            <Target className="h-5 w-5 text-slate-700" data-oid="mj0xl3f" />
            <h2
              className="text-lg font-semibold text-slate-800"
              data-oid="hjhfgzd"
            >
              Daily Goals
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4" data-oid="-cxfhyx">
            {/* Protein Goal */}
            <div className="text-center" data-oid="zfmvyhq">
              <CircularProgress
                progress={proteinProgress}
                size={70}
                color="red"
                data-oid="m.zh.21"
              />

              <div className="mt-2" data-oid="q9:.8i9">
                <p
                  className="text-xs font-medium text-slate-700"
                  data-oid="mh200lc"
                >
                  Protein
                </p>
                <p className="text-xs text-slate-600" data-oid="nfusjqz">
                  {Math.round(totalProtein)}g / {userProfile.targetProtein}g
                </p>
                {goalsAchieved.protein && (
                  <div className="text-lg" data-oid="e-wfxmg">
                    🎯
                  </div>
                )}
              </div>
            </div>

            {/* Vegetables Goal */}
            <div className="text-center" data-oid="3nc-8ll">
              <CircularProgress
                progress={vegetableProgress}
                size={70}
                color="green"
                data-oid="ng_k9iy"
              />

              <div className="mt-2" data-oid="r45jv1p">
                <p
                  className="text-xs font-medium text-slate-700"
                  data-oid=".cnxg3k"
                >
                  Vegetables
                </p>
                <p className="text-xs text-slate-600" data-oid="_kznrlf">
                  {Math.round(totalVegetables)} / {userProfile.targetVegetables}{" "}
                  servings
                </p>
                {goalsAchieved.vegetables && (
                  <div className="text-lg" data-oid="xy0-h5h">
                    🥬
                  </div>
                )}
              </div>
            </div>

            {/* Water Goal */}
            <div className="text-center" data-oid="gcqo-op">
              <CircularProgress
                progress={waterProgress}
                size={70}
                color="blue"
                data-oid="6my3ppk"
              />

              <div className="mt-2" data-oid="wflkdnn">
                <p
                  className="text-xs font-medium text-slate-700"
                  data-oid="urnl97a"
                >
                  Water
                </p>
                <p className="text-xs text-slate-600" data-oid="r27ndp2">
                  {Math.round(totalWater)}oz / {userProfile.targetWater}oz
                </p>
                {goalsAchieved.water && (
                  <div className="text-lg" data-oid="h:0lxp6">
                    💧
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Calorie Progress */}
        <div
          className="bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg p-6"
          data-oid="a0j51n2"
        >
          <div
            className="flex items-center justify-between mb-3"
            data-oid="ha6:u86"
          >
            <span
              className="text-sm font-medium text-slate-700"
              data-oid="-bv8t9g"
            >
              Calorie Goal
            </span>
            <span className="text-sm text-slate-600" data-oid="quz_ehi">
              {totalCalories} / {userProfile.targetCalories}
            </span>
          </div>
          <div
            className="bg-white/30 rounded-full h-3 mb-3 overflow-hidden"
            data-oid="pkht4c6"
          >
            <div
              className="bg-blue-500/80 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(calorieProgress, 100)}%` }}
              data-oid="q6p6_fe"
            />
          </div>
          <p className="text-xs text-slate-600" data-oid="w03t1l4">
            {remainingCalories > 0
              ? `🎯 ${remainingCalories} calories left to reach your goal!`
              : `🔥 ${Math.abs(remainingCalories)} over goal - you're on fire!`}
          </p>
        </div>

        {/* Quick Add */}
        {!showQuickAdd ? (
          <div className="space-y-4" data-oid="am78_69">
            <div className="grid grid-cols-2 gap-3" data-oid="hpesfr7">
              <Button
                onClick={() => {
                  setAddType("food");
                  setShowQuickAdd(true);
                }}
                className="h-14 text-base bg-green-500/80 backdrop-blur-xl border border-green-400/30 hover:bg-green-500/90 text-white shadow-lg rounded-2xl"
                size="lg"
                data-oid="dincf46"
              >
                <Plus className="h-5 w-5 mr-2" data-oid="ejctz1x" />
                Add Food
              </Button>

              <Button
                onClick={() => {
                  setAddType("liquid");
                  setShowQuickAdd(true);
                }}
                className="h-14 text-base bg-blue-500/80 backdrop-blur-xl border border-blue-400/30 hover:bg-blue-500/90 text-white shadow-lg rounded-2xl"
                size="lg"
                data-oid="seuq-92"
              >
                <Droplets className="h-5 w-5 mr-2" data-oid=":cjedhk" />
                Add Liquid
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3" data-oid="aemwceb">
              <Button
                variant="outline"
                className="h-12 bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 rounded-2xl"
                disabled={isAnalyzing}
                onClick={() => setPhotoMode(true)}
                data-oid="xkchvdi"
              >
                {isAnalyzing ? (
                  <Loader2
                    className="h-4 w-4 mr-2 animate-spin"
                    data-oid="y8-q.az"
                  />
                ) : (
                  <Camera className="h-4 w-4 mr-2" data-oid="91x7qe0" />
                )}
                {isAnalyzing ? "Analyzing..." : "📸 Take Photo"}
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 rounded-2xl relative overflow-hidden"
                disabled={isAnalyzing}
                onClick={() => document.getElementById("photo-upload")?.click()}
                data-oid="ax0utno"
              >
                <Upload className="h-4 w-4 mr-2" data-oid="hkiqe5c" />
                📁 Upload Photo
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoCapture}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isAnalyzing}
                  data-oid="thfusm7"
                />
              </Button>
            </div>

            {/* Camera Modal */}
            {photoMode && (
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                data-oid="b2kd:5w"
              >
                <div
                  className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 w-full max-w-md shadow-2xl border border-white/50"
                  data-oid="zy6vuir"
                >
                  <div
                    className="flex items-center justify-between mb-4"
                    data-oid="73w3t4i"
                  >
                    <h3
                      className="font-semibold text-lg text-slate-800"
                      data-oid="1yn:6qj"
                    >
                      📸 Take Photo
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setPhotoMode(false)}
                      className="hover:bg-white/50 rounded-xl"
                      data-oid="b9vkz-v"
                    >
                      <X className="h-4 w-4" data-oid="b4d9u4:" />
                    </Button>
                  </div>

                  <div className="space-y-4" data-oid="zfy:kk6">
                    <video
                      ref={(video) => {
                        if (video && photoMode) {
                          navigator.mediaDevices
                            .getUserMedia({
                              video: {
                                facingMode: "environment",
                                width: { ideal: 1280 },
                                height: { ideal: 720 },
                              },
                            })
                            .then((stream) => {
                              video.srcObject = stream;
                              video.play();
                            })
                            .catch((err) => {
                              console.error("Error accessing camera:", err);
                              alert(
                                "Could not access camera. Please use upload instead.",
                              );
                              setPhotoMode(false);
                            });
                        }
                      }}
                      className="w-full rounded-2xl bg-gray-100 shadow-inner"
                      style={{ aspectRatio: "4/3" }}
                      playsInline
                      data-oid="7csrh6r"
                    />

                    <div className="flex gap-3" data-oid="g3_ak.e">
                      <Button
                        onClick={() => {
                          const video = document.querySelector(
                            "video",
                          ) as HTMLVideoElement;
                          if (video) {
                            const canvas = document.createElement("canvas");
                            canvas.width = video.videoWidth;
                            canvas.height = video.videoHeight;
                            const ctx = canvas.getContext("2d");
                            if (ctx) {
                              ctx.drawImage(video, 0, 0);
                              canvas.toBlob(
                                (blob) => {
                                  if (blob) {
                                    const file = new File(
                                      [blob],
                                      "camera-photo.jpg",
                                      { type: "image/jpeg" },
                                    );
                                    analyzePhoto(file);
                                    // Stop camera
                                    const stream =
                                      video.srcObject as MediaStream;
                                    if (stream) {
                                      stream
                                        .getTracks()
                                        .forEach((track) => track.stop());
                                    }
                                    setPhotoMode(false);
                                  }
                                },
                                "image/jpeg",
                                0.8,
                              );
                            }
                          }
                        }}
                        className="flex-1 bg-purple-500/80 backdrop-blur-xl border border-purple-400/30 hover:bg-purple-500/90 text-white rounded-2xl"
                        disabled={isAnalyzing}
                        data-oid="ui7je82"
                      >
                        {isAnalyzing ? (
                          <Loader2
                            className="h-4 w-4 mr-2 animate-spin"
                            data-oid="fefdb_j"
                          />
                        ) : (
                          <Camera className="h-4 w-4 mr-2" data-oid="wz6dyjd" />
                        )}
                        {isAnalyzing ? "Analyzing..." : "Capture"}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setPhotoMode(false)}
                        disabled={isAnalyzing}
                        className="bg-white/50 backdrop-blur-xl border border-white/50 hover:bg-white/70 rounded-2xl"
                        data-oid="7r05jv9"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg p-6 space-y-4"
            data-oid="aa8pynr"
          >
            <div
              className="flex items-center justify-between"
              data-oid="xjzgink"
            >
              <h3
                className="font-semibold text-lg flex items-center gap-2"
                data-oid="psh-dgr"
              >
                {addType === "food" ? (
                  <div
                    className="p-2 bg-green-100/50 backdrop-blur-xl rounded-xl border border-green-200/50"
                    data-oid="mu_ozhr"
                  >
                    <Plus
                      className="h-4 w-4 text-green-600"
                      data-oid="1dwsl-."
                    />
                  </div>
                ) : (
                  <div
                    className="p-2 bg-blue-100/50 backdrop-blur-xl rounded-xl border border-blue-200/50"
                    data-oid="onlki-z"
                  >
                    <Droplets
                      className="h-4 w-4 text-blue-600"
                      data-oid="nqh7mdj"
                    />
                  </div>
                )}
                Add {addType === "food" ? "Food" : "Liquid"}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowQuickAdd(false);
                  setQuickFood({
                    name: "",
                    calories: "",
                    oz: "",
                    protein: "",
                    vegetables: "",
                    water: "",
                  });
                }}
                className="hover:bg-white/30 rounded-xl"
                data-oid="a4npain"
              >
                <X className="h-4 w-4" data-oid="-s:1bms" />
              </Button>
            </div>

            <Input
              placeholder={
                addType === "food"
                  ? "🍎 Food name (e.g., Apple, Sandwich)"
                  : "🥤 Liquid name (e.g., Water, Coffee, Diet Coke)"
              }
              value={quickFood.name}
              onChange={(e) =>
                setQuickFood({ ...quickFood, name: e.target.value })
              }
              className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-2xl focus:border-purple-300/50"
              data-oid="1s.eyvj"
            />

            {/* Dynamic Fields */}
            <div className="space-y-3" data-oid="eh6z-uv">
              {dynamicFields.map((field, index) => (
                <div key={field.id} className="space-y-2" data-oid="eg2sij1">
                  <div
                    className="flex items-center justify-between"
                    data-oid="zplt1nt"
                  >
                    <label
                      className="text-sm font-medium text-slate-700"
                      data-oid="p:12lrb"
                    >
                      {field.label}
                    </label>
                    {!field.required && dynamicFields.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDynamicFields(
                            dynamicFields.filter((_, i) => i !== index),
                          );
                        }}
                        className="h-6 w-6 p-0 hover:bg-red-100/50 hover:text-red-600 rounded-lg"
                        data-oid="_vl7f7a"
                      >
                        <X className="h-3 w-3" data-oid="8h8uq2i" />
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-2" data-oid="ig-u3_r">
                    <Input
                      type={field.type}
                      step={field.type === "number" ? "0.1" : undefined}
                      placeholder={field.placeholder}
                      value={
                        field.id === "calories"
                          ? quickFood.calories
                          : field.id === "servings"
                            ? quickFood.oz
                            : ""
                      }
                      onChange={(e) => {
                        if (field.id === "calories") {
                          setQuickFood({
                            ...quickFood,
                            calories: e.target.value,
                          });
                        } else if (field.id === "servings") {
                          setQuickFood({ ...quickFood, oz: e.target.value });
                        }
                      }}
                      className="flex-1 bg-white/30 backdrop-blur-xl border border-white/50 rounded-2xl focus:border-purple-300/50"
                      data-oid="r5i..db"
                    />

                    <div className="flex flex-col" data-oid="c0znhie">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-6 p-0 hover:bg-white/30 rounded-sm"
                        onClick={() => {
                          const currentValue =
                            field.id === "calories"
                              ? quickFood.calories
                              : quickFood.oz;
                          const newValue =
                            (Number.parseFloat(currentValue) || 0) +
                            (field.id === "calories" ? 10 : 0.1);
                          if (field.id === "calories") {
                            setQuickFood({
                              ...quickFood,
                              calories: newValue.toString(),
                            });
                          } else {
                            setQuickFood({
                              ...quickFood,
                              oz: newValue.toString(),
                            });
                          }
                        }}
                        data-oid="h7iv7h4"
                      >
                        <span className="text-xs" data-oid="tij9.io">
                          ▲
                        </span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-6 p-0 hover:bg-white/30 rounded-sm"
                        onClick={() => {
                          const currentValue =
                            field.id === "calories"
                              ? quickFood.calories
                              : quickFood.oz;
                          const newValue = Math.max(
                            0,
                            (Number.parseFloat(currentValue) || 0) -
                              (field.id === "calories" ? 10 : 0.1),
                          );
                          if (field.id === "calories") {
                            setQuickFood({
                              ...quickFood,
                              calories: newValue.toString(),
                            });
                          } else {
                            setQuickFood({
                              ...quickFood,
                              oz: newValue.toString(),
                            });
                          }
                        }}
                        data-oid=".hk3y:y"
                      >
                        <span className="text-xs" data-oid="67t-sjj">
                          ▼
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Field Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const availableFields = [
                    {
                      id: "oz",
                      label: "Oz",
                      placeholder: "⚖️ Weight (oz)",
                      type: "number",
                      required: false,
                    },
                    {
                      id: "protein",
                      label: "Protein (g)",
                      placeholder: "🥩 Protein (g)",
                      type: "number",
                      required: false,
                    },
                    {
                      id: "vegetables",
                      label: "Vegetables",
                      placeholder: "🥬 Vegetables (servings)",
                      type: "number",
                      required: false,
                    },
                  ];

                  const existingIds = dynamicFields.map((f) => f.id);
                  const nextField = availableFields.find(
                    (f) => !existingIds.includes(f.id),
                  );

                  if (nextField) {
                    setDynamicFields([...dynamicFields, nextField]);
                  }
                }}
                className="w-full bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 rounded-2xl"
                disabled={dynamicFields.length >= 5}
                data-oid="uq-r3j7"
              >
                <Plus className="h-4 w-4 mr-2" data-oid="oxzw.zr" />
                Add Field
              </Button>
            </div>

            {addType === "liquid" && (
              <div className="space-y-2" data-oid="vpxau7g">
                <label
                  className="text-sm font-medium text-slate-700"
                  data-oid="b5zik0s"
                >
                  Water Content
                </label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="💧 Water content (oz)"
                  value={quickFood.water}
                  onChange={(e) =>
                    setQuickFood({ ...quickFood, water: e.target.value })
                  }
                  className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-2xl focus:border-purple-300/50"
                  data-oid="4i7372v"
                />
              </div>
            )}

            <Button
              onClick={addQuickFood}
              className={`w-full h-12 shadow-lg rounded-2xl text-white ${
                addType === "food"
                  ? "bg-green-500/80 backdrop-blur-xl border border-green-400/30 hover:bg-green-500/90"
                  : "bg-blue-500/80 backdrop-blur-xl border border-blue-400/30 hover:bg-blue-500/90"
              }`}
              disabled={!quickFood.name.trim() || !quickFood.calories}
              data-oid="bcnared"
            >
              ✨ Add {addType === "food" ? "Food" : "Liquid"}
            </Button>
          </div>
        )}

        {/* Recent Foods */}
        {recentFoods.length > 0 && (
          <div
            className="bg-green-50/50 backdrop-blur-xl rounded-3xl border border-green-200/30 shadow-lg"
            data-oid="s:rtpui"
          >
            <div
              className="p-4 pb-3 border-b border-green-200/30"
              data-oid="8vdmvfp"
            >
              <h3
                className="text-sm font-medium flex items-center gap-2 text-green-800"
                data-oid=":uj:zst"
              >
                <div
                  className="p-1 bg-green-100/50 backdrop-blur-xl rounded-lg border border-green-200/50"
                  data-oid="dzvj2jm"
                >
                  <Target
                    className="h-3 w-3 text-green-600"
                    data-oid="t-ye_30"
                  />
                </div>
                🍽️ Recent Foods
              </h3>
            </div>
            <div className="p-4 pt-3" data-oid="y82xrf0">
              <div className="flex flex-wrap gap-2" data-oid="2_7au1h">
                {recentFoods.map((food, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => addRecentItem(food, "food")}
                    className="text-xs bg-white/30 backdrop-blur-xl border border-green-200/50 hover:bg-white/50 rounded-xl"
                    data-oid="gnb2rhh"
                  >
                    {food.name} ({food.calories}cal)
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recent Liquids */}
        {recentLiquids.length > 0 && (
          <div
            className="bg-blue-50/50 backdrop-blur-xl rounded-3xl border border-blue-200/30 shadow-lg"
            data-oid="al9:iv2"
          >
            <div
              className="p-4 pb-3 border-b border-blue-200/30"
              data-oid="l212h_:"
            >
              <h3
                className="text-sm font-medium flex items-center gap-2 text-blue-800"
                data-oid="_2samxp"
              >
                <div
                  className="p-1 bg-blue-100/50 backdrop-blur-xl rounded-lg border border-blue-200/50"
                  data-oid="8lb4zcc"
                >
                  <Droplets
                    className="h-3 w-3 text-blue-600"
                    data-oid="5ksqdu3"
                  />
                </div>
                💧 Recent Liquids
              </h3>
            </div>
            <div className="p-4 pt-3" data-oid="beq6ikz">
              <div className="flex flex-wrap gap-2" data-oid="mvi03hz">
                {recentLiquids.map((liquid, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => addRecentItem(liquid, "liquid")}
                    className="text-xs bg-white/30 backdrop-blur-xl border border-blue-200/50 hover:bg-white/50 rounded-xl"
                    data-oid="n7wzoop"
                  >
                    {liquid.name} ({liquid.calories}cal)
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Today's Food */}
        {selectedDateFood.length > 0 && (
          <div
            className="bg-green-50/50 backdrop-blur-xl rounded-3xl border border-green-200/30 shadow-lg"
            data-oid="l805yp-"
          >
            <div
              className="p-4 pb-3 border-b border-green-200/30"
              data-oid="wbydzx-"
            >
              <h3
                className="text-sm font-medium flex items-center gap-2 text-green-800"
                data-oid=".tdrhxc"
              >
                <div
                  className="p-1 bg-green-100/50 backdrop-blur-xl rounded-lg border border-green-200/50"
                  data-oid="rk2nu.w"
                >
                  <Target
                    className="h-3 w-3 text-green-600"
                    data-oid="bg:kiw0"
                  />
                </div>
                🍽️{" "}
                {selectedDate.toDateString() === new Date().toDateString()
                  ? "Today's"
                  : "Day's"}{" "}
                Food
              </h3>
            </div>
            <div className="p-4 pt-3" data-oid="axl9ndn">
              <div className="space-y-3" data-oid="ie_4.34">
                {selectedDateFood
                  .slice()
                  .reverse()
                  .map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50"
                      data-oid="qjjfseh"
                    >
                      <div className="flex-1" data-oid="3oh_1dh">
                        <p
                          className="font-medium text-sm text-gray-800"
                          data-oid="s4y60r4"
                        >
                          {entry.name}
                        </p>
                        <p className="text-xs text-gray-600" data-oid="qct-_mq">
                          🔥 {entry.calories} cal
                          {entry.protein && ` • 🥩 ${entry.protein}g protein`}
                          {entry.vegetables && ` • 🥬 ${entry.vegetables} veg`}
                          {entry.oz && ` • ⚖️ ${entry.oz} oz`} •{" "}
                          {new Date(entry.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEntry(entry.id)}
                        className="h-8 w-8 hover:bg-red-100/50 hover:text-red-600 rounded-xl"
                        data-oid="043:i0f"
                      >
                        <X className="h-3 w-3" data-oid="k21s4ag" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Today's Liquids */}
        {selectedDateLiquids.length > 0 && (
          <div
            className="bg-blue-50/50 backdrop-blur-xl rounded-3xl border border-blue-200/30 shadow-lg"
            data-oid="f6x790j"
          >
            <div
              className="p-4 pb-3 border-b border-blue-200/30"
              data-oid="yinmo8a"
            >
              <h3
                className="text-sm font-medium flex items-center gap-2 text-blue-800"
                data-oid="_223i8b"
              >
                <div
                  className="p-1 bg-blue-100/50 backdrop-blur-xl rounded-lg border border-blue-200/50"
                  data-oid="-2y3vwv"
                >
                  <Droplets
                    className="h-3 w-3 text-blue-600"
                    data-oid="_6ja022"
                  />
                </div>
                💧{" "}
                {selectedDate.toDateString() === new Date().toDateString()
                  ? "Today's"
                  : "Day's"}{" "}
                Liquids
              </h3>
            </div>
            <div className="p-4 pt-3" data-oid="av9_k0f">
              <div className="space-y-3" data-oid="y0uov9r">
                {selectedDateLiquids
                  .slice()
                  .reverse()
                  .map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50"
                      data-oid="5jp1w21"
                    >
                      <div className="flex-1" data-oid="3h95oso">
                        <p
                          className="font-medium text-sm text-gray-800"
                          data-oid="lxy253z"
                        >
                          {entry.name}
                        </p>
                        <p className="text-xs text-gray-600" data-oid="29:9n6o">
                          🔥 {entry.calories} cal
                          {entry.water && ` • 💧 ${entry.water}oz water`}
                          {entry.oz && ` • ⚖️ ${entry.oz} oz`} •{" "}
                          {new Date(entry.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEntry(entry.id)}
                        className="h-8 w-8 hover:bg-red-100/50 hover:text-red-600 rounded-xl"
                        data-oid="fb5g.7p"
                      >
                        <X className="h-3 w-3" data-oid="fdkf9mm" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedDateFood.length === 0 && selectedDateLiquids.length === 0 && (
          <div
            className="bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg p-8 text-center"
            data-oid="vp3l6iv"
          >
            <div className="space-y-3" data-oid="4shmhxx">
              <div className="text-4xl" data-oid="x:b3k0u">
                🍱
              </div>
              <p className="text-gray-700 font-medium" data-oid="gs-s1lk">
                No food or liquids logged for{" "}
                {selectedDate.toDateString() === new Date().toDateString()
                  ? "today"
                  : "this day"}
              </p>
              <p className="text-xs text-gray-600" data-oid="09kkd2b">
                Start tracking your intake above and reach your goals! ✨
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx data-oid="_.of7.:">{`
        .confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #f0f;
          animation: confetti-fall 3s linear infinite;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
