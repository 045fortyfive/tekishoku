import React from "react";
import { CareerMatch } from "../../types";

interface DevelopmentAdviceProps {
  matches: CareerMatch[];
  mbtiType: string;
}

const DevelopmentAdvice: React.FC<DevelopmentAdviceProps> = ({
  matches,
  mbtiType,
}) => {
  if (!matches || matches.length === 0) {
    return (
      <div className="text-slate-500 p-4 text-center" data-oid="kb_47jv">
        アドバイスを表示するための診断結果がありません。
      </div>
    );
  }
  const topMatch = matches[0];

  const adviceSections = [
    {
      title: "あなたの強みを活かす方法",
      icon: "💪",
      items: topMatch.strengths,
      itemPrefix: "を最大限に活用しましょう",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      title: "成長のためのヒント",
      icon: "🌱",
      items: topMatch.developmentTips.slice(0, 3),
      itemPrefix: "",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "注意すべき点",
      icon: "⚠️",
      items: topMatch.challenges,
      itemPrefix: "に気をつけましょう",
      color: "text-yellow-700",
      bgColor: "bg-yellow-50",
    },
    {
      title: `推奨キャリアパス (${topMatch.career.name.length > 10 ? topMatch.career.name.slice(0, 10) + "..." : topMatch.career.name})`,
      icon: "🛤️",
      items: topMatch.careerPath,
      isCareerPath: true,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <div
      className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
      data-oid=".3yto7m"
    >
      <h3
        className="text-lg sm:text-xl font-semibold text-slate-800 mb-4"
        data-oid="3m.3-ze"
      >
        キャリア開発のアドバイス
      </h3>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6" data-oid="t9jdqgi">
        {adviceSections.map((section) => (
          <div
            key={section.title}
            className={`${section.bgColor} p-4 rounded-lg border border-slate-200`}
            data-oid="p8d7_:e"
          >
            <h4
              className={`font-semibold ${section.color} mb-3 flex items-center text-sm sm:text-base`}
              data-oid="p_dj9f1"
            >
              <span className="mr-2 text-xl" data-oid="8k:qk1x">
                {section.icon}
              </span>{" "}
              {section.title}
            </h4>
            <ul className="space-y-1.5" data-oid="369s-fw">
              {section.items.map((item, index) => (
                <li
                  key={index}
                  className="text-xs sm:text-sm text-slate-700 flex items-start"
                  data-oid=":4f:uwx"
                >
                  {section.isCareerPath ? (
                    <>
                      <span
                        className={`bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2.5 flex-shrink-0`}
                        data-oid="cl-r5oh"
                      >
                        {index + 1}
                      </span>
                      <span data-oid="l695vx3">{item}</span>
                    </>
                  ) : (
                    <>
                      <span
                        className={`${section.color} mr-2 flex-shrink-0`}
                        data-oid=":274qw_"
                      >
                        •
                      </span>
                      <span data-oid="3lfmss0">
                        {item}
                        {section.itemPrefix}
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 via-teal-50 to-green-50 rounded-lg border border-slate-200"
        data-oid="prnv53v"
      >
        <h4
          className="font-semibold text-slate-700 mb-2 flex items-center text-sm sm:text-base"
          data-oid="m5-_hg4"
        >
          <span className="mr-2 text-xl" data-oid="aznwv--">
            🎯
          </span>
          {mbtiType}タイプへの総合アドバイス (
          {topMatch.career.name.length > 12
            ? topMatch.career.name.slice(0, 12) + "..."
            : topMatch.career.name}
          )
        </h4>
        <p
          className="text-xs sm:text-sm text-slate-600 leading-relaxed"
          data-oid=".g--ixu"
        >
          {topMatch.reasoning}
        </p>
      </div>
    </div>
  );
};

export default DevelopmentAdvice;
