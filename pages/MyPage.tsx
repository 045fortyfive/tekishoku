
import React from 'react';
import { UserIcon } from '../constants'; // Using one of the existing icons

const MyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
      <UserIcon className="w-16 h-16 text-blue-500 mb-6" />
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">マイページ</h1>
      <p className="text-slate-600 max-w-md mx-auto mb-8">
        この機能は現在準備中です。診断結果の保存や、お気に入りのキャリア情報を管理できるようになる予定です。ご期待ください！
      </p>
      <div className="w-full max-w-sm p-6 bg-slate-50 rounded-lg shadow">
        <h2 className="font-semibold text-slate-700 mb-2">今後の予定:</h2>
        <ul className="list-disc list-inside text-slate-500 text-sm space-y-1 text-left">
          <li>過去の診断結果履歴</li>
          <li>お気に入りキャリアリスト</li>
          <li>アカウント設定</li>
          <li>パーソナルキャリアノート</li>
        </ul>
      </div>
       <img src="https://picsum.photos/seed/mypage/400/250?grayscale" alt="Placeholder" className="mt-10 rounded-lg shadow-md opacity-70" />
    </div>
  );
};

export default MyPage;
