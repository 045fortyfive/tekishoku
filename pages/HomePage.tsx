
import React from 'react';
import { Link } from 'react-router-dom';
import { RocketLaunchIcon, LightBulbIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'; // 仮のアイコン

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 pt-8 safe-area-left safe-area-right" style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif" }}>
      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-2">HUGAN</h1>
        <div className="w-20 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
      </header>

      <main className="w-full max-w-xs sm:max-w-sm space-y-8">
        <div className="text-center p-4 rounded-xl bg-yellow-50">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-600 mb-3">
            AI適職診断
          </h2>
          <p className="text-gray-700 text-base sm:text-lg px-2 leading-relaxed">
            あなたの強みを最大限に生かす選択を、ここで見つけましょう。
          </p>
        </div>

        <div className="space-y-5">
          <Link
            to="/diagnosis?initiate=true"
            className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-4 px-6 rounded-2xl text-lg mobile-shadow-lg hover:shadow-xl mobile-transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 touch-target"
          >
            <RocketLaunchIcon className="w-6 h-6 mr-2" />
            診断を始める
          </Link>
          <Link
            to="/career"
            className="flex items-center justify-center w-full bg-lime-400 hover:bg-lime-500 active:bg-lime-600 text-gray-800 font-bold py-4 px-6 rounded-2xl text-lg mobile-shadow hover:shadow-lg mobile-transition focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-opacity-75 touch-target"
          >
            <LightBulbIcon className="w-6 h-6 mr-2" />
            タイプ別適職を見る
          </Link>
          <Link
            to="/consultation"
            className="flex items-center justify-center w-full bg-lime-400 hover:bg-lime-500 active:bg-lime-600 text-gray-800 font-bold py-4 px-6 rounded-2xl text-lg mobile-shadow hover:shadow-lg mobile-transition focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-opacity-75 touch-target"
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2" />
            キャリア相談とは？
          </Link>
        </div>
      </main>
      <footer className="mt-auto pt-8 text-center text-gray-500 text-sm safe-area-bottom">
        &copy; {new Date().getFullYear()} HUGAN AI Career Diagnosis.
      </footer>
    </div>
  );
};

export default HomePage;
