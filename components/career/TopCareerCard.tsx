
import React from 'react';
import { CareerMatch } from '../../types';
import { getGrowthLabel } from './careerUtils';

interface TopCareerCardProps {
  match: CareerMatch;
  rank: number;
  onClick?: () => void;
}

const TopCareerCard: React.FC<TopCareerCardProps> = ({ match, rank, onClick }) => {
  const { career, compatibilityScore, strengths } = match;
  
  const rankStyles: { [key: number]: string } = {
    1: 'bg-gradient-to-br from-yellow-400 to-yellow-500 border-yellow-500 text-white', // Gold
    2: 'bg-gradient-to-br from-slate-400 to-slate-500 border-slate-500 text-white', // Silver
    3: 'bg-gradient-to-br from-orange-400 to-orange-500 border-orange-500 text-white' // Bronze
  };
  
  const currentRankStyle = rankStyles[rank] || 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-600 text-white';

  return (
    <div
      className="bg-white p-4 sm:p-5 md:p-6 rounded-xl border border-slate-200 mobile-shadow-lg hover:shadow-xl mobile-transition cursor-pointer flex flex-col h-full touch-target"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
      aria-label={`適職 ${rank}位: ${career.name}, 適合度 ${Math.round(compatibilityScore * 100)}%`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`${currentRankStyle} rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-lg sm:text-xl shadow-md`}>
          {rank}
        </div>
        <div className="text-right">
          <div className="text-2xl sm:text-3xl font-bold text-blue-600">
            {Math.round(compatibilityScore * 100)}%
          </div>
          <div className="text-xs sm:text-sm text-slate-500">適合度</div>
        </div>
      </div>
      
      <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 truncate" title={career.name}>
        {career.name}
      </h3>
      <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-3 flex-grow">
        {career.description}
      </p>
      
      <div className="space-y-1.5 mb-4 text-xs sm:text-sm text-slate-600">
        <div className="flex items-center">
          <span className="mr-1.5 text-lg">💰</span>
          年収: {career.averageSalary.min}万〜{career.averageSalary.max}万円
        </div>
        <div className="flex items-center">
          <span className="mr-1.5 text-lg">📈</span>
          成長性: {getGrowthLabel(career.growthOutlook)}
        </div>
        <div className="flex items-center">
          <span className="mr-1.5 text-lg">🏢</span>
          分野: {career.sector}
        </div>
      </div>
      
      <div className="border-t border-slate-200 pt-3 mt-auto">
        <h4 className="font-semibold text-xs sm:text-sm text-slate-700 mb-1.5">あなたの強み:</h4>
        <div className="flex flex-wrap gap-1">
          {strengths.slice(0, 3).map((strength, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
            >
              {strength}
            </span>
          ))}
          {strengths.length > 3 && (
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
              ...他
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopCareerCard;
