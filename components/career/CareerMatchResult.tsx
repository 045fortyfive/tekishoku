import React from "react";
import { CareerMatch } from "../../types";
import TopCareerCard from "./TopCareerCard";
import CompactCareerCard from "./CompactCareerCard";
import CompatibilityChart from "./CompatibilityChart";
import MatchFactorsAnalysis from "./MatchFactorsAnalysis";
import DevelopmentAdvice from "./DevelopmentAdvice";

interface CareerMatchResultProps {
  mbtiType: string;
  matches: CareerMatch[];
  showDetailedAnalysis?: boolean;
  onCareerSelect: (match: CareerMatch) => void;
}

const CareerMatchResult: React.FC<CareerMatchResultProps> = ({
  mbtiType,
  matches,
  showDetailedAnalysis = true,
  onCareerSelect,
}) => {
  if (!matches || matches.length === 0) {
    // This case should ideally be handled by the parent component (DiagnosisPage)
    // to show a more prominent "no results" message.
    // However, as a fallback:
    return (
      <div className="text-center py-10" data-oid="zym.0qv">
        <h2
          className="text-xl font-semibold text-slate-700 mb-2"
          data-oid="-zlvevs"
        >
          診断結果なし
        </h2>
        <p className="text-slate-500" data-oid="kpn1t8v">
          MBTIタイプ「{mbtiType}」に対応する職業データが見つかりませんでした。
        </p>
      </div>
    );
  }

  const topMatches = matches.slice(0, 3);
  const otherMatches = matches.slice(3, 8);

  return (
    <div className="space-y-6 sm:space-y-8" data-oid="001g63:">
      {/* Header is now part of DiagnosisPage */}
      {/* Top 3 Career Cards */}
      <div className="grid md:grid-cols-3 gap-4 sm:gap-6" data-oid="s3ayrx9">
        {topMatches.map((match, index) => (
          <TopCareerCard
            key={match.career.id}
            match={match}
            rank={index + 1}
            onClick={() => onCareerSelect(match)}
            data-oid="mmeapgn"
          />
        ))}
      </div>

      {/* Detailed Analysis Section */}
      {showDetailedAnalysis && topMatches.length > 0 && (
        <div
          className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
          data-oid="dhl3b7r"
        >
          <h3
            className="text-lg sm:text-xl font-semibold text-slate-800 mb-4"
            data-oid="xfhu4aa"
          >
            適性分析の詳細
          </h3>
          <div className="grid md:grid-cols-2 gap-6" data-oid="tcizh80">
            <CompatibilityChart matches={topMatches} data-oid="wg62c_z" />
            <MatchFactorsAnalysis match={topMatches[0]} data-oid="uzw9ssc" />
          </div>
        </div>
      )}

      {/* Other Recommended Careers */}
      {otherMatches.length > 0 && (
        <div
          className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
          data-oid="pd1-4tu"
        >
          <h3
            className="text-lg sm:text-xl font-semibold text-slate-800 mb-4"
            data-oid="cne-jvq"
          >
            その他の適職候補
          </h3>
          <div className="space-y-3" data-oid="pgval-k">
            {otherMatches.map((match) => (
              <CompactCareerCard
                key={match.career.id}
                match={match}
                onClick={() => onCareerSelect(match)}
                data-oid="vxubn.l"
              />
            ))}
          </div>
        </div>
      )}

      {/* Development Advice */}
      {topMatches.length > 0 && (
        <DevelopmentAdvice
          matches={topMatches}
          mbtiType={mbtiType}
          data-oid="h3n9nt:"
        />
      )}
    </div>
  );
};

export default CareerMatchResult;
