import React from "react";
import { CareerMatch } from "../../types";
import { getGrowthLabel } from "./careerUtils";

interface TopCareerCardProps {
  match: CareerMatch;
  rank: number;
  onClick?: () => void;
}

const TopCareerCard: React.FC<TopCareerCardProps> = ({
  match,
  rank,
  onClick,
}) => {
  const { career, compatibilityScore, strengths } = match;

  const rankStyles: { [key: number]: string } = {
    1: "bg-gradient-to-br from-yellow-400 to-yellow-500 border-yellow-500 text-white", // Gold
    2: "bg-gradient-to-br from-slate-400 to-slate-500 border-slate-500 text-white", // Silver
    3: "bg-gradient-to-br from-orange-400 to-orange-500 border-orange-500 text-white", // Bronze
  };

  const currentRankStyle =
    rankStyles[rank] ||
    "bg-gradient-to-br from-blue-500 to-blue-600 border-blue-600 text-white";

  return (
    <div
      className="bg-white p-4 sm:p-5 md:p-6 rounded-xl border border-slate-200 mobile-shadow-lg hover:shadow-xl mobile-transition cursor-pointer flex flex-col h-full touch-target"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      aria-label={`適職 ${rank}位: ${career.name}, 適合度 ${Math.round(compatibilityScore * 100)}%`}
      data-oid="obmeadv"
    >
      <div
        className="flex items-center justify-between mb-4"
        data-oid="ypw0j3t"
      >
        <div
          className={`${currentRankStyle} rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-lg sm:text-xl shadow-md`}
          data-oid="df_e02m"
        >
          {rank}
        </div>
        <div className="text-right" data-oid="ybgcg47">
          <div
            className="text-2xl sm:text-3xl font-bold text-blue-600"
            data-oid="cy.k4j_"
          >
            {Math.round(compatibilityScore * 100)}%
          </div>
          <div className="text-xs sm:text-sm text-slate-500" data-oid="8lc5498">
            適合度
          </div>
        </div>
      </div>

      <h3
        className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 truncate"
        title={career.name}
        data-oid="9v:pj2h"
      >
        {career.name}
      </h3>
      <p
        className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-3 flex-grow"
        data-oid="nknud70"
      >
        {career.description}
      </p>

      <div
        className="space-y-1.5 mb-4 text-xs sm:text-sm text-slate-600"
        data-oid="8:cv76z"
      >
        <div className="flex items-center" data-oid=".kuep:4">
          <span className="mr-1.5 text-lg" data-oid="p-g4kg2">
            💰
          </span>
          年収: {career.averageSalary.min}万〜{career.averageSalary.max}万円
        </div>
        <div className="flex items-center" data-oid="n1v8t_f">
          <span className="mr-1.5 text-lg" data-oid="ko:rgu5">
            📈
          </span>
          成長性: {getGrowthLabel(career.growthOutlook)}
        </div>
        <div className="flex items-center" data-oid="p55_gfw">
          <span className="mr-1.5 text-lg" data-oid="d186po0">
            🏢
          </span>
          分野: {career.sector}
        </div>
      </div>

      <div
        className="border-t border-slate-200 pt-3 mt-auto"
        data-oid="qs1s76y"
      >
        <h4
          className="font-semibold text-xs sm:text-sm text-slate-700 mb-1.5"
          data-oid="j878:-z"
        >
          あなたの強み:
        </h4>
        <div className="flex flex-wrap gap-1" data-oid="xv-_dgk">
          {strengths.slice(0, 3).map((strength, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
              data-oid="lkdlko9"
            >
              {strength}
            </span>
          ))}
          {strengths.length > 3 && (
            <span
              className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
              data-oid="sq5-:ea"
            >
              ...他
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopCareerCard;
