
import React from 'react';
import { ChatBubbleLeftRightIcon } from '../constants'; // Using the new icon

const ConsultationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
      <ChatBubbleLeftRightIcon className="w-16 h-16 text-teal-500 mb-6" />
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">キャリア相談</h1>
      <p className="text-slate-600 max-w-md mx-auto mb-8">
        専門のキャリアアドバイザーとの相談機能は現在準備中です。あなたの診断結果に基づいた、よりパーソナルなアドバイスを提供予定です。
      </p>
      <div className="w-full max-w-sm p-6 bg-slate-50 rounded-lg shadow">
        <h2 className="font-semibold text-slate-700 mb-2">提供予定のサービス:</h2>
        <ul className="list-disc list-inside text-slate-500 text-sm space-y-1 text-left">
          <li>AI診断結果に基づく個別フィードバック</li>
          <li>キャリアチェンジ戦略の相談</li>
          <li>面接対策・書類添削サポート (オプション)</li>
          <li>業界専門家とのQ&Aセッション</li>
        </ul>
      </div>
      <img src="https://picsum.photos/seed/consult/400/250?grayscale" alt="Placeholder" className="mt-10 rounded-lg shadow-md opacity-70" />
    </div>
  );
};

export default ConsultationPage;
