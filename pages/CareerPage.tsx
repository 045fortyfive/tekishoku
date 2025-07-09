import React, { useMemo } from "react";
import { getAllCareers } from "../lib/career-data";
import { MBTI_COMPATIBILITY } from "../lib/mbti-compatibility";
import { Link } from "react-router-dom";
import { BriefcaseIcon } from "../constants"; // Assuming an icon for general career page

interface CareerDetail {
  id: number;
  name: string;
  description: string;
  sector: string;
  averageSalary: { min: number; max: number };
  suitableTypes: Array<{
    type: string;
    score: number;
    strengths: string[];
    reasoning: string;
  }>;
}

const CareerPage: React.FC = () => {
  const careers = getAllCareers();

  const careerDetails: CareerDetail[] = useMemo(() => {
    return careers.map((career) => {
      const suitableTypes: CareerDetail["suitableTypes"] = [];
      MBTI_COMPATIBILITY.forEach((mbtiCompat) => {
        const scoreData = mbtiCompat.careerScores.find(
          (cs) => cs.careerId === career.id,
        );
        if (scoreData && scoreData.score >= 0.75) {
          // Threshold for "suitable"
          suitableTypes.push({
            type: mbtiCompat.mbtiType,
            score: scoreData.score,
            strengths: scoreData.strengths,
            reasoning: scoreData.reasoning,
          });
        }
      });
      // Sort suitable types by score descending for this career
      suitableTypes.sort((a, b) => b.score - a.score);
      return {
        id: career.id,
        name: career.name,
        description: career.description,
        sector: career.sector,
        averageSalary: career.averageSalary,
        suitableTypes,
      };
    });
  }, [careers]);

  return (
    <div className="min-h-screen bg-slate-100 p-4" data-oid=".nnrmcp">
      <div
        className="container mx-auto max-w-5xl py-6 sm:py-8"
        data-oid="u_ku0dd"
      >
        <header className="text-center mb-8 sm:mb-10" data-oid="5d-bw:6">
          <BriefcaseIcon
            className="w-12 h-12 text-blue-600 mx-auto mb-3"
            data-oid="x7_yz2a"
          />

          <h1
            className="text-3xl sm:text-4xl font-bold text-slate-800"
            data-oid="vk44jr8"
          >
            タイプ別適職ガイド
          </h1>
          <p
            className="text-slate-600 mt-2 text-sm sm:text-base max-w-2xl mx-auto"
            data-oid="j0.x_21"
          >
            様々なキャリアオプションと、それぞれの職業にどのようなMBTIタイプが適しているかを探求しましょう。
          </p>
        </header>

        {careerDetails.length === 0 && (
          <p className="text-center text-slate-500" data-oid="2w3ur9e">
            現在表示できる職業情報がありません。
          </p>
        )}

        <div className="space-y-6 sm:space-y-8" data-oid="zoai0dz">
          {careerDetails.map((career) => (
            <article
              key={career.id}
              className="bg-white p-5 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              data-oid="1dndzks"
            >
              <h2
                className="text-xl sm:text-2xl font-semibold text-blue-700 mb-2"
                data-oid="lk2_vgh"
              >
                {career.name}
              </h2>
              <p className="text-xs text-slate-500 mb-1" data-oid="2bpp1wg">
                <span className="font-medium" data-oid="yoedrl4">
                  分野:
                </span>{" "}
                {career.sector} |{" "}
                <span className="font-medium" data-oid="oz5rvph">
                  平均年収:
                </span>{" "}
                {career.averageSalary.min}万～{career.averageSalary.max}万円
              </p>
              <p
                className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-3 sm:line-clamp-none"
                data-oid="0:lzbht"
              >
                {career.description}
              </p>

              {career.suitableTypes.length > 0 && (
                <div
                  className="mt-4 pt-4 border-t border-slate-200"
                  data-oid="ba6pig7"
                >
                  <h3
                    className="text-md sm:text-lg font-semibold text-slate-700 mb-3"
                    data-oid="gc3vjp5"
                  >
                    この職業に向いているタイプ:
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4" data-oid="fs2i8aa">
                    {career.suitableTypes.slice(0, 4).map(
                      (
                        st, // Show top 4 suitable types for brevity
                      ) => (
                        <div
                          key={st.type}
                          className="bg-slate-50 p-3 rounded-lg border border-slate-200"
                          data-oid="wfcizdx"
                        >
                          <p
                            className="font-bold text-blue-600 text-sm sm:text-base"
                            data-oid="la8br5."
                          >
                            {st.type} (適合度: {Math.round(st.score * 100)}%)
                          </p>
                          <p
                            className="text-xs text-slate-600 mt-1 mb-1.5 font-medium"
                            data-oid="0pmr2hg"
                          >
                            おすすめのアプローチ:
                          </p>
                          <ul
                            className="list-disc list-inside space-y-0.5 text-xs text-slate-500"
                            data-oid=":5a_3ap"
                          >
                            {st.strengths.slice(0, 2).map((strength) => (
                              <li key={strength} data-oid="7a3.m8j">
                                {strength}を活かす
                              </li>
                            ))}
                          </ul>
                          <p
                            className="text-xs text-slate-500 mt-1.5 line-clamp-2"
                            data-oid="y:yyg:z"
                          >
                            <span className="font-medium" data-oid="-5sjaw-">
                              理由:
                            </span>{" "}
                            {st.reasoning}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                  {career.suitableTypes.length > 4 && (
                    <p
                      className="text-xs text-slate-500 mt-2 text-center"
                      data-oid="vlxyfqr"
                    >
                      他 {career.suitableTypes.length - 4} タイプも適性あり
                    </p>
                  )}
                </div>
              )}
              {career.suitableTypes.length === 0 && (
                <p className="text-sm text-slate-500 mt-3" data-oid="3lxh-qc">
                  この職業に特に高い適性を示すMBTIタイプは現在のデータでは明確ではありませんが、多くのタイプが活躍できる可能性があります。
                </p>
              )}
              <div className="mt-5 text-right" data-oid=".lchcnj">
                <Link
                  to={`/diagnosis?initiate=true&careerFocus=${career.id}`} // Pass careerId to potentially focus results
                  className="text-sm text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                  data-oid="fizw2ml"
                >
                  自分のタイプで適性を見る →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p
          className="text-center text-slate-500 mt-10 text-xs"
          data-oid="2gsqh-f"
        >
          より詳しい適性やあなた自身のタイプに基づいた結果は、「診断」ページをご利用ください。
        </p>
      </div>
    </div>
  );
};

export default CareerPage;
