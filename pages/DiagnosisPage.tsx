
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CareerMatch, UserProfile } from '../types';
import { MBTIResult as MBTIResultType, questions, calculateMBTIType, Answer, Question } from '../lib/mbti-questions';
import { calculateCareerMatches } from '../lib/career-matching';
import { CareerMatchResult, CareerDetailModal } from '../components/career';
import AIChatView from '../components/ai/AIChatView'; // Import the new AI Chat component

const DiagnosisPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initiateQuizOnLoad = searchParams.get('initiate') === 'true';

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [mbtiResult, setMbtiResult] = useState<MBTIResultType | null>(null);
  const [quizScreen, setQuizScreen] = useState<'start' | 'questioning' | 'results'>(initiateQuizOnLoad ? 'questioning' : 'start');
  
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCareerForModal, setSelectedCareerForModal] = useState<CareerMatch | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAIChat, setShowAIChat] = useState<boolean>(false);


  const totalQuestions = questions.length;

  const resetQuizState = () => {
    console.log('🔄 resetQuizState called, current quizScreen:', quizScreen);

    // 結果画面表示中は状態をリセットしない（強力な保護機能）
    if (quizScreen === 'results') {
      console.log('⚠️ BLOCKING reset while on results screen');
      return;
    }

    setCurrentQuestionIndex(0);
    setAnswers([]);
    setMbtiResult(null);
    setCareerMatches([]);
    setError(null);
    setShowAIChat(false);
    console.log('✅ Quiz state reset completed');
  };

  useEffect(() => {
    // 結果画面では自動開始を無効化
    if (initiateQuizOnLoad && quizScreen !== 'questioning' && quizScreen !== 'results') {
      console.log('🎬 Auto-starting quiz due to initiateQuizOnLoad');
      resetQuizState();
      setQuizScreen('questioning');
    }
  }, [initiateQuizOnLoad, quizScreen]);


  const handleStartQuiz = () => {
    console.log('🎬 handleStartQuiz called, current quizScreen:', quizScreen);

    resetQuizState();
    setQuizScreen('questioning');
    console.log('🎯 Quiz started/restarted');
  };

  const handleAnswerSelect = (question: Question, value: number) => {
    const newAnswer: Answer = { questionId: question.id, dimension: question.dimension, value };
    console.log('📝 Answer selected:', {
      questionId: question.id,
      questionText: question.text,
      dimension: question.dimension,
      value,
      currentQuestionIndex: currentQuestionIndex + 1
    });

    setAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(a => a.questionId === question.id);
      let updatedAnswers;

      if (existingAnswerIndex > -1) {
        console.log('🔄 Updating existing answer for question', question.id);
        updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = newAnswer;
      } else {
        console.log('➕ Adding new answer for question', question.id);
        updatedAnswers = [...prevAnswers, newAnswer];
      }

      console.log('📊 Updated answers array:', {
        totalAnswers: updatedAnswers.length,
        expectedTotal: totalQuestions,
        isComplete: updatedAnswers.length === totalQuestions
      });

      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    console.log('🔍 handleNextQuestion called:', {
      currentQuestionIndex,
      totalQuestions,
      isLastQuestion: currentQuestionIndex === totalQuestions - 1,
      answersCount: answers.length,
      currentAnswers: answers.map(a => ({ questionId: a.questionId, value: a.value }))
    });

    if (currentQuestionIndex < totalQuestions - 1) {
      console.log('➡️ Moving to next question:', currentQuestionIndex + 1);
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      console.log('🏁 Reached final question, will auto-transition via useEffect...');
      // useEffectが40問完了を検知して自動的に結果画面に移行する
      // ここでは何もしない（重複を避けるため）
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  // キーボードナビゲーション対応
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (quizScreen !== 'questioning') return;

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

    switch (event.key) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
        event.preventDefault();
        const value = parseInt(event.key);
        handleAnswerSelect(currentQuestion, value);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        handlePreviousQuestion();
        break;
      case 'ArrowRight':
      case 'Enter':
        event.preventDefault();
        if (currentAnswer) {
          handleNextQuestion();
        }
        break;
      case 'Escape':
        event.preventDefault();
        // 結果画面では Escape キーでのリセットを無効化
        if (quizScreen !== 'results') {
          handleStartQuiz();
        }
        break;
    }
  }, [quizScreen, currentQuestionIndex, answers, handleAnswerSelect, handlePreviousQuestion, handleNextQuestion, handleStartQuiz]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const runCareerMatching = useCallback((mbtiType: string) => {
    console.log('🎯 runCareerMatching called with:', mbtiType);

    if (!mbtiType) {
      console.error('❌ No MBTI type provided to runCareerMatching');
      setError('MBTIタイプが正しく計算されませんでした。');
      return;
    }

    console.log('🔄 Setting loading state for career matching');
    setIsLoading(true);
    setError(null);

    // Simulate API delay for better UX
    setTimeout(() => {
      try {
        console.log('🧮 Calculating career matches for:', mbtiType);
        const userProfile: Partial<UserProfile> = { mbtiType };
        const matches = calculateCareerMatches(mbtiType, userProfile);
        console.log('✅ Career matches calculated:', matches.length, 'matches found');

        if (matches.length === 0) {
          console.log('⚠️ No career matches found for:', mbtiType);
          setError(`「${mbtiType}」に対応する適職データが見つかりませんでした。診断をやり直すか、しばらく時間をおいてから再度お試しください。`);
          setCareerMatches([]);
          setShowAIChat(false);
        } else {
          console.log('🎉 Setting career matches and enabling AI chat');
          setCareerMatches(matches);
          setShowAIChat(true);
        }
      } catch (e) {
        console.error("❌ Error calculating career matches:", e);
        const errorMessage = e instanceof Error ? e.message : '不明なエラーが発生しました';
        setError(`診断結果の取得中にエラーが発生しました: ${errorMessage}`);
        setCareerMatches([]);
        setShowAIChat(false);
      } finally {
        console.log('✅ Career matching completed, setting loading to false');
        setIsLoading(false);
      }
    }, 300);
  }, []);

  // 40問すべてに回答した時の自動結果計算（安定版）
  useEffect(() => {
    // 質問画面で、かつ40問すべてに回答済み、かつまだ結果が計算されていない場合のみ実行
    if (quizScreen === 'questioning' && answers.length === totalQuestions && !mbtiResult) {
      console.log('🎯 All questions answered, auto-transitioning to results...');

      // 少し遅延を入れて状態の競合を避ける
      const timer = setTimeout(() => {
        try {
          const result = calculateMBTIType(answers);
          console.log('✅ Auto MBTI calculation successful:', result);

          // 状態を一括で更新して競合を避ける
          setMbtiResult(result);
          setQuizScreen('results');
          setIsLoading(true); // キャリアマッチング用のローディング状態
          console.log('🎉 Auto-transitioned to results screen');

          // キャリアマッチングを直接実行
          setTimeout(() => {
            try {
              console.log('🧮 Calculating career matches for:', result.type);
              const userProfile: Partial<UserProfile> = { mbtiType: result.type };
              const matches = calculateCareerMatches(result.type, userProfile);
              console.log('✅ Career matches calculated:', matches.length, 'matches found');

              if (matches.length === 0) {
                console.log('⚠️ No career matches found for:', result.type);
                setError(`「${result.type}」に対応する適職データが見つかりませんでした。`);
                setCareerMatches([]);
                setShowAIChat(false);
              } else {
                console.log('🎉 Setting career matches and enabling AI chat');
                setCareerMatches(matches);
                setShowAIChat(true);
              }
            } catch (e) {
              console.error("❌ Error calculating career matches:", e);
              const errorMessage = e instanceof Error ? e.message : '不明なエラーが発生しました';
              setError(`診断結果の取得中にエラーが発生しました: ${errorMessage}`);
              setCareerMatches([]);
              setShowAIChat(false);
            } finally {
              console.log('✅ Career matching completed, setting loading to false');
              setIsLoading(false);
            }
          }, 500);
        } catch (error) {
          console.error('❌ Error in auto MBTI calculation:', error);
          setError('診断結果の計算中にエラーが発生しました。診断をやり直してください。');
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [answers.length, quizScreen, totalQuestions, mbtiResult]);

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
  
  const handleAIChatEndNavigate = () => {
    navigate('/career');
  };

  const currentAnswerValue = answers.find(a => a.questionId === questions[currentQuestionIndex]?.id)?.value;

  const answerOptions = [
    { label: "強くそう思わない", value: 1 },
    { label: "そう思わない", value: 2 },
    { label: "どちらでもない", value: 3 },
    { label: "そう思う", value: 4 },
    { label: "強くそう思う", value: 5 },
  ];
  
  if (quizScreen === 'start') {
    return (
      <div className="min-h-screen bg-white text-slate-800 flex flex-col items-center justify-center p-4 text-center safe-area-left safe-area-right">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">AI適職診断</h1>
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

  if (quizScreen === 'questioning') {
    const currentQuestion = questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    console.log('🎯 Rendering questioning screen:', {
      currentQuestionIndex,
      questionId: currentQuestion?.id,
      questionText: currentQuestion?.text,
      progressPercentage,
      answersCount: answers.length
    });

    // 固定ナビゲーションのため、bodyのoverflow制御は不要

    return (
      <div className="h-screen bg-slate-100 text-slate-800 flex flex-col safe-area-left safe-area-right safe-area-top safe-area-bottom overflow-hidden relative">
        {/* Screen reader announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          質問 {currentQuestionIndex + 1} / {totalQuestions}: {currentQuestion.text}
        </div>

        {/* Header with progress - Compact for mobile */}
        <div className="flex-shrink-0 px-4 py-2 bg-white border-b border-slate-200">
          <p className="text-sm text-slate-500 mb-1 text-center" aria-label={`質問 ${currentQuestionIndex + 1} / ${totalQuestions}`}>
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
          <p className="text-xs text-slate-400 text-center mt-1" aria-label="キーボードショートカット">
            1-5で回答、←→で移動、Enterで次へ
          </p>
        </div>

        {/* Main content area - Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
          <div className="w-full max-w-md mx-auto flex flex-col justify-center min-h-full">
            {/* Question */}
            <h2 id="question-text" className="text-base font-semibold mb-4 text-slate-800 leading-relaxed text-center">
              {currentQuestion.text}
            </h2>

            {/* Answer options */}
            <div className="space-y-2" role="radiogroup" aria-labelledby="question-text">
              {answerOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswerSelect(currentQuestion, opt.value)}
                  className={`w-full text-left px-3 py-3 rounded-lg border-2 mobile-transition text-sm flex justify-between items-center min-h-[44px]
                    ${currentAnswerValue === opt.value
                      ? 'bg-blue-600 border-blue-500 text-white mobile-shadow font-semibold'
                      : 'bg-white border-slate-300 hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 text-slate-700'}`}
                  role="radio"
                  aria-checked={currentAnswerValue === opt.value}
                  aria-describedby={`option-${opt.value}-shortcut`}
                >
                  <span className="flex-1 pr-3 leading-relaxed">{opt.label}</span>
                  <span
                    id={`option-${opt.value}-shortcut`}
                    className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
                      currentAnswerValue === opt.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-200 text-slate-500'
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
                  if (quizScreen !== 'results') {
                    handleStartQuiz();
                  }
                }}
                className="text-xs text-slate-400 hover:text-slate-600 underline focus:outline-none py-2"
                disabled={quizScreen === 'results'}
              >
                最初から
              </button>
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={currentAnswerValue === undefined}
              className="py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mobile-transition font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 min-h-[44px] min-w-[44px] text-sm"
            >
              {currentQuestionIndex === totalQuestions - 1 ? "結果を見る" : "次へ"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Results Screen
  console.log('🎉 Rendering results screen:', {
    quizScreen,
    mbtiResult,
    answersCount: answers.length,
    careerMatches: careerMatches.length,
    isLoading,
    error
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-3 sm:p-4 safe-area-left safe-area-right">
      <div className="container mx-auto max-w-4xl py-4 sm:py-6 md:py-8">
        <div className="text-center mb-6 sm:mb-8 p-4 sm:p-6 bg-white mobile-shadow-lg rounded-xl">
           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">診断結果</h1>
          {mbtiResult && (
            <p className="text-base sm:text-lg md:text-xl text-slate-600">
              あなたのMBTIタイプは: <strong className="text-blue-600 text-lg sm:text-xl md:text-2xl">{mbtiResult.type}</strong>
            </p>
          )}
        </div>
        
        {isLoading && (
          <div className="text-center py-10 mobile-loading">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-base sm:text-lg text-slate-600">適職情報を読み込んでいます...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="mobile-error rounded-lg mobile-shadow">
            <p className="text-lg sm:text-xl font-semibold text-red-700">エラー</p>
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

        {!isLoading && !error && mbtiResult && careerMatches.length === 0 && !error && (
           <div className="text-center py-8 px-4 bg-yellow-50 border border-yellow-200 rounded-lg mobile-shadow">
             <p className="text-lg sm:text-xl font-semibold text-yellow-700">結果なし</p>
             <p className="text-yellow-600 mt-1">{`「${mbtiResult.type}」に対応する適職データが見つかりませんでした。`}</p>
           </div>
        )}

        {/* AI Chat Section */}
        {showAIChat && mbtiResult && careerMatches.length > 0 && !isLoading && !error && (
            <AIChatView
                mbtiResult={mbtiResult}
                careerMatches={careerMatches}
                onChatEndNavigate={handleAIChatEndNavigate}
                isVisible={quizScreen === 'results'}
            />
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
