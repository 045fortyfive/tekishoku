
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 pt-8 safe-area-left safe-area-right">
      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">HUGAN</h1>
        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </header>

      <main className="w-full max-w-xs sm:max-w-sm space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            AI適職診断
          </h2>
          <p className="text-slate-600 text-sm sm:text-base px-2 leading-relaxed">
            あなたの強みを最大限に生かす選択を、ここで見つけましょう。
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/diagnosis?initiate=true"
            className="block w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl text-center mobile-shadow-lg hover:shadow-xl mobile-transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 touch-target"
          >
            診断を始める
          </Link>
          <Link
            to="/career"
            className="block w-full bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-800 font-semibold py-4 px-6 rounded-xl text-center mobile-shadow hover:shadow-lg mobile-transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 touch-target"
          >
            タイプ別適職を見る
          </Link>
          <Link
            to="/consultation"
            className="block w-full bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-800 font-semibold py-4 px-6 rounded-xl text-center mobile-shadow hover:shadow-lg mobile-transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 touch-target"
          >
            キャリア相談とは？
          </Link>
        </div>
      </main>
      <footer className="mt-auto pt-8 text-center text-slate-500 text-xs safe-area-bottom">
        &copy; {new Date().getFullYear()} HUGAN AI Career Diagnosis.
      </footer>
    </div>
  );
};

export default HomePage;
