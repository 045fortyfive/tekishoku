
import React from 'react';
import { CareerMatch } from '../../types';
import { getGrowthLabel } from './careerUtils';

interface CompactCareerCardProps {
  match: CareerMatch;
  onClick?: () => void;
}

const CompactCareerCard: React.FC<CompactCareerCardProps> = ({ match, onClick }) => {
  const { career, compatibilityScore, rank } = match;
  
  return (
    <div
      className="bg-slate-50 p-3 sm:p-4 rounded-lg hover:bg-slate-100 active:bg-slate-200 border border-slate-200 hover:border-slate-300 mobile-transition cursor-pointer touch-target"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
      aria-label={`適職 ${rank}位: ${career.name}, 適合度 ${Math.round(compatibilityScore * 100)}%`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center min-w-0"> {/* Added min-w-0 for flex truncation */}
          <span className="bg-blue-500 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold mr-3 text-sm flex-shrink-0">
            {rank}
          </span>
          <div className="min-w-0"> {/* Added min-w-0 for flex truncation */}
            <h4 className="font-semibold text-slate-800 truncate" title={career.name}>{career.name}</h4>
            <div className="hidden sm:flex items-center space-x-3 text-xs text-slate-500 truncate">
              <span>{career.sector}</span>
              <span>💰 {career.averageSalary.min}万〜{career.averageSalary.max}万円</span>
              <span>📈 {getGrowthLabel(career.growthOutlook)}</span>
            </div>
             <div className="sm:hidden text-xs text-slate-500 truncate">
              {career.sector} - {getGrowthLabel(career.growthOutlook)}
            </div>
          </div>
        </div>
        <div className="text-right ml-2 flex-shrink-0">
          <div className="text-base sm:text-lg font-bold text-blue-600">
            {Math.round(compatibilityScore * 100)}%
          </div>
          <div className="text-xs text-slate-500">適合度</div>
        </div>
      </div>
    </div>
  );
};

export default CompactCareerCard;