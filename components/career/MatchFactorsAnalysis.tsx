import React from "react";
import { CareerMatch } from "../../types";

interface MatchFactorsAnalysisProps {
  match?: CareerMatch;
}

const MatchFactorsAnalysis: React.FC<MatchFactorsAnalysisProps> = ({
  match,
}) => {
  if (!match) {
    return (
      <div className="text-slate-500 p-4 text-center" data-oid="twmvji.">
        適性要因分析を表示するには、まず職業を選択してください。
      </div>
    );
  }

  const { matchFactors, career } = match;

  const factors = [
    {
      name: "性格適性",
      value: matchFactors.personalityFit,
      icon: "🧠",
      description: "MBTIタイプとの適合度",
    },
    {
      name: "スキル適合",
      value: matchFactors.skillAlignment,
      icon: "🛠️",
      description: "必要スキルとの一致度",
    },
    {
      name: "働き方適合",
      value: matchFactors.workStyleMatch,
      icon: "⚖️",
      description: "希望する働き方との適合度",
    },
    {
      name: "成長性",
      value: matchFactors.growthPotential,
      icon: "📈",
      description: "将来性と給与の期待値",
    },
  ];

  return (
    <div className="bg-slate-50 p-4 rounded-lg" data-oid="-ugqf2q">
      <h4
        className="font-semibold text-slate-700 mb-3 text-sm sm:text-base"
        data-oid="w:1w8ir"
      >
        適性要因分析 (
        {career.name.length > 10
          ? career.name.slice(0, 10) + "..."
          : career.name}
        )
      </h4>
      <div className="space-y-2.5" data-oid="01fj4ve">
        {factors.map((factor, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg border border-slate-200"
            data-oid="._y5cki"
          >
            <div
              className="flex items-center justify-between mb-1.5"
              data-oid="w9fd:ko"
            >
              <div className="flex items-center" data-oid="jh.q1jp">
                <span className="mr-2 text-lg" data-oid="3n8r7v:">
                  {factor.icon}
                </span>
                <span
                  className="text-xs sm:text-sm font-medium text-slate-700"
                  data-oid="k6c_tgo"
                >
                  {factor.name}
                </span>
              </div>
              <span
                className="text-xs sm:text-sm font-bold text-blue-600"
                data-oid="d42m_oq"
              >
                {Math.round(factor.value * 100)}%
              </span>
            </div>
            <div
              className="h-1.5 bg-slate-200 rounded-full overflow-hidden"
              data-oid="4q51dyo"
            >
              <div
                className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
                style={{ width: `${factor.value * 100}%` }}
                role="progressbar"
                aria-valuenow={factor.value * 100}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${factor.name} ${Math.round(factor.value * 100)}%`}
                data-oid="2:3zc.d"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1" data-oid="6-h1syx">
              {factor.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchFactorsAnalysis;
