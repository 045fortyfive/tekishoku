import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { CareerMatch, UserProfile } from "../types";
import {
  MBTIResult as MBTIResultType,
  questions,
  calculateMBTIType,
  Answer,
  Question,
} from "../lib/mbti-questions";
import { calculateCareerMatches } from "../lib/career-matching";
import { CareerMatchResult, CareerDetailModal } from "../components/career";

const DiagnosisPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initiateQuizOnLoad = searchParams.get("initiate") === "true";

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [mbtiResult, setMbtiResult] = useState<MBTIResultType | null>(null);
  const [quizScreen, setQuizScreen] = useState<
    "start" | "questioning" | "results"
  >(initiateQuizOnLoad ? "questioning" : "start");

  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCareerForModal, setSelectedCareerForModal] =
    useState<CareerMatch | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);
  const [formSubmitError, setFormSubmitError] = useState<string | null>(null);
  const [formSubmitSuccess, setFormSubmitSuccess] = useState<boolean>(false);

  const totalQuestions = questions.length;

  const resetQuizState = () => {
    console.log("🔄 resetQuizState called, current quizScreen:", quizScreen);

    // 結果画面表示中は状態をリセットしない（強力な保護機能）
    if (quizScreen === "results") {
      console.log("⚠️ BLOCKING reset while on results screen");
      return;
    }

    setCurrentQuestionIndex(0);
    setAnswers([]);
    setMbtiResult(null);
    setCareerMatches([]);
    setError(null);
    console.log("✅ Quiz state reset completed");
  };

  useEffect(() => {
    // 結果画面では自動開始を無効化
    if (
      initiateQuizOnLoad &&
      quizScreen !== "questioning" &&
      quizScreen !== "results"
    ) {
      console.log("🎬 Auto-starting quiz due to initiateQuizOnLoad");
      resetQuizState();
      setQuizScreen("questioning");
    }
  }, [initiateQuizOnLoad, quizScreen]);

  const handleStartQuiz = () => {
    console.log("🎬 handleStartQuiz called, current quizScreen:", quizScreen);

    resetQuizState();
    setQuizScreen("questioning");
    console.log("🎯 Quiz started/restarted");
  };

  const handleAnswerSelect = (question: Question, value: number) => {
    const newAnswer: Answer = {
      questionId: question.id,
      dimension: question.dimension,
      value,
    };
    console.log("📝 Answer selected:", {
      questionId: question.id,
      questionText: question.text,
      dimension: question.dimension,
      value,
      currentQuestionIndex: currentQuestionIndex + 1,
    });

    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (a) => a.questionId === question.id,
      );
      let updatedAnswers;

      if (existingAnswerIndex > -1) {
        console.log("🔄 Updating existing answer for question", question.id);
        updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = newAnswer;
      } else {
        console.log("➕ Adding new answer for question", question.id);
        updatedAnswers = [...prevAnswers, newAnswer];
      }

      console.log("📊 Updated answers array:", {
        totalAnswers: updatedAnswers.length,
        expectedTotal: totalQuestions,
        isComplete: updatedAnswers.length === totalQuestions,
      });

      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    console.log("🔍 handleNextQuestion called:", {
      currentQuestionIndex,
      totalQuestions,
      isLastQuestion: currentQuestionIndex === totalQuestions - 1,
      answersCount: answers.length,
      currentAnswers: answers.map((a) => ({
        questionId: a.questionId,
        value: a.value,
      })),
    });

    if (currentQuestionIndex < totalQuestions - 1) {
      console.log("➡️ Moving to next question:", currentQuestionIndex + 1);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

      // 次の質問に移動時、適切なスクロール位置に調整
      setTimeout(() => {
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 50);
    } else {
      console.log(
        "🏁 Reached final question, will auto-transition via useEffect...",
      );
      // useEffectが40問完了を検知して自動的に結果画面に移行する
      // ここでは何もしない（重複を避けるため）
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);

      // 前の質問に戻る時、適切なスクロール位置に調整
      setTimeout(() => {
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 50);
    }
  };

  // キーボードナビゲーション対応
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (quizScreen !== "questioning") return;

      const currentQuestion = questions[currentQuestionIndex];
      const currentAnswer = answers.find(
        (a) => a.questionId === currentQuestion?.id,
      );

      switch (event.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
          event.preventDefault();
          const value = parseInt(event.key);
          handleAnswerSelect(currentQuestion, value);
          break;
        case "ArrowLeft":
          event.preventDefault();
          handlePreviousQuestion();
          break;
        case "ArrowRight":
        case "Enter":
          event.preventDefault();
          if (currentAnswer) {
            handleNextQuestion();
          }
          break;
        case "Escape":
          event.preventDefault();
          // 結果画面では Escape キーでのリセットを無効化
          if (quizScreen !== "results") {
            handleStartQuiz();
          }
          break;
      }
    },
    [
      quizScreen,
      currentQuestionIndex,
      answers,
      handleAnswerSelect,
      handlePreviousQuestion,
      handleNextQuestion,
      handleStartQuiz,
    ],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // 40問すべてに回答した時の自動結果計算（安定版）
  useEffect(() => {
    // 質問画面で、かつ40問すべてに回答済み、かつまだ結果が計算されていない場合のみ実行
    if (
      quizScreen === "questioning" &&
      answers.length === totalQuestions &&
      !mbtiResult
    ) {
      console.log(
        "🎯 All questions answered, auto-transitioning to results...",
      );

      // 少し遅延を入れて状態の競合を避ける
      const timer = setTimeout(() => {
        try {
          const result = calculateMBTIType(answers);
          console.log("✅ Auto MBTI calculation successful:", result);

          // 状態を一括で更新して競合を避ける
          setMbtiResult(result);
          setQuizScreen("results");
          setIsLoading(true); // キャリアマッチング用のローディング状態
          console.log("🎉 Auto-transitioned to results screen");

          // 結果画面表示時にページトップにスクロール
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 100);

          // キャリアマッチングを直接実行
          setTimeout(() => {
            try {
              console.log("🧮 Calculating career matches for:", result.type);
              const userProfile: Partial<UserProfile> = {
                mbtiType: result.type,
              };
              const matches = calculateCareerMatches(result.type, userProfile);
              console.log(
                "✅ Career matches calculated:",
                matches.length,
                "matches found",
              );

              if (matches.length === 0) {
                console.log("⚠️ No career matches found for:", result.type);
                setError(
                  `「${result.type}」に対応する適職データが見つかりませんでした。`,
                );
                setCareerMatches([]);
              } else {
                console.log("🎉 Setting career matches");
                setCareerMatches(matches);
              }
            } catch (e) {
              console.error("❌ Error calculating career matches:", e);
              const errorMessage =
                e instanceof Error ? e.message : "不明なエラーが発生しました";
              setError(
                `診断結果の取得中にエラーが発生しました: ${errorMessage}`,
              );
              setCareerMatches([]);
            } finally {
              console.log(
                "✅ Career matching completed, setting loading to false",
              );
              setIsLoading(false);
            }
          }, 500);
        } catch (error) {
          console.error("❌ Error in auto MBTI calculation:", error);
          setError(
            "診断結果の計算中にエラーが発生しました。診断をやり直してください。",
          );
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [answers.length, quizScreen, totalQuestions, mbtiResult]);

  // 結果画面表示時のスクロール制御
  useEffect(() => {
    if (quizScreen === "results") {
      // 結果画面に遷移した際は必ずページトップにスクロール
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [quizScreen]);

  // キャリアマッチング用のuseEffectは無効化（上記のuseEffectで直接実行）
  // useEffect(() => {
  //   if (quizScreen === 'results' && mbtiResult && careerMatches.length === 0 && !isLoading && !error) {
  //     console.log('🚀 Starting career matching for:', mbtiResult.type);
  //     runCareerMatching(mbtiResult.type);
  //   }
  // }, [quizScreen, mbtiResult, careerMatches.length, isLoading, error, runCareerMatching]);

  const handleCareerSelect = (match: CareerMatch) => {
    setSelectedCareerForModal(match);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCareerForModal(null);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    setFormSubmitError(null);
    setFormSubmitSuccess(false);

    const formData = new FormData(e.currentTarget);
    const formValues = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      mbtiType: formData.get("mbtiType") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/send-consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "申込の送信に失敗しました");
      }

      setFormSubmitSuccess(true);
      // フォームをリセット
      e.currentTarget.reset();
      
      // 3秒後に成功メッセージを非表示
      setTimeout(() => {
        setFormSubmitSuccess(false);
      }, 5000);
    } catch (error: any) {
      console.error("フォーム送信エラー:", error);
      setFormSubmitError(
        error.message || "申込の送信に失敗しました。しばらくしてから再度お試しください。"
      );
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const currentAnswerValue = answers.find(
    (a) => a.questionId === questions[currentQuestionIndex]?.id,
  )?.value;

  const answerOptions = [
    { label: "強くそう思わない", value: 1 },
    { label: "そう思わない", value: 2 },
    { label: "どちらでもない", value: 3 },
    { label: "そう思う", value: 4 },
    { label: "強くそう思う", value: 5 },
  ];

  if (quizScreen === "start") {
    return (
      <div className="min-h-screen bg-white text-slate-800 flex flex-col items-center justify-center p-4 text-center safe-area-left safe-area-right">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          AI適職診断
        </h1>
        <p className="text-base sm:text-lg mb-10 text-slate-600 max-w-md leading-relaxed">
          いくつかの簡単な質問に答えて、あなたに最適なキャリアを見つけましょう。
        </p>
        <button
          onClick={handleStartQuiz}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 px-10 rounded-xl text-lg sm:text-xl mobile-shadow-lg hover:shadow-xl mobile-transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 touch-target"
        >
          診断を始める
        </button>
      </div>
    );
  }

  if (quizScreen === "questioning") {
    const currentQuestion = questions[currentQuestionIndex];
    const progressPercentage =
      ((currentQuestionIndex + 1) / totalQuestions) * 100;

    console.log("🎯 Rendering questioning screen:", {
      currentQuestionIndex,
      questionId: currentQuestion?.id,
      questionText: currentQuestion?.text,
      progressPercentage,
      answersCount: answers.length,
    });

    // 固定ナビゲーションのため、bodyのoverflow制御は不要

    return (
      <div className="h-screen bg-slate-100 text-slate-800 flex flex-col safe-area-left safe-area-right safe-area-top safe-area-bottom overflow-hidden relative">
        {/* Screen reader announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          質問 {currentQuestionIndex + 1} / {totalQuestions}:{" "}
          {currentQuestion.text}
        </div>

        {/* Header with progress - Compact for mobile */}
        <div className="flex-shrink-0 px-4 py-1.5 bg-white border-b border-slate-200">
          <p
            className="text-sm text-slate-500 mb-1 text-center"
            aria-label={`質問 ${currentQuestionIndex + 1} / ${totalQuestions}`}
          >
            質問 {currentQuestionIndex + 1} / {totalQuestions}
          </p>
          <div className="w-full bg-slate-200 rounded-full h-1">
            <div
              className="bg-blue-500 h-1 rounded-full mobile-transition"
              style={{ width: `${progressPercentage}%` }}
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
              aria-label={`診断進捗 ${Math.round(progressPercentage)}%完了`}
            ></div>
          </div>
          <p
            className="text-xs text-slate-400 text-center mt-0.5"
            aria-label="キーボードショートカット"
          >
            1-5で回答、←→で移動、Enterで次へ
          </p>
        </div>

        {/* Main content area - Scrollable content */}
        <div
          className="flex-1 overflow-y-auto px-4 py-1 pb-20"
          id="main-content"
        >
          <div className="w-full max-w-md mx-auto">
            {/* Question - Fixed height container for 2 lines */}
            <div className="h-20 flex items-center justify-center mb-3">
              <h2
                id="question-text"
                className="text-base font-semibold text-slate-800 leading-snug text-center px-2 max-w-full"
              >
                {currentQuestion.text}
              </h2>
            </div>

            {/* Answer options */}
            <div
              className="space-y-2"
              role="radiogroup"
              aria-labelledby="question-text"
            >
              {answerOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswerSelect(currentQuestion, opt.value)}
                  className={`w-full text-left px-3 py-3 rounded-lg border-2 mobile-transition text-sm flex justify-between items-center min-h-[44px]
                    ${
                      currentAnswerValue === opt.value
                        ? "bg-blue-600 border-blue-500 text-white mobile-shadow font-semibold"
                        : "bg-white border-slate-300 hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 text-slate-700"
                    }`}
                  role="radio"
                  aria-checked={currentAnswerValue === opt.value}
                  aria-describedby={`option-${opt.value}-shortcut`}
                >
                  <span className="flex-1 pr-3 leading-relaxed">
                    {opt.label}
                  </span>
                  <span
                    id={`option-${opt.value}-shortcut`}
                    className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
                      currentAnswerValue === opt.value
                        ? "bg-blue-500 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {opt.value}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Bottom navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 safe-area-bottom z-10">
          <div className="flex justify-between items-center gap-3 max-w-md mx-auto">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="py-3 px-4 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mobile-transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 min-h-[44px] min-w-[44px] text-sm font-medium"
            >
              戻る
            </button>
            <div className="text-center flex-shrink-0">
              <button
                onClick={() => {
                  // 結果画面表示中は無効化
                  if (quizScreen !== "results") {
                    handleStartQuiz();
                  }
                }}
                className="text-xs text-slate-400 hover:text-slate-600 underline focus:outline-none py-2"
                disabled={quizScreen === "results"}
              >
                最初から
              </button>
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={currentAnswerValue === undefined}
              className="py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mobile-transition font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 min-h-[44px] min-w-[44px] text-sm"
            >
              {currentQuestionIndex === totalQuestions - 1
                ? "結果を見る"
                : "次へ"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  console.log("🎉 Rendering results screen:", {
    quizScreen,
    mbtiResult,
    answersCount: answers.length,
    careerMatches: careerMatches.length,
    isLoading,
    error,
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-3 sm:p-4 safe-area-left safe-area-right">
      <div className="container mx-auto max-w-4xl py-4 sm:py-6 md:py-8">
        <div className="text-center mb-6 sm:mb-8 p-4 sm:p-6 bg-white mobile-shadow-lg rounded-xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            診断結果
          </h1>
          {mbtiResult && (
            <p className="text-base sm:text-lg md:text-xl text-slate-600">
              あなたのMBTIタイプは:{" "}
              <strong className="text-blue-600 text-lg sm:text-xl md:text-2xl">
                {mbtiResult.type}
              </strong>
            </p>
          )}
        </div>

        {isLoading && (
          <div className="text-center py-10 mobile-loading">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-base sm:text-lg text-slate-600">
              適職情報を読み込んでいます...
            </p>
          </div>
        )}

        {error && !isLoading && (
          <div className="mobile-error rounded-lg mobile-shadow">
            <p className="text-lg sm:text-xl font-semibold text-red-700">
              エラー
            </p>
            <p className="text-red-600 mt-1">{error}</p>
          </div>
        )}

        {!isLoading && !error && careerMatches.length > 0 && mbtiResult && (
          <CareerMatchResult
            mbtiType={mbtiResult.type}
            matches={careerMatches}
            onCareerSelect={handleCareerSelect}
            showDetailedAnalysis={true}
          />
        )}

        {!isLoading &&
          !error &&
          mbtiResult &&
          careerMatches.length === 0 &&
          !error && (
            <div className="text-center py-8 px-4 bg-yellow-50 border border-yellow-200 rounded-lg mobile-shadow">
              <p className="text-lg sm:text-xl font-semibold text-yellow-700">
                結果なし
              </p>
              <p className="text-yellow-600 mt-1">
                {`「${mbtiResult.type}」に対応する適職データが見つかりませんでした。`}
              </p>
            </div>
          )}

        {/* CTA Section: タイプ別面談 */}
        {!isLoading &&
          !error &&
          mbtiResult &&
          careerMatches.length > 0 && (
            <div className="mt-10 sm:mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-xl shadow-lg border border-blue-100">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-slate-800 mb-4">
                タイプ別の面談で年収アップを目指しませんか？
              </h2>
              <p className="text-center text-slate-600 mb-6 text-sm sm:text-base">
                {mbtiResult.type}タイプのあなたに最適なキャリアパスを、専門家と一緒に考えませんか？
              </p>

              {/* LINE Button */}
              <div className="mb-6 text-center">
                <a
                  href="https://line.me/R/ti/p/@574xvdcr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B048] active:bg-[#049A3D] text-white font-semibold py-3 px-6 rounded-lg text-base sm:text-lg mobile-shadow-lg hover:shadow-xl mobile-transition focus:outline-none focus:ring-2 focus:ring-[#06C755] focus:ring-opacity-50 touch-target"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.348 0 .629.285.629.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.63.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.086.766.032 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  LINEで友だち追加
                </a>
              </div>

              {/* Application Form */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4 text-center">
                  面談申込フォーム
                </h3>
                
                {formSubmitSuccess && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm sm:text-base text-center">
                      ✓ 申込を受け付けました。確認メールを送信しました。
                    </p>
                  </div>
                )}

                {formSubmitError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm sm:text-base text-center">
                      {formSubmitError}
                    </p>
                  </div>
                )}

                <form
                  className="space-y-4"
                  onSubmit={handleFormSubmit}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                      placeholder="山田 太郎"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      電話番号
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                      placeholder="090-1234-5678"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mbtiType"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      MBTIタイプ
                    </label>
                    <input
                      type="text"
                      id="mbtiType"
                      name="mbtiType"
                      value={mbtiResult.type}
                      readOnly
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      ご質問・ご要望
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm sm:text-base"
                      placeholder="面談で聞きたいことやご要望があればご記入ください"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingForm}
                    className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg text-base sm:text-lg mobile-shadow-lg hover:shadow-xl mobile-transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 touch-target disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingForm ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                        送信中...
                      </span>
                    ) : (
                      "申し込む"
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

        <div className="mt-10 sm:mt-12 text-center safe-area-bottom">
          <button
            onClick={handleStartQuiz}
            className="bg-slate-600 hover:bg-slate-700 active:bg-slate-800 text-white font-semibold py-4 px-8 rounded-xl text-base sm:text-lg mobile-shadow-lg hover:shadow-xl mobile-transition focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 touch-target"
          >
            診断をやり直す
          </button>
        </div>
      </div>
      <CareerDetailModal
        match={selectedCareerForModal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default DiagnosisPage;
