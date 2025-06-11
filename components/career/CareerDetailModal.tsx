
import React, { useState, useEffect } from 'react';
import { CareerMatch } from '../../types';
import MatchFactorsAnalysis from './MatchFactorsAnalysis';
import { getGrowthLabel } from './careerUtils';

interface CareerDetailModalProps {
  match?: CareerMatch | null;
  isOpen: boolean;
  onClose: () => void;
}

const CareerDetailModal: React.FC<CareerDetailModalProps> = ({ match, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'path' | 'analysis'>('overview');
  
  useEffect(() => {
    // Reset to overview tab when a new match is selected or modal opens
    if (isOpen) {
      setActiveTab('overview');
    }
  }, [isOpen, match]);

  if (!isOpen || !match) return null;
  
  const { career, compatibilityScore, strengths, challenges, reasoning, developmentTips } = match;

  const tabItems = [
    { id: 'overview', label: '概要', icon: '📋' },
    { id: 'requirements', label: '要件・スキル', icon: '🛠️' },
    { id: 'path', label: 'キャリアパス', icon: '🛤️' },
    { id: 'analysis', label: '適性分析', icon: '📊' }
  ] as const;



  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 safe-area-left safe-area-right"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="careerDetailModalTitle"
    >
      <div
        className="bg-white rounded-xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col mobile-shadow-lg overflow-hidden mobile-modal"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-3 sm:p-4 md:p-5 relative">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1 mr-3">
              <h2 id="careerDetailModalTitle" className="text-lg sm:text-xl md:text-2xl font-bold truncate">{career.name}</h2>
              <p className="text-xs sm:text-sm text-blue-100 truncate">{career.sector}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl sm:text-3xl font-bold">{Math.round(compatibilityScore * 100)}%</div>
              <div className="text-xs sm:text-sm text-blue-100">適合度</div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="詳細モーダルを閉じる"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200">
          <nav className="flex overflow-x-auto no-scrollbar">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-medium border-b-2 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                <span className="mr-1.5 sm:mr-2 text-base sm:text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow" role="tabpanel">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">職業概要</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{career.description}</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <InfoCard title="💰 年収レンジ" value={`${career.averageSalary.min}万円 〜 ${career.averageSalary.max}万円`} valueColor="text-teal-600" />
                <InfoCard title="📈 成長見通し" value={getGrowthLabel(career.growthOutlook)} valueColor="text-blue-600" />
              </div>

              <div>
                <h4 className="text-md font-semibold text-slate-700 mb-2">🎯 主な業務内容</h4>
                <ul className="space-y-1.5 list-disc list-inside text-sm text-slate-600">
                  {career.dailyTasks.map((task, index) => <li key={index}>{task}</li>)}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">必要なスキル・知識</h3>
                <div className="flex flex-wrap gap-2">
                  {career.requiredSkills.map((skill, index) => (
                    <span key={index} className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs sm:text-sm">{skill}</span>
                  ))}
                </div>
              </div>
              <InfoCard title="🎓 学歴・資格要件" text={career.educationRequirement} />
              <div>
                <h4 className="text-md font-semibold text-slate-700 mb-2">🏢 職場環境</h4>
                <ul className="space-y-1.5 list-disc list-inside text-sm text-slate-600">
                  {career.workEnvironment.map((env, index) => <li key={index}>{env}</li>)}
                </ul>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-md font-semibold text-slate-700 mb-2">😅 チャレンジ</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-sm text-slate-600">
                    {career.challenges.map((text, index) => <li key={index}>{text}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-slate-700 mb-2">🎉 やりがい・報酬</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-sm text-slate-600">
                    {career.rewards.map((text, index) => <li key={index}>{text}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'path' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">一般的なキャリアパス</h3>
                <div className="space-y-3">
                  {career.careerPath.map((step, index) => (
                    <div key={index} className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold mr-3 text-xs flex-shrink-0">{index + 1}</div>
                      <div className="text-sm text-slate-700">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-md font-semibold text-slate-700 mb-2">💡 キャリア開発のヒント</h4>
                <ul className="space-y-2.5">
                  {developmentTips.map((tip, index) => (
                    <li key={index} className="bg-blue-50 p-3 rounded-lg text-sm text-slate-700">
                      <strong className="text-blue-600">ヒント {index + 1}: </strong>{tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-5">
              <InfoCard title="なぜこの職業があなたに適しているか" text={reasoning} textClassName="leading-relaxed" />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-md font-semibold text-slate-700 mb-2">💪 あなたの強み</h4>
                  <div className="space-y-1.5">
                    {strengths.map((text, index) => (
                      <div key={index} className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-xs sm:text-sm">{text}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-slate-700 mb-2">⚠️ 注意すべき点</h4>
                  <div className="space-y-1.5">
                    {challenges.map((text, index) => (
                      <div key={index} className="bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-lg text-xs sm:text-sm">{text}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                 <MatchFactorsAnalysis match={match} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-3 sm:p-4 flex justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-5 py-2 sm:px-6 sm:py-2.5 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 text-sm sm:text-base"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper component for info cards in modal
const InfoCard: React.FC<{title: string, value?: string, text?: string, valueColor?: string, textClassName?: string}> = ({title, value, text, valueColor = "text-slate-800", textClassName=""}) => (
  <div className="bg-slate-50 p-3 sm:p-4 rounded-lg border border-slate-200">
    <h4 className="text-sm sm:text-md font-semibold text-slate-700 mb-1">{title}</h4>
    {value && <p className={`text-lg sm:text-xl font-bold ${valueColor}`}>{value}</p>}
    {text && <p className={`text-sm text-slate-600 ${textClassName}`}>{text}</p>}
  </div>
);

export default CareerDetailModal;