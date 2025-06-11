
import React from 'react';
import { CareerMatch } from '../../types';

interface CompatibilityChartProps {
  matches: CareerMatch[];
}

const CompatibilityChart: React.FC<CompatibilityChartProps> = ({ matches }) => {
  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <h4 className="font-semibold text-slate-700 mb-3 text-sm sm:text-base">適合度ランキング</h4>
      <div className="space-y-3">
        {matches.map((match) => (
          <div key={match.career.id} className="flex items-center">
            <div className="w-20 sm:w-24 text-xs sm:text-sm text-slate-600 truncate pr-2" title={match.career.name}>
              {match.career.name}
            </div>
            <div className="flex-1 mx-2 sm:mx-3">
              <div className="h-2 sm:h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-teal-400 transition-all duration-500"
                  style={{ width: `${match.compatibilityScore * 100}%` }}
                  role="progressbar"
                  aria-valuenow={match.compatibilityScore * 100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${match.career.name} 適合度 ${Math.round(match.compatibilityScore * 100)}%`}
                />
              </div>
            </div>
            <div className="w-10 sm:w-12 text-xs sm:text-sm text-slate-700 font-semibold text-right">
              {Math.round(match.compatibilityScore * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompatibilityChart;
