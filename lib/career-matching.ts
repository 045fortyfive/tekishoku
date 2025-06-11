
import { getCareerById } from './career-data';
import { getMBTICompatibility, getCareerCompatibilityScore } from './mbti-compatibility';
import { CareerCategory, CareerMatch, UserProfile } from '../types';

/**
 * メイン関数：MBTI タイプに基づいて適職マッチングを実行
 */
export function calculateCareerMatches(
  mbtiType: string, 
  userProfile?: Partial<UserProfile>
): CareerMatch[] {
  // 1. MBTI適性データを取得
  const compatibility = getMBTICompatibility(mbtiType);
  if (!compatibility) {
    // console.error(`MBTI type ${mbtiType} not found in compatibility data.`);
    return []; // Return empty array or throw error
  }

  // 2. 各職業とのマッチング計算
  const matches: CareerMatch[] = compatibility.careerScores.map(scoreData => {
    const career = getCareerById(scoreData.careerId);
    if (!career) {
      // console.error(`Career with ID ${scoreData.careerId} not found.`);
      // Skip this entry or handle error appropriately
      return null; 
    }

    // 基本適性スコア
    const baseScore = scoreData.score;
    
    // ユーザープロフィールによる調整
    const adjustedScore = userProfile 
      ? adjustScoreByUserProfile(baseScore, career, userProfile)
      : baseScore;

    // マッチング要因の詳細分析
    const matchFactors = calculateMatchFactors(mbtiType, career, userProfile);

    return {
      career,
      compatibilityScore: adjustedScore,
      rank: 0, // 後でソート時に設定
      strengths: scoreData.strengths,
      challenges: scoreData.challenges,
      reasoning: scoreData.reasoning,
      developmentTips: generateDevelopmentTips(mbtiType, career),
      careerPath: career.careerPath,
      matchFactors
    };
  }).filter(match => match !== null) as CareerMatch[]; // Filter out nulls if any career was not found

  // 3. スコア順にソート・ランキング設定
  return matches
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
    .map((match, index) => ({ ...match, rank: index + 1 }));
}

/**
 * ユーザープロフィールに基づくスコア調整
 */
function adjustScoreByUserProfile(
  baseScore: number,
  career: CareerCategory,
  userProfile: Partial<UserProfile>
): number {
  let adjustedScore = baseScore;
  
  if (userProfile.skills && userProfile.skills.length > 0) {
    const skillMatch = calculateSkillMatch(userProfile.skills, career.requiredSkills);
    adjustedScore += (skillMatch - 0.5) * 0.2; 
  }

  if (userProfile.preferredWorkStyle) {
    const workStyleMatch = calculateWorkStyleMatch(userProfile.preferredWorkStyle, career.workStyle);
    adjustedScore += (workStyleMatch - 0.5) * 0.1;
  }

  if (userProfile.experienceYears !== undefined) {
    const experienceMatch = calculateExperienceMatch(userProfile.experienceYears, career);
    adjustedScore += (experienceMatch - 0.5) * 0.1;
  }

  return Math.max(0, Math.min(1, adjustedScore));
}

/**
 * スキルマッチング計算
 */
function calculateSkillMatch(userSkills: string[], requiredSkills: string[]): number {
  if (requiredSkills.length === 0) return 0.5;
  
  const matchCount = requiredSkills.filter(required => 
    userSkills.some(userSkill => 
      userSkill.toLowerCase().includes(required.toLowerCase()) ||
      required.toLowerCase().includes(userSkill.toLowerCase())
    )
  ).length;
  
  return matchCount / requiredSkills.length;
}

/**
 * 働き方マッチング計算
 */
function calculateWorkStyleMatch(
  userPreference: NonNullable<UserProfile['preferredWorkStyle']>,
  careerWorkStyle: CareerCategory['workStyle']
): number {
  let totalScore = 0;
  let factorCount = 0;

  if (userPreference.remote !== undefined) {
    totalScore += userPreference.remote === careerWorkStyle.remote ? 1 : 0;
    factorCount++;
  }

  const numericFactors: (keyof Pick<typeof careerWorkStyle, 'teamwork' | 'independence' | 'creativity' | 'structure'>)[] = 
    ['teamwork', 'independence', 'creativity', 'structure'];
  
  numericFactors.forEach(factor => {
    if (userPreference[factor] !== undefined && careerWorkStyle[factor] !== undefined) {
      const diff = Math.abs((userPreference[factor] || 0) - careerWorkStyle[factor]);
      totalScore += 1 - (diff / 4); 
      factorCount++;
    }
  });

  return factorCount > 0 ? totalScore / factorCount : 0.5;
}

