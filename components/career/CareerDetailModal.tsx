import React, { useState, useEffect } from "react";
import { CareerMatch } from "../../types";
import MatchFactorsAnalysis from "./MatchFactorsAnalysis";
import { getGrowthLabel } from "./careerUtils";

interface CareerDetailModalProps {
  match?: CareerMatch | null;
  isOpen: boolean;
  onClose: () => void;
}

const CareerDetailModal: React.FC<CareerDetailModalProps> = ({
  match,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "requirements" | "path" | "analysis"
  >("overview");

  useEffect(() => {
    // Reset to overview tab when a new match is selected or modal opens
    if (isOpen) {
      setActiveTab("overview");
    }
  }, [isOpen, match]);

  if (!isOpen || !match) return null;

  const {
    career,
    compatibilityScore,
    strengths,
    challenges,
    reasoning,
    developmentTips,
  } = match;

  const tabItems = [
    { id: "overview", label: "概要", icon: "📋" },
    { id: "requirements", label: "要件・スキル", icon: "🛠️" },
    { id: "path", label: "キャリアパス", icon: "🛤️" },
    { id: "analysis", label: "適性分析", icon: "📊" },
  ] as const;

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 safe-area-left safe-area-right"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="careerDetailModalTitle"
      data-oid="0oh6gse"
    >
      <div
        className="bg-white rounded-xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col mobile-shadow-lg overflow-hidden mobile-modal"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
        data-oid="djgk996"
      >
        {/* Header */}
        <div
          className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-3 sm:p-4 md:p-5 relative"
          data-oid="5h5mz4p"
        >
          <div className="flex items-center justify-between" data-oid="xypoyth">
            <div className="min-w-0 flex-1 mr-3" data-oid="4y12luj">
              <h2
                id="careerDetailModalTitle"
                className="text-lg sm:text-xl md:text-2xl font-bold truncate"
                data-oid="zhqqggt"
              >
                {career.name}
              </h2>
              <p
                className="text-xs sm:text-sm text-blue-100 truncate"
                data-oid="ok8vaqy"
              >
                {career.sector}
              </p>
            </div>
            <div className="text-right flex-shrink-0" data-oid="x08.9oj">
              <div
                className="text-2xl sm:text-3xl font-bold"
                data-oid="w5zvtl7"
              >
                {Math.round(compatibilityScore * 100)}%
              </div>
              <div
                className="text-xs sm:text-sm text-blue-100"
                data-oid="hif56a5"
              >
                適合度
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="詳細モーダルを閉じる"
            data-oid="v2uj5l7"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
              data-oid="syl_08l"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
                data-oid="y7-4rm0"
              />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200" data-oid="zso:nd5">
          <nav className="flex overflow-x-auto no-scrollbar" data-oid="boeiguu">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-medium border-b-2 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400
                  ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                role="tab"
                aria-selected={activeTab === tab.id}
                data-oid="dxbpf_m"
              >
                <span
                  className="mr-1.5 sm:mr-2 text-base sm:text-lg"
                  data-oid="bjyblw7"
                >
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div
          className="p-4 sm:p-6 overflow-y-auto flex-grow"
          role="tabpanel"
          data-oid="8iepzzd"
        >
          {activeTab === "overview" && (
            <div className="space-y-5" data-oid="c5zou7c">
              <div data-oid="h7485cf">
                <h3
                  className="text-lg font-semibold text-slate-800 mb-2"
                  data-oid="awcxc6a"
                >
                  職業概要
                </h3>
                <p
                  className="text-sm sm:text-base text-slate-600 leading-relaxed"
                  data-oid="9hrn5_u"
                >
                  {career.description}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4" data-oid=".n48-ck">
                <InfoCard
                  title="💰 年収レンジ"
                  value={`${career.averageSalary.min}万円 〜 ${career.averageSalary.max}万円`}
                  valueColor="text-teal-600"
                  data-oid="n3vt79r"
                />

                <InfoCard
                  title="📈 成長見通し"
                  value={getGrowthLabel(career.growthOutlook)}
                  valueColor="text-blue-600"
                  data-oid="p_j..wo"
                />
              </div>

              <div data-oid=":qw2:vm">
                <h4
                  className="text-md font-semibold text-slate-700 mb-2"
                  data-oid="--.2jqx"
                >
                  🎯 主な業務内容
                </h4>
                <ul
                  className="space-y-1.5 list-disc list-inside text-sm text-slate-600"
                  data-oid="19n9l8z"
                >
                  {career.dailyTasks.map((task, index) => (
                    <li key={index} data-oid="::qu8u4">
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "requirements" && (
            <div className="space-y-5" data-oid="id3f5qs">
              <div data-oid="i-7vpcn">
                <h3
                  className="text-lg font-semibold text-slate-800 mb-2"
                  data-oid="pt3e57n"
                >
                  必要なスキル・知識
                </h3>
                <div className="flex flex-wrap gap-2" data-oid="_rkpjil">
                  {career.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs sm:text-sm"
                      data-oid="7n985nd"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <InfoCard
                title="🎓 学歴・資格要件"
                text={career.educationRequirement}
                data-oid="zdbjlp3"
              />

              <div data-oid="utm9q:8">
                <h4
                  className="text-md font-semibold text-slate-700 mb-2"
                  data-oid="6zr0hcm"
                >
                  🏢 職場環境
                </h4>
                <ul
                  className="space-y-1.5 list-disc list-inside text-sm text-slate-600"
                  data-oid="v-ecyjy"
                >
                  {career.workEnvironment.map((env, index) => (
                    <li key={index} data-oid="l7vsrlx">
                      {env}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid sm:grid-cols-2 gap-4" data-oid="-n1gshw">
                <div data-oid="x:oyhge">
                  <h4
                    className="text-md font-semibold text-slate-700 mb-2"
                    data-oid="3q4a7yz"
                  >
                    😅 チャレンジ
                  </h4>
                  <ul
                    className="space-y-1.5 list-disc list-inside text-sm text-slate-600"
                    data-oid="cryak1j"
                  >
                    {career.challenges.map((text, index) => (
                      <li key={index} data-oid="dxi7528">
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-oid="b62nj6e">
                  <h4
                    className="text-md font-semibold text-slate-700 mb-2"
                    data-oid="a:rzkxc"
                  >
                    🎉 やりがい・報酬
                  </h4>
                  <ul
                    className="space-y-1.5 list-disc list-inside text-sm text-slate-600"
                    data-oid="zqv5enf"
                  >
                    {career.rewards.map((text, index) => (
                      <li key={index} data-oid="93xg4xa">
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "path" && (
            <div className="space-y-5" data-oid="z8an5-9">
              <div data-oid="j8.js9:">
                <h3
                  className="text-lg font-semibold text-slate-800 mb-3"
                  data-oid="bggf2aj"
                >
                  一般的なキャリアパス
                </h3>
                <div className="space-y-3" data-oid="2btekor">
                  {career.careerPath.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200"
                      data-oid="dga-5d3"
                    >
                      <div
                        className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold mr-3 text-xs flex-shrink-0"
                        data-oid="92.d002"
                      >
                        {index + 1}
                      </div>
                      <div
                        className="text-sm text-slate-700"
                        data-oid="ne0g3i9"
                      >
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div data-oid="na:q22o">
                <h4
                  className="text-md font-semibold text-slate-700 mb-2"
                  data-oid="nw:ciy-"
                >
                  💡 キャリア開発のヒント
                </h4>
                <ul className="space-y-2.5" data-oid=":eaozt7">
                  {developmentTips.map((tip, index) => (
                    <li
                      key={index}
                      className="bg-blue-50 p-3 rounded-lg text-sm text-slate-700"
                      data-oid="2-hp5f3"
                    >
                      <strong className="text-blue-600" data-oid="ux8y1ls">
                        ヒント {index + 1}:{" "}
                      </strong>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "analysis" && (
            <div className="space-y-5" data-oid="_k03d2o">
              <InfoCard
                title="なぜこの職業があなたに適しているか"
                text={reasoning}
                textClassName="leading-relaxed"
                data-oid="pbn8yyi"
              />

              <div className="grid sm:grid-cols-2 gap-4" data-oid="qxzlvzy">
                <div data-oid="-smxh3e">
                  <h4
                    className="text-md font-semibold text-slate-700 mb-2"
                    data-oid="_guwi.e"
                  >
                    💪 あなたの強み
                  </h4>
                  <div className="space-y-1.5" data-oid="u9okmx8">
                    {strengths.map((text, index) => (
                      <div
                        key={index}
                        className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-xs sm:text-sm"
                        data-oid="dnuuozb"
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
                <div data-oid="3as-.hf">
                  <h4
                    className="text-md font-semibold text-slate-700 mb-2"
                    data-oid="k99-wf1"
                  >
                    ⚠️ 注意すべき点
                  </h4>
                  <div className="space-y-1.5" data-oid="hssog6w">
                    {challenges.map((text, index) => (
                      <div
                        key={index}
                        className="bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-lg text-xs sm:text-sm"
                        data-oid="ga1il_n"
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="bg-slate-50 p-4 rounded-lg border border-slate-200"
                data-oid="z3.ou2r"
              >
                <MatchFactorsAnalysis match={match} data-oid="zqchria" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="border-t border-slate-200 p-3 sm:p-4 flex justify-end bg-slate-50"
          data-oid="qzpgh-y"
        >
          <button
            onClick={onClose}
            className="px-5 py-2 sm:px-6 sm:py-2.5 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 text-sm sm:text-base"
            data-oid="jbhumdw"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper component for info cards in modal
const InfoCard: React.FC<{
  title: string;
  value?: string;
  text?: string;
  valueColor?: string;
  textClassName?: string;
}> = ({
  title,
  value,
  text,
  valueColor = "text-slate-800",
  textClassName = "",
}) => (
  <div
    className="bg-slate-50 p-3 sm:p-4 rounded-lg border border-slate-200"
    data-oid="p2:hzm7"
  >
    <h4
      className="text-sm sm:text-md font-semibold text-slate-700 mb-1"
      data-oid="vhueksp"
    >
      {title}
    </h4>
    {value && (
      <p
        className={`text-lg sm:text-xl font-bold ${valueColor}`}
        data-oid="v-t:t-s"
      >
        {value}
      </p>
    )}
    {text && (
      <p
        className={`text-sm text-slate-600 ${textClassName}`}
        data-oid="0vsnkmt"
      >
        {text}
      </p>
    )}
  </div>
);

export default CareerDetailModal;
