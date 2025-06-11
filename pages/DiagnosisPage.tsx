
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
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setMbtiResult(null);
    setCareerMatches([]);
    setError(null);
    setShowAIChat(false); // Reset AI chat visibility
  };

  useEffect(() => {
    if (initiateQuizOnLoad && quizScreen !== 'questioning') {
      resetQuizState();
      setQuizScreen('questioning');
    }
  }, [initiateQuizOnLoad, quizScreen]);


  const handleStartQuiz = () => {
    resetQuizState();
    setQuizScreen('questioning');
  };

  const handleAnswerSelect = (question: Question, value: number) => {
    const newAnswer: Answer = { questionId: question.id, dimension: question.dimension, value };
    setAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(a => a.questionId === question.id);
      if (existingAnswerIndex > -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = newAnswer;
        return updatedAnswers;
      }
      return [...prevAnswers, newAnswer];
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      const result = calculateMBTIType(answers);
      setMbtiResult(result);
      setQuizScreen('results');
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const runCareerMatching = useCallback((mbtiType: string) => {
    if (!mbtiType) return;
    setIsLoading(true);
    setError(null);
    setTimeout(() => { // Simulate API delay if needed, or remove for direct calculation
      try {
        const userProfile: Partial<UserProfile> = { mbtiType };
        const matches = calculateCareerMatches(mbtiType, userProfile);
        if (matches.length === 0) {
          setError(`「${mbtiType}」に対応する適職データが見つかりませんでした。`);
        }
        setCareerMatches(matches);
        setShowAIChat(true); // Show AI Chat after career matches are loaded
      } catch (e) {
        console.error("Error calculating career matches:", e);
        setError('診断結果の取得中にエラーが発生しました。');
        setCareerMatches([]);
        setShowAIChat(false);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, []);

  useEffect(() => {
    if (quizScreen === 'results' && mbtiResult) {
      runCareerMatching(mbtiResult.type);
    }
  }, [quizScreen, mbtiResult, runCareerMatching]);

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

    return (
      <div className="h-screen bg-slate-100 text-slate-800 flex flex-col safe-area-left safe-area-right safe-area-top safe-area-bottom">
        {/* Header with progress */}
        <div className="flex-shrink-0 p-3 bg-white border-b border-slate-200">
          <p className="text-xs text-slate-500 mb-2 text-center">質問 {currentQuestionIndex + 1} / {totalQuestions}</p>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full mobile-transition"
              style={{ width: `${progressPercentage}%` }}
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
              aria-label={`進捗 ${Math.round(progressPercentage)}%`}
            ></div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col justify-center p-4">
          <div className="w-full max-w-md mx-auto">
            {/* Question */}
            <h2 className="text-base sm:text-lg font-semibold mb-6 text-slate-800 leading-relaxed text-center px-2">
              {currentQuestion.text}
            </h2>

            {/* Answer options */}
            <div className="space-y-2 mb-6">
              {answerOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswerSelect(currentQuestion, opt.value)}
                  className={`w-full text-left p-3 rounded-lg border-2 mobile-transition text-sm touch-target
                    ${currentAnswerValue === opt.value
                      ? 'bg-blue-600 border-blue-500 text-white mobile-shadow font-semibold'
                      : 'bg-white border-slate-300 hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 text-slate-700'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="flex-shrink-0 p-4 bg-white border-t border-slate-200">
          <div className="flex justify-between items-center gap-3 max-w-md mx-auto">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="py-3 px-4 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mobile-transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 touch-target text-sm"
            >
              戻る
            </button>
            <div className="text-center">
              <button
                onClick={handleStartQuiz}
                className="text-xs text-slate-400 hover:text-slate-600 underline focus:outline-none"
              >
                最初から
              </button>
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={currentAnswerValue === undefined}
              className="py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mobile-transition font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 touch-target text-sm"
            >
              {currentQuestionIndex === totalQuestions - 1 ? "結果を見る" : "次へ"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Results Screen
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
