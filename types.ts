
export interface CareerCategory {
  id: number;
  name: string;
  description: string;
  sector: string;
  requiredSkills: string[];
  averageSalary: {
    min: number;
    max: number;
  };
  workStyle: {
    remote: boolean;
    teamwork: number; // 1-5 (1=個人作業中心, 5=チーム作業中心)
    independence: number; // 1-5 (1=指示待ち, 5=自主性重視)
    creativity: number; // 1-5 (1=ルーチン作業, 5=創造性重視)
    structure: number; // 1-5 (1=柔軟, 5=構造化)
  };
  growthOutlook: 'excellent' | 'good' | 'stable' | 'declining';
  educationRequirement: string;
  careerPath: string[];
  dailyTasks: string[];
  workEnvironment: string[];
  challenges: string[];
  rewards: string[];
}

export interface MBTICareerScore {
  careerId: number;
  score: number;
  strengths: string[];
  challenges: string[];
  reasoning: string;
}

export interface MBTICompatibility {
  mbtiType: string;
  careerScores: MBTICareerScore[];
}

export interface MatchFactors {
  personalityFit: number;
  skillAlignment: number;
  workStyleMatch: number;
  growthPotential: number;
}

export interface CareerMatch {
  career: CareerCategory;
  compatibilityScore: number;
  rank: number;
  strengths: string[];
  challenges: string[];
  reasoning: string;
  developmentTips: string[];
  careerPath: string[];
  matchFactors: MatchFactors;
}

export interface UserProfile {
  mbtiType: string;
  skills?: string[];
  experienceYears?: number;
  educationLevel?: string;
  preferredWorkStyle?: {
    remote?: boolean;
    teamwork?: number;
    independence?: number;
    creativity?: number;
    structure?: number;
  };
  careerGoals?: string[];
  industries?: string[];
}

export enum Page {
  Home = 'Home',
  Diagnosis = 'Diagnosis',
  Career = 'Career', // Placeholder for "適職タイプを知る" or similar
  MyPage = 'MyPage', // Placeholder
  Consultation = 'Consultation' // Placeholder
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}