/**
 * 経験年数マッチング計算
 */
function calculateExperienceMatch(experienceYears: number, career: CareerCategory): number {
  const pathLength = career.careerPath.length;
  const expectedYearsPerStep = pathLength > 0 ? (12 / pathLength) : 3; // Simplified: assume 12 years for full path
  
  let bestMatch = 0;
  for(let i=0; i < pathLength; i++) {
    const expected = i * expectedYearsPerStep;
    const diff = Math.abs(experienceYears - expected);
    const match = Math.max(0, 1 - diff / 10);
    bestMatch = Math.max(bestMatch, match);
  }
  if (pathLength === 0) return 0.5; // No career path info
  
  return bestMatch;
}

/**
 * マッチング要因の詳細分析
 */
function calculateMatchFactors(
  mbtiType: string,
  career: CareerCategory,
  userProfile?: Partial<UserProfile>
): CareerMatch['matchFactors'] {
  const personalityFit = getCareerCompatibilityScore(mbtiType, career.id);
  
  const skillAlignment = userProfile?.skills 
    ? calculateSkillMatch(userProfile.skills, career.requiredSkills)
    : 0.5; // Default if no user skills
  
  const workStyleMatch = userProfile?.preferredWorkStyle
    ? calculateWorkStyleMatch(userProfile.preferredWorkStyle, career.workStyle)
    : 0.5; // Default
  
  const growthPotential = calculateGrowthPotential(career);
  
  return {
    personalityFit,
    skillAlignment,
    workStyleMatch,
    growthPotential
  };
}

/**
 * 成長ポテンシャル計算
 */
function calculateGrowthPotential(career: CareerCategory): number {
  const outlookScores = {
    'excellent': 1.0,
    'good': 0.8,
    'stable': 0.6,
    'declining': 0.3
  };
  
  const outlookScore = outlookScores[career.growthOutlook] || 0.5;
  const salaryScore = Math.min(career.averageSalary.max / 1500, 1.0);
  
  return (outlookScore * 0.7 + salaryScore * 0.3);
}

/**
 * 個別化された開発提案生成
 */
function generateDevelopmentTips(mbtiType: string, career: CareerCategory): string[] {
  // const traits = getMBTITraits(mbtiType); // Not used in provided simplified logic
  const tips: string[] = [];
  
  const basicTips = getMBTIBasicDevelopmentTips(mbtiType);
  tips.push(...basicTips);
  
  const careerSpecificTips = getCareerSpecificTips(mbtiType, career);
  tips.push(...careerSpecificTips);
  
  return Array.from(new Set(tips)).slice(0, 5); // Unique tips, max 5
}

/**
 * MBTIタイプの基本特性取得 (Not directly used in current tip generation but good to have)
 */
// function getMBTITraits(mbtiType: string): {
//   energySource: 'E' | 'I';
//   informationGathering: 'S' | 'N';
//   decisionMaking: 'T' | 'F';
//   lifestyle: 'J' | 'P';
// } {
//   return {
//     energySource: mbtiType[0] as 'E' | 'I',
//     informationGathering: mbtiType[1] as 'S' | 'N',
//     decisionMaking: mbtiType[2] as 'T' | 'F',
//     lifestyle: mbtiType[3] as 'J' | 'P'
//   };
// }

/**
 * MBTIタイプ別基本開発アドバイス
 */
