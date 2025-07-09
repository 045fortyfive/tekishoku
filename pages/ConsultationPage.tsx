import React, { useEffect } from "react";

const ConsultationPage: React.FC = () => {
  useEffect(() => {
    // 外部リンクにリダイレクト
    window.open("https://www.hugan.co.jp/seminar", "_blank");
    // 元のページに戻る
    window.history.back();
  }, []);

  return (
    <div
      className="min-h-screen bg-white text-slate-800 flex flex-col items-center justify-center p-4 safe-area-left safe-area-right"
      data-oid="-ggz:3p"
    >
      <div className="text-center" data-oid="iimja2t">
        <div className="text-6xl mb-4" data-oid="x_6xqmy">
          🔄
        </div>
        <h1
          className="text-2xl font-bold text-slate-900 mb-3"
          data-oid="ny5_quq"
        >
          キャリア相談ページへ移動中...
        </h1>
        <p className="text-slate-600 mb-6" data-oid="i::w8v-">
          HUGANセミナーページを新しいタブで開いています。
        </p>
        <div className="space-y-3" data-oid="8-frxk:">
          <a
            href="https://www.hugan.co.jp/seminar"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg mobile-transition touch-target"
            data-oid="-djyxa0"
          >
            HUGANセミナーページを開く
          </a>
          <button
            onClick={() => window.history.back()}
            className="block w-full bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-800 font-semibold py-3 px-6 rounded-lg mobile-transition touch-target"
            data-oid="wdju6bh"
          >
            前のページに戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
