import React from "react";
import { CareerMatch } from "../../types";
import { getGrowthLabel } from "./careerUtils";

interface CompactCareerCardProps {
  match: CareerMatch;
  onClick?: () => void;
}

const CompactCareerCard: React.FC<CompactCareerCardProps> = ({
  match,
  onClick,
}) => {
  const { career, compatibilityScore, rank } = match;

  return (
    <div
      className="bg-slate-50 p-3 sm:p-4 rounded-lg hover:bg-slate-100 active:bg-slate-200 border border-slate-200 hover:border-slate-300 mobile-transition cursor-pointer touch-target"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      aria-label={`適職 ${rank}位: ${career.name}, 適合度 ${Math.round(compatibilityScore * 100)}%`}
      data-oid="xlh859n"
    >
      <div className="flex items-center justify-between" data-oid="x1q_2:u">
        <div className="flex items-center min-w-0" data-oid="iov.j7o">
          {" "}
          {/* Added min-w-0 for flex truncation */}
          <span
            className="bg-blue-500 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold mr-3 text-sm flex-shrink-0"
            data-oid="q37nl-b"
          >
            {rank}
          </span>
          <div className="min-w-0" data-oid="zs75xtu">
            {" "}
            {/* Added min-w-0 for flex truncation */}
            <h4
              className="font-semibold text-slate-800 truncate"
              title={career.name}
              data-oid="35:40.g"
            >
              {career.name}
            </h4>
            <div
              className="hidden sm:flex items-center space-x-3 text-xs text-slate-500 truncate"
              data-oid="-upb97y"
            >
              <span data-oid="gmmxb-h">{career.sector}</span>
              <span data-oid="o9-exs0">
                💰 {career.averageSalary.min}万〜{career.averageSalary.max}万円
              </span>
              <span data-oid="leqw7tj">
                📈 {getGrowthLabel(career.growthOutlook)}
              </span>
            </div>
            <div
              className="sm:hidden text-xs text-slate-500 truncate"
              data-oid="6l2.:n-"
            >
              {career.sector} - {getGrowthLabel(career.growthOutlook)}
            </div>
          </div>
        </div>
        <div className="text-right ml-2 flex-shrink-0" data-oid="yr:3-3:">
          <div
            className="text-base sm:text-lg font-bold text-blue-600"
            data-oid="ilav77a"
          >
            {Math.round(compatibilityScore * 100)}%
          </div>
          <div className="text-xs text-slate-500" data-oid=".x3t-e:">
            適合度
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactCareerCard;