function getMBTIBasicDevelopmentTips(mbtiType: string): string[] {
  const tips: Record<string, string[]> = {
    'INTJ': ['戦略的思考を活かしつつ、チームとのコミュニケーションスキルを向上させましょう', '長期的視点を維持しながら、短期的な成果も意識することで評価が向上します'],
    'INTP': ['理論的知識を実践に応用するスキルを身につけましょう', 'プレゼンテーション能力を向上させて、アイデアを効果的に伝えましょう'],
    'ENTJ': ['リーダーシップを発揮しつつ、チームメンバーの感情にも配慮しましょう', '部下の育成とモチベーション管理のスキルを向上させましょう'],
    'ENTP': ['創造的なアイデアを実行に移すためのプロジェクト管理スキルを身につけましょう', '継続性と集中力を向上させるためのタイムマネジメント手法を学びましょう'],
    'INFJ': ['直感的な洞察を論理的に説明するスキルを向上させましょう', '一対一の関係性を大人数の環境でも活かせるよう応用しましょう'],
    'INFP': ['価値観を大切にしながらも、ビジネス的な視点も養いましょう', '自分のアイデアを効果的にプレゼンテーションするスキルを身につけましょう'],
    'ENFJ': ['人材育成の才能を活かしつつ、数値管理のスキルも向上させましょう', '感情的な配慮と客観的な判断のバランスを取る練習をしましょう'],
    'ENFP': ['豊かな発想力を具体的な成果に結びつけるためのプロセス管理を学びましょう', '熱意を維持しながら継続的に取り組むためのモチベーション管理を身につけましょう'],
    'ISTJ': ['確実性を重視する姿勢を活かしつつ、変化への適応力も向上させましょう', '詳細な作業能力をチーム全体の効率向上に活かす方法を学びましょう'],
    'ISFJ': ['サポート精神を活かしつつ、リーダーシップスキルも身につけましょう', '個別対応の能力を大規模な組織運営でも活用できるよう発展させましょう'],
    'ESTJ': ['効率的な組織運営能力を活かしつつ、個人の感情への配慮も学びましょう', '目標達成力を維持しながら、創造性も取り入れる柔軟性を身につけましょう'],
    'ESFJ': ['チームワークの才能を活かしつつ、数値分析のスキルも向上させましょう', '人間関係重視の姿勢を保ちながら、厳しい決断もできるよう成長しましょう'],
    'ISTP': ['実践的な問題解決能力を活かしつつ、チームコミュニケーションも向上させましょう', '技術的な専門性を深めながら、ビジネス視点も身につけましょう'],
    'ISFP': ['個性と価値観を大切にしながら、チームでの協働スキルも身につけましょう', '創造性を発揮しつつ、ビジネス的な成果も意識できるよう成長しましょう'],
    'ESTP': ['行動力と適応力を活かしつつ、長期的な計画立案スキルも向上させましょう', '瞬発力を維持しながら、継続的な取り組みも身につけましょう'],
    'ESFP': ['人とのつながりを大切にしながら、専門スキルも継続的に向上させましょう', '明るいエネルギーを活かしつつ、詳細な作業にも集中できるよう練習しましょう']
  };
  return tips[mbtiType] || ['継続的な学習と自己改善に取り組みましょう'];
}

/**
 * 職業特有の開発アドバイス
 */
function getCareerSpecificTips(mbtiType: string, career: CareerCategory): string[] {
  const tips: string[] = [];
  // const traits = getMBTITraits(mbtiType); // To use traits, uncomment the function above

  switch (career.id) {
    case 1: tips.push(mbtiType.startsWith('E') ? 'チーム開発でのコミュニケーション能力を活かし、テックリードを目指しましょう' : '深い技術力を身につけ、アーキテクトやスペシャリストの道を検討しましょう'); break;
    case 3: tips.push(mbtiType.includes('T') ? '数値分析力を活かした戦略的営業を強みにしましょう' : '顧客との関係構築力を活かし、長期的なパートナーシップを築きましょう'); break;
    case 7: tips.push(mbtiType.includes('N') ? '組織の可能性を見抜く力を活かし、変革的な人事施策を提案しましょう' : '実践的な人事制度設計と運用に力を発揮しましょう'); break;
    case 14: tips.push(mbtiType.endsWith('J') ? '計画性と実行力を活かし、着実な組織成長を実現しましょう' : '柔軟性と適応力を活かし、変化に強い組織運営を目指しましょう'); break;
    default: tips.push(`${career.name}の専門性を深めながら、関連スキルの幅も広げましょう`);
  }
  return tips;
}
