import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-white flex flex-col items-center justify-center p-3 sm:p-4 pt-6 sm:pt-8 safe-area-left safe-area-right relative overflow-hidden mobile-container"
      data-oid="6edthjf"
    >
      {/* 赤・オレンジ・黄色のグラデーション背景 */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-red-300 to-orange-300 blur-3xl rounded-full w-96 h-96 -top-48 -left-48 warm-gradient-1"
        data-oid="2nat1gl"
      ></div>
      <div
        className="fixed inset-0 bg-gradient-to-tl from-orange-300 to-yellow-300 blur-3xl rounded-full w-80 h-80 top-1/3 -right-40 warm-gradient-2"
        data-oid="w9thnyd"
      ></div>
      <div
        className="fixed inset-0 bg-gradient-to-tr from-yellow-200 to-red-200 blur-3xl rounded-full w-72 h-72 bottom-0 left-1/4 warm-gradient-3"
        data-oid="b7cb285"
      ></div>

      <div
        className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto px-3 sm:px-4 flex flex-col h-full"
        data-oid="t.:s-t2"
      >
        <header
          className="text-center zen-spacing mobile-header"
          data-oid="c45q76y"
        >
          <div className="flex justify-center mb-2" data-oid="2_cj48.">
            <img
              src="/image/hugan-logo.avif"
              alt="HUGAN"
              className="h-8 sm:h-10 md:h-12 block sm:hidden"
              data-oid="hugan-logo-mobile"
            />

            <h1
              className="text-xl sm:text-2xl md:text-3xl zen-title hidden sm:block"
              data-oid="o02abq6"
            >
              HUGAN
            </h1>
          </div>
          <div
            className="w-8 sm:w-12 h-px bg-gray-300 mx-auto"
            data-oid="e86rwfq"
          ></div>
        </header>

        <main
          className="w-full zen-spacing mobile-main mt-2 sm:mt-6"
          data-oid="yf._t35"
        >
          <div
            className="text-center liquid-glass-card p-6 sm:p-8 mb-6 sm:mb-8 rounded-2xl"
            data-oid="ykl5k-_"
          >
            <h2
              className="text-xl sm:text-2xl md:text-3xl diagnosis-title mb-4 sm:mb-6 glass-text"
              data-oid="1zq7e-f"
            >
              AI適職診断
            </h2>
            <p
              className="text-gray-600 text-sm sm:text-base leading-relaxed font-light glass-text mobile-description"
              data-oid="7prrxp9"
            >
              あなたの強みを最大限に活かす選択を、ここでみつけましょう。
            </p>
          </div>

          <div
            className="space-y-3 sm:space-y-4 button-spacing"
            data-oid="lrtojcs"
          >
            <Link
              to="/diagnosis?initiate=true"
              className="block w-full blue-gradient-button text-white font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-center text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 touch-target"
              data-oid="jcu8v59"
            >
              <span className="glass-text" data-oid="wx5l44r">
                診断を始める
              </span>
            </Link>
            <Link
              to="/career"
              className="block w-full liquid-glass-button font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-center text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-opacity-50 touch-target"
              data-oid="akhji88"
            >
              <span className="glass-text" data-oid="-ij-w9-">
                タイプ別適職を見る
              </span>
            </Link>
            <Link
              to="/consultation"
              className="block w-full liquid-glass-button font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-center text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-opacity-50 touch-target"
              data-oid="69g.f15"
            >
              <span className="glass-text" data-oid="xen5ifw">
                キャリア相談とは？
              </span>
            </Link>
          </div>
        </main>

        <footer
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400 text-xs safe-area-bottom mobile-footer"
          data-oid="r7-v8-x"
        >
          &copy; {new Date().getFullYear()} HUGAN AI Career Diagnosis.
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
