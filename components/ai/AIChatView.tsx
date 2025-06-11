
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { CareerMatch, ChatMessage } from '../../types';
import { MBTIResult } from '../../lib/mbti-questions';

interface AIChatViewProps {
  mbtiResult: MBTIResult;
  careerMatches: CareerMatch[];
  onChatEndNavigate: () => void;
  isVisible: boolean;
}

const AIChatView: React.FC<AIChatViewProps> = ({ mbtiResult, careerMatches, onChatEndNavigate, isVisible }) => {
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [turnsLeft, setTurnsLeft] = useState<number>(6);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  const initializeChat = useCallback(async () => {
    if (!mbtiResult || !process.env.API_KEY || !isVisible) return;
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const topMatchesInfo = careerMatches.slice(0, 3).map(match => 
        `- ${match.career.name} (適合度: ${Math.round(match.compatibilityScore * 100)}%)`
      ).join('\n');

      const systemInstruction = `あなたはAIキャリアカウンセラーです。ユーザーのMBTIタイプは「${mbtiResult.type}」です。このタイプに基づいた適職候補は以下の通りです：\n${topMatchesInfo}\n\nこの情報を基に、ユーザーのキャリアに関する質問に答え、アドバイスを提供してください。会話は6往復で終了します。6往復目には、会話を締めくくり、「タイプ別適職」ページでさらに詳しい情報を見るよう促してください。回答は簡潔にお願いします。`;
      
      const newChat = ai.chats.create({
        model: 'gemini-2.5-flash-preview-04-17',
        config: { systemInstruction },
      });
      setChatSession(newChat);
      setMessages([]);
      setTurnsLeft(6);

      // Send an initial greeting from AI
      const initialGreeting = `こんにちは！「${mbtiResult.type}」のあなたに合ったキャリアについて、どのようなご相談がありますか？ (残り6往復)`;
      setMessages([{ id: Date.now().toString(), text: initialGreeting, sender: 'ai', timestamp: new Date() }]);

    } catch (e: any) {
      console.error("Error initializing chat:", e);
      setError(`AIチャットの初期化に失敗しました。${e.message || ''}`);
    } finally {
      setIsLoading(false);
    }
  }, [mbtiResult, careerMatches, isVisible]);


  useEffect(() => {
    if (isVisible) {
        initializeChat();
    } else {
        setChatSession(null);
        setMessages([]);
    }
  }, [isVisible, initializeChat]);


  const handleSendMessage = async () => {
    if (!userInput.trim() || !chatSession || isLoading || turnsLeft === 0) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: userInput,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatSession.sendMessage({ message: userMessage.text });
      const aiResponseText = response.text;
      
      let finalAiText = aiResponseText;
      if (turnsLeft - 1 === 0) {
        finalAiText += '\n\nAIキャリア相談はこれで終了です。さらに詳しい情報は「タイプ別適職」ページをご覧ください。';
      } else {
        finalAiText += ` (残り${turnsLeft - 1}往復)`;
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: finalAiText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setTurnsLeft(prev => prev - 1);
    } catch (e: any) {
      console.error("Error sending message to AI:", e);
      setError(`AIからの返信取得中にエラーが発生しました。${e.message || ''}`);
       const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "申し訳ありません、現在AIとの通信に問題が発生しています。しばらくしてから再度お試しください。",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="mt-8 sm:mt-10 bg-white p-4 sm:p-6 rounded-xl shadow-xl">
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4 text-center">AIキャリア相談</h2>
      
      {isLoading && messages.length === 0 && !error && (
         <div className="text-center py-5">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-3"></div>
            <p className="text-slate-600">AIチャットを準備中です...</p>
        </div>
      )}

      {error && <p className="text-red-500 bg-red-50 p-3 rounded-md text-sm">{error}</p>}
      
      <div className="h-72 sm:h-96 overflow-y-auto border border-slate-200 rounded-lg p-3 sm:p-4 mb-4 space-y-3 bg-slate-50">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-2.5 sm:p-3 rounded-xl text-sm sm:text-base leading-relaxed shadow-sm
                ${msg.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}
            >
              {msg.text.split('\n').map((line, index) => <span key={index}>{line}<br/></span>)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {turnsLeft > 0 ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            placeholder="AIに質問してみましょう..."
            className="flex-grow p-2.5 sm:p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-sm sm:text-base"
            disabled={isLoading || !chatSession}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !userInput.trim() || !chatSession}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 sm:py-3 sm:px-6 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            送信
          </button>
        </div>
      ) : (
        <div className="text-center p-3 bg-slate-100 rounded-lg">
          <p className="text-slate-700 mb-3 text-sm sm:text-base">
            AIキャリア相談は終了しました。さらに詳しい情報は「タイプ別適職」ページをご覧ください。
          </p>
          <button
            onClick={onChatEndNavigate}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 text-sm sm:text-base"
          >
            タイプ別適職を見る
          </button>
        </div>
      )}
      {turnsLeft > 0 && chatSession && <p className="text-xs text-slate-500 mt-2 text-right">残り {turnsLeft} 往復</p>}
    </div>
  );
};

export default AIChatView;
