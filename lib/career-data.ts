
import { CareerCategory } from '../types';

export const CAREER_CATEGORIES: CareerCategory[] = [
  {
    id: 1,
    name: 'ITエンジニア・システム開発',
    description: 'ソフトウェア開発、システム構築、アプリケーション開発を通じて技術的な問題を解決する職業。フロントエンド、バックエンド、インフラなど専門領域が多岐にわたる。',
    sector: 'IT・テクノロジー',
    requiredSkills: [
      'プログラミング言語（Java、Python、JavaScript等）',
      'システム設計・アーキテクチャ',
      '論理的思考・問題解決',
      'データベース設計',
      'クラウド技術（AWS、Azure等）',
      'アジャイル開発手法',
      '継続的学習意欲',
      'チームコミュニケーション'
    ],
    averageSalary: { min: 400, max: 1200 },
    workStyle: {
      remote: true,
      teamwork: 4,
      independence: 4,
      creativity: 4,
      structure: 3
    },
    growthOutlook: 'excellent',
    educationRequirement: '大学卒業以上（理系・情報系優遇、未経験からの転身も可能）',
    careerPath: [
      'ジュニアエンジニア（1-2年）',
      'エンジニア（3-5年）',
      'シニアエンジニア（5-8年）',
      'テックリード・アーキテクト（8年以上）',
      'エンジニアリングマネージャー'
    ],
    dailyTasks: [
      'プログラムコードの作成・レビュー',
      'システム設計・仕様検討',
      'バグ修正・デバッグ',
      'チームメンバーとの技術的議論',
      '新技術の調査・検証',
      'プロジェクト進捗管理'
    ],
    workEnvironment: [
      '開発チーム（5-15人程度）',
      'リモートワーク対応',
      'フレックスタイム制',
      '技術書・研修費支援',
      'モニター複数台環境'
    ],
    challenges: [
      '技術の急速な変化への対応',
      '複雑な要件の理解・実装',
      'バグやシステム障害への対処',
      '納期とクオリティのバランス'
    ],
    rewards: [
      '自分の作ったシステムが多くの人に使われる',
      '技術力向上による市場価値向上',
      '論理的思考力の向上',
      'リモートワークの自由度'
    ]
  },

  {
    id: 2,
    name: 'データサイエンティスト・アナリスト',
    description: 'ビッグデータの分析、機械学習、統計解析を通じてビジネス価値を創出する専門職。データから意味のある洞察を導き出し、経営判断をサポートする。',
    sector: 'IT・データ分析',
    requiredSkills: [
      '統計学・数学',
      'プログラミング（Python、R、SQL）',
      '機械学習・AI技術',
      'データ可視化（Tableau、Power BI）',
      'ビジネス理解・仮説構築',
      'プレゼンテーション能力',
      '数値的思考',
      'Excel・データ処理'
    ],
    averageSalary: { min: 500, max: 1500 },
    workStyle: {
      remote: true,
      teamwork: 3,
      independence: 5,
      creativity: 4,
      structure: 3
    },
    growthOutlook: 'excellent',
    educationRequirement: '大学院卒業以上（理系・統計学・データサイエンス専攻優遇）',
    careerPath: [
      'ジュニアデータアナリスト（1-2年）',
      'データアナリスト（3-5年）',
      'シニアデータサイエンティスト（5-8年）',
      'リードデータサイエンティスト（8年以上）',
      'データ戦略責任者・CDO'
    ],
    dailyTasks: [
      'データ収集・前処理・クリーニング',
      '統計分析・機械学習モデル構築',
      'ダッシュボード・レポート作成',
      'ビジネス部門との要件ヒアリング',
      '分析結果のプレゼンテーション',
      'データ基盤・パイプライン設計'
    ],
    workEnvironment: [
      'データチーム・分析部門',
      'リモートワーク中心',
      '高性能PC・GPU環境',
      '学会参加・研修支援',
      'クロスファンクショナルチーム'
    ],
    challenges: [
      '不完全・ノイズのあるデータの処理',
      'ビジネス要件の技術的実現',
      '分析結果の分かりやすい説明',
      '技術とビジネスの橋渡し'
    ],
    rewards: [
      'データから新しい発見・価値創出',
      '経営判断への直接的貢献',
      '高い専門性による市場価値',
      '研究的側面での知的満足'
    ]
  },

  {
    id: 3,
    name: '営業・セールス',
    description: '顧客との関係構築を通じて製品・サービスの販売促進を行う職業。法人営業、個人営業、内勤営業など様々な形態がある。',
    sector: '営業・販売',
    requiredSkills: [
      'コミュニケーション能力',
      '交渉・説得力',
      '関係構築・信頼獲得',
      '目標達成志向',
      '市場・顧客理解',
      'プレゼンテーション能力',
      'ストレス耐性',
      'フットワークの軽さ'
    ],
    averageSalary: { min: 350, max: 1000 },
    workStyle: {
      remote: false,
      teamwork: 4,
      independence: 3,
      creativity: 3,
      structure: 3
    },
    growthOutlook: 'good',
    educationRequirement: '大学卒業以上（学部不問、人物重視）',
    careerPath: [
      '営業アシスタント（1年）',
      '営業担当（2-5年）',
      '主任・係長（5-8年）',
      '営業課長・マネージャー（8-12年）',
      '営業部長・執行役員'
    ],
    dailyTasks: [
      '顧客訪問・商談',
      '提案書・見積書作成',
      '既存顧客のフォローアップ',
      '新規開拓・テレアポ',
      '社内会議・情報共有',
      '売上管理・実績報告'
    ],
    workEnvironment: [
      '営業チーム（10-30人）',
      '外回り中心',
      '営業車・交通費支給',
      'CRMシステム活用',
      '成果主義の評価制度'
    ],
    challenges: [
      'ノルマ・売上目標のプレッシャー',
      '顧客からの厳しい要求への対応',
      '競合他社との差別化',
      '経済状況による市場変化'
    ],
    rewards: [
      '成果が数字として明確に現れる',
      '顧客との信頼関係構築',
      '高い営業成績による報酬',
      '様々な業界・企業との接点'
    ]
  },

  {
    id: 4,
    name: 'マーケティング・企画',
    description: '市場分析、商品企画、プロモーション戦略の立案・実行を通じて、ブランド価値向上と売上拡大を目指す職業。デジタルマーケティングの重要性が高まっている。',
    sector: '企画・マーケティング',
    requiredSkills: [
      '市場分析・リサーチ',
      'デジタルマーケティング',
      '企画立案・戦略思考',
      'データ分析・KPI管理',
      'クリエイティブ思考',
      'プロジェクト管理',
      'コミュニケーション能力',
      'トレンド感度'
    ],
    averageSalary: { min: 400, max: 900 },
    workStyle: {
      remote: true,
      teamwork: 4,
      independence: 4,
      creativity: 5,
      structure: 3
    },
    growthOutlook: 'excellent',
    educationRequirement: '大学卒業以上（経済・経営・マーケティング専攻優遇）',
    careerPath: [
      'マーケティングアシスタント（1-2年）',
      'マーケティング担当（3-5年）',
      'シニアマーケター（5-8年）',
      'マーケティングマネージャー（8年以上）',
      'CMO・マーケティング責任者'
    ],
    dailyTasks: [
      '市場調査・競合分析',
      'マーケティング戦略立案',
      '広告・プロモーション企画',
      'SNS・Web施策の運用',
      '効果測定・レポート作成',
      '社内外ミーティング・調整'
    ],
    workEnvironment: [
      'マーケティング部門',
      'クリエイティブな職場環境',
      'リモートワーク対応',
      '最新のマーケティングツール',
      '外部代理店との連携'
    ],
    challenges: [
      '変化の早いデジタル技術への対応',
      'ROI（投資対効果）の証明',
      '複数施策の同時進行管理',
      'ブランドイメージの維持・向上'
    ],
    rewards: [
      '自分の企画が市場に影響を与える',
      'クリエイティブな発想の実現',
      '最新トレンドへの感度向上',
      '幅広いスキルの習得'
    ]
  },

  {
    id: 5,
    name: 'コンサルタント',
    description: '企業の経営課題解決をサポートする専門職。戦略コンサル、ITコンサル、業務改善コンサルなど専門分野は多岐にわたる。',
    sector: 'コンサルティング',
    requiredSkills: [
      '論理的思考・問題解決',
      '戦略立案・企画力',
      'プレゼンテーション能力',
      '業界知識・専門性',
      'プロジェクト管理',
      'コミュニケーション能力',
      '数値分析・Excel',
      'ストレス耐性'
    ],
    averageSalary: { min: 500, max: 2000 },
    workStyle: {
      remote: false,
      teamwork: 4,
      independence: 4,
      creativity: 4,
      structure: 4
    },
    growthOutlook: 'good',
    educationRequirement: '大学卒業以上（MBA、難関大学卒業者が多い）',
    careerPath: [
      'アナリスト（1-3年）',
      'コンサルタント（3-6年）',
      'シニアコンサルタント（6-9年）',
      'マネージャー・ディレクター（9年以上）',
      'パートナー・独立'
    ],
    dailyTasks: [
      'クライアント企業の課題分析',
      'データ収集・分析',
      '解決策の立案・検討',
      'クライアントへの提案・報告',
      'プロジェクト進行管理',
      '業界・技術動向の調査'
    ],
    workEnvironment: [
      'プロジェクトチーム（3-8人）',
      'クライアント企業への常駐',
      '出張・移動が多い',
      '高水準の成果物要求',
      '学習・研修機会の充実'
    ],
    challenges: [
      '厳しいデッドライン',
      'クライアントからの高い期待',
      '多様な業界・課題への対応',
      '長時間労働になりがち'
    ],
    rewards: [
      '企業の重要な意思決定に関与',
      '多様な業界・企業の経験',
      '高い報酬・キャリア形成',
      '問題解決スキルの向上'
    ]
  },

  {
    id: 6,
    name: '財務・経理・会計',
    description: '企業の資金管理、会計処理、財務分析を担当する職業。企業の経営基盤を数字で支える重要な役割を果たす。',
    sector: '管理・事務',
    requiredSkills: [
      '簿記・会計知識',
      '税務・法務知識',
      '数値分析・Excel',
      '財務諸表作成・分析',
      '正確性・細心さ',
      'ERP・会計システム',
      'コミュニケーション能力',
      'コンプライアンス意識'
    ],
    averageSalary: { min: 350, max: 800 },
    workStyle: {
      remote: true,
      teamwork: 3,
      independence: 4,
      creativity: 2,
      structure: 5
    },
    growthOutlook: 'stable',
    educationRequirement: '大学卒業以上（経済・経営・会計学専攻優遇、簿記2級以上）',
    careerPath: [
      '経理アシスタント（1-2年）',
      '経理担当（3-5年）',
      '主任・係長（5-8年）',
      '経理課長・マネージャー（8年以上）',
      'CFO・財務責任者'
    ],
    dailyTasks: [
      '日次・月次・年次決算業務',
      '帳簿記帳・伝票処理',
      '財務諸表作成',
      '税務申告・監査対応',
      '予算管理・実績分析',
      '資金繰り・投資評価'
    ],
    workEnvironment: [
      '経理・財務部門',
      '規則正しい業務サイクル',
      '会計システム・Excel中心',
      '監査法人・税理士との連携',
      '月末・年度末の繁忙期'
    ],
    challenges: [
      '法改正・会計基準変更への対応',
      '決算期の業務集中',
      '高い正確性の要求',
      'システム化による業務変化'
    ],
    rewards: [
      '企業経営の数字的理解',
      '安定した職業・転職しやすさ',
      '専門資格によるキャリア形成',
      '責任ある仕事への充実感'
    ]
  },

  {
    id: 7,
    name: '人事・労務',
    description: '採用、人材育成、労務管理、人事制度設計など、企業の「人」に関するあらゆる業務を担当する職業。組織の活性化と従業員満足度向上を目指す。',
    sector: '管理・人事',
    requiredSkills: [
      'コミュニケーション能力',
      '労働法・人事制度知識',
      '採用・面接スキル',
      '人材育成・研修企画',
      'データ分析・HR Tech',
      '調整・交渉能力',
      '機密保持・倫理観',
      'プロジェクト管理'
    ],
    averageSalary: { min: 350, max: 750 },
    workStyle: {
      remote: true,
      teamwork: 5,
      independence: 3,
      creativity: 4,
      structure: 4
    },
    growthOutlook: 'good',
    educationRequirement: '大学卒業以上（心理学・経営学専攻優遇、社労士資格歓迎）',
    careerPath: [
      '人事アシスタント（1-2年）',
      '人事担当（3-5年）',
      '人事主任・係長（5-8年）',
      '人事課長・マネージャー（8年以上）',
      'CHRO・人事責任者'
    ],
    dailyTasks: [
      '採用活動・面接実施',
      '人事制度企画・運用',
      '研修・教育プログラム実施',
      '労務管理・勤怠管理',
      '人事評価・査定業務',
      '社内イベント・制度改善'
    ],
    workEnvironment: [
      '人事部門・人事チーム',
      '様々な部署との連携',
      'HR Techツール活用',
      '外部研修・セミナー参加',
      '機密情報の取り扱い'
    ],
    challenges: [
      '多様な価値観の従業員への対応',
      '労働法改正への迅速な対応',
      '採用難・人材不足への対策',
      '働き方改革の推進'
    ],
    rewards: [
      '人の成長・キャリア支援',
      '組織文化の構築・改善',
      '従業員からの感謝・信頼',
      '人間理解の深化'
    ]
  },

  {
    id: 8,
    name: '研究・開発',
    description: '新技術の開発、製品改良、基礎研究など、イノベーション創出を目指す職業。長期的視点で取り組む研究から実用化まで幅広い。',
    sector: '研究・技術',
    requiredSkills: [
      '専門知識・技術力',
      '論理的思考・仮説構築',
      '実験・検証能力',
      '文献調査・情報収集',
      '忍耐力・継続性',
      'レポート・論文作成',
      'チームワーク・協働',
      '創造性・発想力'
    ],
    averageSalary: { min: 400, max: 1100 },
    workStyle: {
      remote: false,
      teamwork: 4,
      independence: 5,
      creativity: 5,
      structure: 3
    },
    growthOutlook: 'good',
    educationRequirement: '大学院卒業以上（理系専攻、博士号優遇）',
    careerPath: [
      '研究員・開発者（1-5年）',
      '主任研究員（5-10年）',
      '研究グループリーダー（10-15年）',
      '研究部長・技術責任者（15年以上）',
      'CTO・技術顧問'
    ],
    dailyTasks: [
      '実験・データ収集',
      '研究計画立案・実行',
      'データ分析・考察',
      '研究報告書・論文作成',
      '学会発表・外部発表',
      '特許申請・知財管理'
    ],
    workEnvironment: [
      '研究所・ラボ',
      '専門機器・設備',
      '研究チーム（5-15人）',
      '学会・研究機関との連携',
      '長期プロジェクト中心'
    ],
    challenges: [
      '研究成果の不確実性',
      '長期間の地道な作業',
      '研究予算・リソースの制約',
      '実用化・商品化のプレッシャー'
    ],
    rewards: [
      '新発見・技術革新への貢献',
      '専門性の極める喜び',
      '論文発表・特許取得',
      '社会貢献・人類への貢献'
    ]
  },

  {
    id: 9,
    name: 'デザイナー・クリエイター',
    description: 'UI/UX、グラフィック、Web、プロダクトデザインなど、視覚的・体験的価値創造を行う職業。美的感覚と技術スキルの両方が求められる。',
    sector: 'クリエイティブ',
    requiredSkills: [
      'デザインソフト（Adobe、Figma等）',
      '美的感覚・センス',
      'UI/UXデザイン',
      'プロトタイピング',
      'ユーザー理解・共感',
      'トレンド感度',
      'コミュニケーション能力',
      'プレゼンテーション'
    ],
    averageSalary: { min: 350, max: 800 },
    workStyle: {
      remote: true,
      teamwork: 4,
      independence: 4,
      creativity: 5,
      structure: 2
    },
    growthOutlook: 'good',
    educationRequirement: '大学・専門学校卒業（美術・デザイン専攻、ポートフォリオ重視）',
    careerPath: [
      'ジュニアデザイナー（1-2年）',
      'デザイナー（3-5年）',
      'シニアデザイナー（5-8年）',
      'アートディレクター（8年以上）',
      'クリエイティブディレクター'
    ],
    dailyTasks: [
      'デザインコンセプト検討',
      'ワイヤーフレーム・モックアップ作成',
      'ビジュアルデザイン制作',
      'プロトタイプ作成・検証',
      'クライアント・チームとの打ち合わせ',
      'デザインガイドライン策定'
    ],
    workEnvironment: [
      'デザインチーム・制作会社',
      'クリエイティブな職場環境',
      '高性能PC・デザインツール',
      'リモートワーク対応',
      'フレックスタイム制'
    ],
    challenges: [
      'クライアント要求とデザイン理念の両立',
      '短納期でのクオリティ維持',
      'デザイントレンドの急速な変化',
      '主観的評価への対応'
    ],
    rewards: [
      '自分の作品が世に出る喜び',
      '創造性・美的感覚の発揮',
      'ユーザーからの良い評価',
      '多様なプロジェクトへの参加'
    ]
  },

  {
    id: 10,
    name: '教育・研修',
    description: '企業研修、教育コンテンツ開発、人材育成を通じて、個人と組織の成長をサポートする職業。オンライン教育の需要が高まっている。',
    sector: '教育・人材開発',
    requiredSkills: [
      '教育・指導スキル',
      'カリキュラム設計',
      'プレゼンテーション能力',
      '学習理論・教育心理学',
      'eラーニング・デジタル教材',
      'コミュニケーション能力',
      '専門知識・業界理解',
      'ファシリテーション'
    ],
    averageSalary: { min: 350, max: 700 },
    workStyle: {
      remote: true,
      teamwork: 4,
      independence: 4,
      creativity: 4,
      structure: 4
    },
    growthOutlook: 'good',
    educationRequirement: '大学卒業以上（教育学・心理学専攻優遇、教員免許歓迎）',
    careerPath: [
      '研修アシスタント（1-2年）',
      '研修講師・トレーナー（3-5年）',
      'シニアトレーナー（5-8年）',
      '研修企画マネージャー（8年以上）',
      '教育事業責任者・独立'
    ],
    dailyTasks: [
      '研修カリキュラム企画・設計',
      '教材・コンテンツ作成',
      '研修・セミナー実施',
      '受講者フォローアップ',
      'eラーニングシステム運用',
      '研修効果測定・改善'
    ],
    workEnvironment: [
      '人材開発・研修部門',
      '外部研修会社',
      'オンライン・オフライン併用',
      '様々な業界・企業との接点',
      '自己成長・学習機会'
    ],
    challenges: [
      '多様な学習者への個別対応',
      '研修効果の測定・証明',
      'オンライン教育への対応',
      '専門知識の継続的更新'
    ],
    rewards: [
      '人の成長・スキルアップ支援',
      '組織文化・業績向上への貢献',
      '教える喜び・やりがい',
      '自分自身の継続的学習'
    ]
  },

  {
    id: 11,
    name: '医療・ヘルスケア',
    description: '医師、看護師、医療技術者など、人の健康と生命を守る職業。高い専門性と責任感が求められる社会的使命の大きな分野。',
    sector: '医療・福祉',
    requiredSkills: [
      '医学・医療知識',
      '診断・治療技術',
      'コミュニケーション能力',
      '責任感・使命感',
      'チームワーク・連携',
      'ストレス耐性',
      '継続的学習・研鑽',
      '患者ケア・共感力'
    ],
    averageSalary: { min: 400, max: 1500 },
    workStyle: {
      remote: false,
      teamwork: 5,
      independence: 3,
      creativity: 3,
      structure: 5
    },
    growthOutlook: 'excellent',
    educationRequirement: '医学部・看護学部・医療系専門学校卒業、国家資格必須',
    careerPath: [
      '研修医・新人看護師（1-2年）',
      '一般医師・看護師（3-7年）',
      '専門医・主任看護師（7-12年）',
      '部長・師長（12年以上）',
      '院長・看護部長'
    ],
    dailyTasks: [
      '患者の診察・治療',
      '医療記録・カルテ作成',
      'チーム医療・連携',
      '患者・家族への説明',
      '医療安全・感染対策',
      '継続的な医学研修'
    ],
    workEnvironment: [
      '病院・クリニック',
      '24時間体制・シフト勤務',
      '医療チーム（多職種連携）',
      '最新医療機器・設備',
      '学会・研修参加'
    ],
    challenges: [
      '人の生命に関わる重い責任',
      '夜勤・不規則な勤務時間',
      '医療技術の急速な進歩への対応',
      '患者・家族との難しいコミュニケーション'
    ],
    rewards: [
      '人の命を救う・健康を守る',
      '患者・家族からの感謝',
      '高い社会的地位・信頼',
      '専門性による安定したキャリア'
    ]
  },

  {
    id: 12,
    name: '製造・生産管理',
    description: '製品の生産計画、品質管理、工程改善を担当する職業。効率的で高品質な製造を実現し、コスト削減と品質向上を両立させる。',
    sector: '製造・技術',
    requiredSkills: [
      '生産管理・工程管理',
      '品質管理・QC手法',
      'データ分析・統計',
      'リーンマニュファクチャリング',
      '安全管理・5S',
      'コスト管理・原価計算',
      'チームマネジメント',
      'システム・IT活用'
    ],
    averageSalary: { min: 350, max: 750 },
    workStyle: {
      remote: false,
      teamwork: 4,
      independence: 3,
      creativity: 3,
      structure: 5
    },
    growthOutlook: 'stable',
    educationRequirement: '大学卒業以上（理系・工学系優遇、品質管理検定歓迎）',
    careerPath: [
      '生産管理アシスタント（1-2年）',
      '生産管理担当（3-5年）',
      '生産管理主任（5-8年）',
      '生産管理課長（8年以上）',
      '工場長・製造責任者'
    ],
    dailyTasks: [
      '生産計画立案・調整',
      '工程進捗管理・監視',
      '品質検査・不良対応',
      '原材料・在庫管理',
      '作業標準書作成・改善',
      '安全パトロール・指導'
    ],
    workEnvironment: [
      '製造工場・生産現場',
      '現場作業者との連携',
      '生産管理システム活用',
      '定時・シフト勤務',
      '安全第一の環境'
    ],
    challenges: [
      '納期とコストと品質のバランス',
      '突発的なトラブル・設備故障',
      '多品種少量生産への対応',
      '人手不足・技能承継'
    ],
    rewards: [
      '製品が市場に出る達成感',
      '工程改善による効率化',
      '安定した雇用・キャリア',
      'ものづくりへの貢献'
    ]
  },

  {
    id: 13,
    name: '法務・知的財産',
    description: '企業法務、契約業務、知的財産管理、コンプライアンス対応を担当する職業。法的リスクから企業を守り、適正な事業運営をサポートする。',
    sector: '法務・専門職',
    requiredSkills: [
      '法律知識・法的思考',
      '契約書作成・レビュー',
      '知的財産（特許・商標）',
      'コンプライアンス',
      '交渉・調整能力',
      '文書作成・読解力',
      '論理的思考・分析力',
      '語学力（国際法務）'
    ],
    averageSalary: { min: 450, max: 1200 },
    workStyle: {
      remote: true,
      teamwork: 3,
      independence: 4,
      creativity: 2,
      structure: 5
    },
    growthOutlook: 'good',
    educationRequirement: '大学卒業以上（法学部優遇、司法試験・司法書士・弁理士資格歓迎）',
    careerPath: [
      '法務アシスタント（1-2年）',
      '法務担当（3-5年）',
      '法務主任・係長（5-8年）',
      '法務課長・マネージャー（8年以上）',
      'CLO・法務責任者'
    ],
    dailyTasks: [
      '契約書作成・チェック',
      '法的相談・アドバイス',
      '特許・商標出願管理',
      'コンプライアンス教育',
      '訴訟・紛争対応',
      '法改正情報収集・対応'
    ],
    workEnvironment: [
      '法務部・知財部',
      '弁護士・特許事務所との連携',
      '各部署からの相談対応',
      '専門書・法令データベース',
      '機密性の高い業務'
    ],
    challenges: [
      '法改正・規制変更への対応',
      '複雑な法的判断・リスク評価',
      '事業部門との利害調整',
      '国際法務・多法域対応'
    ],
    rewards: [
      '企業の法的リスク軽減',
      '高い専門性・市場価値',
      '論理的思考力の向上',
      '知的財産による事業貢献'
    ]
  },

  {
    id: 14,
    name: '経営・管理職',
    description: '事業部門の責任者、プロジェクトマネージャーとして、組織運営と目標達成をリードする職業。戦略立案から実行まで幅広い責任を持つ。',
    sector: '経営・管理',
    requiredSkills: [
      'リーダーシップ・統率力',
      '戦略立案・企画力',
      'チームマネジメント',
      '予算管理・数値管理',
      '意思決定・判断力',
      'コミュニケーション能力',
      '業界知識・事業理解',
      'ストレス耐性'
    ],
    averageSalary: { min: 600, max: 2000 },
    workStyle: {
      remote: true,
      teamwork: 5,
      independence: 4,
      creativity: 4,
      structure: 4
    },
    growthOutlook: 'good',
    educationRequirement: '大学卒業以上（MBA歓迎、豊富な実務経験重視）',
    careerPath: [
      'マネージャー候補（経験5年以上）',
      '課長・マネージャー（経験8年以上）',
      '部長・ディレクター（経験12年以上）',
      '事業部長・執行役員（経験15年以上）',
      '代表取締役・CEO'
    ],
    dailyTasks: [
      '事業戦略立案・実行',
      'チームマネジメント・人事評価',
      '予算策定・実績管理',
      '重要な意思決定',
      'ステークホルダーとの調整',
      '部下の育成・指導'
    ],
    workEnvironment: [
      '経営陣・役員レベル',
      '複数部署との連携',
      '会議・意思決定の場',
      '出張・外部との打ち合わせ',
      '高い権限と責任'
    ],
    challenges: [
      '組織全体の業績責任',
      '多様なステークホルダーとの調整',
      '変化する市場環境への対応',
      '部下のモチベーション管理'
    ],
    rewards: [
      '組織・事業の成長実現',
      '高い報酬・待遇',
      '経営判断への参画',
      '人材育成・組織開発'
    ]
  },

  {
    id: 15,
    name: 'カスタマーサポート・CS',
    description: '顧客からの問い合わせ対応、技術サポート、顧客満足度向上を担当する職業。企業の顔として顧客との関係構築を行う。',
    sector: 'カスタマーサービス',
    requiredSkills: [
      'コミュニケーション能力',
      '問題解決・提案力',
      '製品・サービス知識',
      'ホスピタリティ・サービス精神',
      'ストレス耐性・忍耐力',
      'CRMシステム・ITスキル',
      '多言語対応（グローバル企業）',
      'データ分析・改善提案'
    ],
    averageSalary: { min: 300, max: 600 },
    workStyle: {
      remote: true,
      teamwork: 4,
      independence: 3,
      creativity: 3,
      structure: 4
    },
    growthOutlook: 'stable',
    educationRequirement: '高校卒業以上（人物重視、業界経験・資格歓迎）',
    careerPath: [
      'カスタマーサポート（1-3年）',
      'シニアサポート・リーダー（3-6年）',
      'サポートマネージャー（6-10年）',
      'CS部長・責任者（10年以上）',
      'CX責任者・独立'
    ],
    dailyTasks: [
      '顧客からの問い合わせ対応',
      '技術的な問題解決サポート',
      'FAQ・ナレッジベース更新',
      '顧客満足度調査・分析',
      'エスカレーション対応',
      '製品改善提案・フィードバック'
    ],
    workEnvironment: [
      'コールセンター・サポート部門',
      'リモートワーク対応',
      'CRMシステム・チャットツール',
      'シフト勤務・交代制',
      'チーム体制・相互サポート'
    ],
    challenges: [
      '難しい顧客・クレーム対応',
      '製品知識の継続的更新',
      '感情労働によるストレス',
      '多様な問い合わせへの対応'
    ],
    rewards: [
      '顧客からの感謝・信頼',
      '問題解決による達成感',
      'コミュニケーション能力向上',
      '製品・業界知識の蓄積'
    ]
  },

  {
    id: 16,
    name: '専門職その他',
    description: '翻訳、ライター、専門技術者など、高度な専門スキルを活かして独立性高く働く職業。フリーランスや専門性を活かした働き方が可能。',
    sector: '専門・フリーランス',
    requiredSkills: [
      '高度な専門スキル・知識',
      '自己管理・セルフマネジメント',
      '継続的な学習・スキルアップ',
      'クライアント対応・営業',
      '品質管理・納期管理',
      'ネットワーキング・人脈',
      '語学力・文章力',
      '市場感度・トレンド理解'
    ],
    averageSalary: { min: 250, max: 1000 },
    workStyle: {
      remote: true,
      teamwork: 2,
      independence: 5,
      creativity: 4,
      structure: 2
    },
    growthOutlook: 'good',
    educationRequirement: '専門分野による（専門学校・大学卒業、資格・実績重視）',
    careerPath: [
      '専門職アシスタント（1-2年）',
      '専門職・フリーランス（3-7年）',
      'シニアスペシャリスト（7-12年）',
      'コンサルタント・独立（12年以上）',
      '専門分野のエキスパート・講師'
    ],
    dailyTasks: [
      '専門分野の業務実行',
      'クライアント・案件対応',
      '品質チェック・納品',
      '営業・案件獲得活動',
      'スキルアップ・研鑽',
      'ネットワーキング・情報収集'
    ],
    workEnvironment: [
      '在宅・コワーキングスペース',
      'フリーランス・個人事業主',
      '専門ツール・ソフトウェア',
      'クライアントとの直接やり取り',
      '自由度の高い働き方'
    ],
    challenges: [
      '収入の不安定性',
      '営業・案件獲得の必要性',
      '専門スキルの継続的向上',
      '孤独感・情報の孤立'
    ],
    rewards: [
      '高い専門性・独自価値',
      '自由な働き方・時間管理',
      '多様なプロジェクト・経験',
      '専門分野での社会貢献'
    ]
  }
];

// 職業カテゴリ取得のヘルパー関数
export function getCareerById(id: number): CareerCategory | undefined {
  return CAREER_CATEGORIES.find(career => career.id === id);
}

export function getCareersByIds(ids: number[]): CareerCategory[] {
  return CAREER_CATEGORIES.filter(career => ids.includes(career.id));
}

export function getAllCareers(): CareerCategory[] {
  return CAREER_CATEGORIES;
}

export function getCareersBySector(sector: string): CareerCategory[] {
  return CAREER_CATEGORIES.filter(career => career.sector === sector);
}

export function getCareersWithGrowthOutlook(outlook: string): CareerCategory[] {
  return CAREER_CATEGORIES.filter(career => career.growthOutlook === outlook);
}

// 職業検索機能
export function searchCareers(query: string): CareerCategory[] {
  const lowercaseQuery = query.toLowerCase();
  return CAREER_CATEGORIES.filter(career => 
    career.name.toLowerCase().includes(lowercaseQuery) ||
    career.description.toLowerCase().includes(lowercaseQuery) ||
    career.sector.toLowerCase().includes(lowercaseQuery) ||
    career.requiredSkills.some(skill => skill.toLowerCase().includes(lowercaseQuery))
  );
}
