import React from "react";
import { CareerMatch } from "../../types";

interface CompatibilityChartProps {
  matches: CareerMatch[];
}

const CompatibilityChart: React.FC<CompatibilityChartProps> = ({ matches }) => {
  return (
    <div className="bg-slate-50 p-4 rounded-lg" data-oid="h8g0p6_">
      <h4
        className="font-semibold text-slate-700 mb-3 text-sm sm:text-base"
        data-oid="opq_b49"
      >
        適合度ランキング
      </h4>
      <div className="space-y-3" data-oid="9zro9si">
        {matches.map((match) => (
          <div
            key={match.career.id}
            className="flex items-center"
            data-oid="97pp1wr"
          >
            <div
              className="w-20 sm:w-24 text-xs sm:text-sm text-slate-600 truncate pr-2"
              title={match.career.name}
              data-oid="qq14_qr"
            >
              {match.career.name}
            </div>
            <div className="flex-1 mx-2 sm:mx-3" data-oid="v6zz5.j">
              <div
                className="h-2 sm:h-2.5 bg-slate-200 rounded-full overflow-hidden"
                data-oid="h7a4t2t"
              >
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-teal-400 transition-all duration-500"
                  style={{ width: `${match.compatibilityScore * 100}%` }}
                  role="progressbar"
                  aria-valuenow={match.compatibilityScore * 100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${match.career.name} 適合度 ${Math.round(match.compatibilityScore * 100)}%`}
                  data-oid="3965rm5"
                />
              </div>
            </div>
            <div
              className="w-10 sm:w-12 text-xs sm:text-sm text-slate-700 font-semibold text-right"
              data-oid="kvqlo-s"
            >
              {Math.round(match.compatibilityScore * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompatibilityChart;
