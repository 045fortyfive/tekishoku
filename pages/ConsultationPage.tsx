
import React, { useEffect } from 'react';

const ConsultationPage: React.FC = () => {
  useEffect(() => {
    // 外部リンクにリダイレクト
    window.open('https://www.hugan.co.jp/seminar', '_blank');
    // 元のページに戻る
    window.history.back();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col items-center justify-center p-4 safe-area-left safe-area-right">
      <div className="text-center">
        <div className="text-6xl mb-4">🔄</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          キャリア相談ページへ移動中...
        </h1>
        <p className="text-slate-600 mb-6">
          HUGANセミナーページを新しいタブで開いています。
        </p>
        <div className="space-y-3">
          <a
            href="https://www.hugan.co.jp/seminar"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg mobile-transition touch-target"
          >
            HUGANセミナーページを開く
          </a>
          <button
            onClick={() => window.history.back()}
            className="block w-full bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-800 font-semibold py-3 px-6 rounded-lg mobile-transition touch-target"
          >
            前のページに戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
