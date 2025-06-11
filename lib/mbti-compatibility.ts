
import { MBTICompatibility } from '../types';

export const MBTI_COMPATIBILITY: MBTICompatibility[] = [
  {
    mbtiType: 'INTJ',
    careerScores: [
      { careerId: 8, score: 0.95, strengths: ['長期的戦略思考', 'システム的アプローチ', '独立して深く考える', '完璧主義的品質'], challenges: ['チームコミュニケーション', '短期成果への焦り'], reasoning: 'INTJの戦略的思考と完璧主義は、長期的な研究プロジェクトに最適です。複雑な問題を体系的に解決する能力が研究開発の現場で重宝されます。'},
      { careerId: 2, score: 0.90, strengths: ['パターン認識能力', '論理的分析', '技術への深い理解', '独立した作業'], challenges: ['ビジネス要件の理解', 'プレゼンテーション'], reasoning: 'データの背後にあるパターンを見抜く直感と、論理的な分析手法を組み合わせる能力が、データサイエンスの分野で高く評価されます。'},
      { careerId: 1, score: 0.85, strengths: ['アーキテクチャ設計', '技術的深掘り', '品質重視', '継続学習'], challenges: ['アジャイル開発のペース', 'ユーザー視点'], reasoning: 'システム全体を俯瞰して設計する能力と、技術的な完璧性を追求する姿勢が、高品質なソフトウェア開発に貢献します。'},
      { careerId: 5, score: 0.80, strengths: ['戦略立案', '問題の本質把握', '改善提案', '論理的説明'], challenges: ['クライアント関係構築', '感情的配慮'], reasoning: '複雑な経営課題を分析し、長期的な解決策を提案する能力は、戦略コンサルティングで非常に価値があります。'},
      { careerId: 13, score: 0.75, strengths: ['論理的思考', '詳細分析', '体系的整理', '専門性追求'], challenges: ['人間関係重視の交渉', '感情的配慮'], reasoning: '法的論理と知的財産の体系的理解により、企業の法的リスクを的確に評価・管理できます。'},
      { careerId: 14, score: 0.70, strengths: ['長期ビジョン', '戦略的判断', '効率化追求', '目標達成'], challenges: ['感情的配慮', 'チーム感情の理解'], reasoning: '長期的視点での事業戦略と効率的な組織運営により、持続的な成長を実現できます。'},
      { careerId: 6, score: 0.65, strengths: ['数値分析', 'システム化', '正確性', '長期計画'], challenges: ['ルーチン作業', '対人コミュニケーション'], reasoning: '財務データの分析と長期的な資金計画により、企業の財務基盤強化に貢献できます。'}
    ]
  },
  {
    mbtiType: 'INTP',
    careerScores: [
      { careerId: 8, score: 0.90, strengths: ['理論探求', '創造的問題解決', '論理的分析', '独立性'], challenges: ['実用化への関心', 'デッドライン管理'], reasoning: '純粋な知的好奇心と論理的思考により、革新的な研究成果を生み出す可能性が高いです。'},
      { careerId: 1, score: 0.88, strengths: ['技術的深掘り', '創造的解決策', '論理的設計', '学習意欲'], challenges: ['チームワーク', '実装への集中'], reasoning: '技術的な問題に対する独創的なアプローチと、新しい技術への探求心が開発現場で重宝されます。'},
      { careerId: 2, score: 0.85, strengths: ['理論的アプローチ', '実験的思考', '複雑な分析', '技術習得'], challenges: ['ビジネス応用', 'プレゼンテーション'], reasoning: '統計理論と実験的アプローチにより、データから新しい知見を発見する能力に長けています。'},
      { careerId: 13, score: 0.70, strengths: ['論理的分析', '詳細検討', '原理原則', '専門性'], challenges: ['人間関係', '実務的対応'], reasoning: '法的論理と知的財産の理論的側面を深く理解し、複雑な法的問題を解決できます。'},
      { careerId: 16, score: 0.65, strengths: ['専門性極め', '独立性', '創造性', '理論追求'], challenges: ['営業活動', 'クライアント対応'], reasoning: '特定分野の専門性を極めることで、独自の価値を提供できる専門職に適しています。'}
    ]
  },
  {
    mbtiType: 'ENTJ',
    careerScores: [
      { careerId: 14, score: 0.95, strengths: ['強力なリーダーシップ', '戦略的思考', '目標達成力', '組織構築'], challenges: ['部下の感情への配慮', '完璧主義的要求'], reasoning: '生まれながらのリーダーとして、組織を率いて大きな目標を達成する能力に優れています。'},
      { careerId: 5, score: 0.90, strengths: ['問題解決力', '戦略立案', 'クライアント牽引', '変革推進'], challenges: ['クライアントの感情配慮', '長期関係構築'], reasoning: '企業の課題を的確に把握し、強力なリーダーシップで変革を推進できます。'},
      { careerId: 3, score: 0.85, strengths: ['目標達成力', '説得力', 'チーム牽引', '戦略的営業'], challenges: ['顧客の感情理解', '長期関係重視'], reasoning: '強い目標志向と説得力により、困難な営業目標も達成できる営業リーダーになれます。'},
      { careerId: 4, score: 0.80, strengths: ['市場戦略', '企画推進力', 'データ活用', '革新性'], challenges: ['創造性重視', '細かいクリエイティブ'], reasoning: '市場を俯瞰した戦略立案と、強力な実行力でマーケティング目標を達成できます。'},
      { careerId: 6, score: 0.70, strengths: ['数値管理', '効率化', 'システム化', '目標管理'], challenges: ['詳細作業', 'ルーチンワーク'], reasoning: '財務戦略と効率的な管理により、企業の収益性向上に貢献できます。'}
    ]
  },
  {
    mbtiType: 'ENTP',
    careerScores: [
      { careerId: 4, score: 0.90, strengths: ['創造的発想', '市場感度', '革新的企画', '変化対応'], challenges: ['継続的実行', '詳細管理'], reasoning: '新しいアイデアと市場トレンドへの敏感さで、革新的なマーケティング戦略を生み出せます。'},
      { careerId: 5, score: 0.85, strengths: ['多角的視点', '変革提案', '適応力', 'クライアント関係'], challenges: ['詳細な実装', '継続的フォロー'], reasoning: '多様な視点から問題を捉え、創造的な解決策を提案できるコンサルタントになれます。'},
      { careerId: 3, score: 0.80, strengths: ['関係構築', '提案力', '適応性', 'エネルギー'], challenges: ['ルーチン業務', '細かい管理'], reasoning: '豊かな発想力と人との関係構築能力で、新しい営業手法を開拓できます。'},
      { careerId: 8, score: 0.75, strengths: ['革新的アイデア', '可能性探求', '理論構築', '実験精神'], challenges: ['継続的実行', '詳細検証'], reasoning: '既存の枠を超えた発想で、革新的な研究テーマを見つけ出すことができます。'},
      { careerId: 9, score: 0.70, strengths: ['創造性', '革新性', 'トレンド感度', '多様な表現'], challenges: ['継続的制作', '細部の完成度'], reasoning: '豊かな発想力と革新性で、新しいデザインコンセプトを生み出せます。'}
    ]
  },
  {
    mbtiType: 'INFJ',
    careerScores: [
      { careerId: 10, score: 0.90, strengths: ['人材育成', '深い理解', '長期的成長支援', '個別対応'], challenges: ['大人数での指導', '厳格な評価'], reasoning: '人の潜在能力を見抜き、一人ひとりの成長を深くサポートできる教育者になれます。'},
      { careerId: 7, score: 0.85, strengths: ['人材理解', '組織調和', '長期的人材育成', '価値観重視'], challenges: ['厳しい人事決定', '大規模組織管理'], reasoning: '従業員一人ひとりの特性を理解し、組織全体の調和と成長を実現できます。'},
      { careerId: 9, score: 0.80, strengths: ['深い美的感覚', 'ユーザー共感', '意味のあるデザイン', '完成度追求'], challenges: ['厳しいデッドライン', '商業的制約'], reasoning: 'ユーザーの深層ニーズを理解し、意味と美しさを兼ね備えたデザインを創造できます。'},
      { careerId: 11, score: 0.75, strengths: ['患者への深い共感', '全人的ケア', '長期的治療視点', '使命感'], challenges: ['感情的負担', '医療チームでの決断'], reasoning: '患者の心理的ニーズまで理解し、全人的な医療ケアを提供できます。'},
      { careerId: 16, score: 0.70, strengths: ['専門性極め', '独立性', '価値観重視', '深い理解'], challenges: ['営業・自己宣伝', 'ビジネス面'], reasoning: '深い洞察力と専門性で、意味のある価値を提供できる専門職に適しています。'}
    ]
  },
  {
    mbtiType: 'INFP',
    careerScores: [
      { careerId: 9, score: 0.90, strengths: ['創造性', '独自の美的感覚', '価値観表現', '細部へのこだわり'], challenges: ['厳しい批評', '商業的制約'], reasoning: '内なる価値観と豊かな創造性を、美しく意味のある作品として表現できます。'},
      { careerId: 10, score: 0.85, strengths: ['個別理解', '成長支援', '価値観の伝達', '創造的教育'], challenges: ['厳格な評価', '大人数指導'], reasoning: '学習者一人ひとりの個性を大切にし、創造的で温かい教育を提供できます。'},
      { careerId: 16, score: 0.80, strengths: ['専門性追求', '独立性', '価値観重視', '創造的表現'], challenges: ['営業活動', '競争環境'], reasoning: '自分の価値観に合った専門分野で、独自の価値を提供できる専門家になれます。'},
      { careerId: 7, score: 0.70, strengths: ['個人理解', '多様性尊重', '人材育成', '調和重視'], challenges: ['厳しい人事決定', '数値目標'], reasoning: '従業員の多様性を尊重し、一人ひとりが活躍できる職場環境を作れます。'},
      { careerId: 11, score: 0.65, strengths: ['患者への共感', '個別ケア', '価値観重視', '使命感'], challenges: ['厳しい決断', 'チーム医療'], reasoning: '患者の心に寄り添い、一人ひとりに合った丁寧な医療ケアを提供できます。'}
    ]
  },
  {
    mbtiType: 'ENFJ',
    careerScores: [
      { careerId: 7, score: 0.95, strengths: ['人材開発', '組織活性化', 'チーム構築', '成長支援'], challenges: ['厳しい人事決定', '数値重視の評価'], reasoning: '人の可能性を最大限に引き出し、活気ある組織文化を創造できるリーダーです。'},
      { careerId: 10, score: 0.90, strengths: ['インスピレーション', '集団指導', '成長促進', 'モチベーション向上'], challenges: ['個別の細かい対応', '厳格な評価'], reasoning: '学習者を鼓舞し、集団全体の成長とモチベーション向上を実現できます。'},
      { careerId: 3, score: 0.80, strengths: ['関係構築', '信頼獲得', 'チーム牽引', '顧客満足'], challenges: ['数値目標への執着', '競争的環境'], reasoning: '顧客との深い信頼関係を築き、長期的なパートナーシップを構築できます。'},
      { careerId: 15, score: 0.75, strengths: ['顧客理解', '問題解決支援', 'チーム協力', '満足度向上'], challenges: ['反復的業務', '厳しいクレーム'], reasoning: '顧客の気持ちに寄り添い、問題解決を通じて高い満足度を実現できます。'},
      { careerId: 14, score: 0.70, strengths: ['チーム統率', '組織文化創造', '人材育成', 'ビジョン共有'], challenges: ['厳しい経営判断', '数値重視の決定'], reasoning: '人を中心とした経営で、組織の一体感と持続的成長を実現できます。'}
    ]
  },
  {
    mbtiType: 'ENFP',
    careerScores: [
      { careerId: 4, score: 0.90, strengths: ['創造的企画', 'トレンド感度', '人との関係構築', 'エネルギー'], challenges: ['継続的実行', '詳細管理'], reasoning: '豊かな発想力と人との関係性で、革新的で人を動かすマーケティングを実現できます。'},
      { careerId: 7, score: 0.85, strengths: ['人とのつながり', '可能性発見', '組織活性化', 'ダイバーシティ'], challenges: ['厳格な制度運用', '詳細な事務処理'], reasoning: '人の多様な可能性を発見し、活気ある職場環境と文化を創造できます。'},
      { careerId: 9, score: 0.80, strengths: ['創造性', '表現力', 'ユーザー理解', '革新性'], challenges: ['継続的制作', '技術的制約'], reasoning: '豊かな表現力と人への理解で、人の心に響くクリエイティブを生み出せます。'},
      { careerId: 3, score: 0.75, strengths: ['熱意', 'コミュニケーション', '関係構築', '提案力'], challenges: ['継続的フォロー', '数値管理'], reasoning: '持前の熱意と人との関係構築能力で、顧客の心をつかむ営業ができます。'},
      { careerId: 10, score: 0.70, strengths: ['エネルギッシュな指導', '創造的教育', 'モチベーション向上', '参加型学習'], challenges: ['継続的準備', '詳細な評価'], reasoning: 'エネルギッシュで創造的な教育により、学習者の可能性を最大限に引き出せます。'}
    ]
  },
  {
    mbtiType: 'ISTJ',
    careerScores: [
      { careerId: 6, score: 0.95, strengths: ['正確性', 'システム管理', '責任感', '継続性'], challenges: ['創造性要求', '急な変更対応'], reasoning: '高い正確性と責任感で、企業の財務基盤を確実に管理・運営できます。'},
      { careerId: 13, score: 0.85, strengths: ['詳細分析', '規則遵守', 'リスク管理', '体系的整理'], challenges: ['創造的解釈', '感情的配慮'], reasoning: '法令遵守と詳細な分析により、企業の法的リスクを確実に管理できます。'},
      { careerId: 12, score: 0.80, strengths: ['プロセス管理', '品質保証', '効率性', '安全管理'], challenges: ['急激な変化', '創造的改善'], reasoning: '確立されたプロセスの確実な実行により、高品質で効率的な生産を実現できます。'},
      { careerId: 7, score: 0.75, strengths: ['制度設計', '公平性', 'コンプライアンス', '継続性'], challenges: ['個別配慮', '感情的対応'], reasoning: '公平で一貫した人事制度により、組織の秩序と従業員の安心を提供できます。'},
      { careerId: 1, score: 0.70, strengths: ['品質重視', 'ドキュメント整備', 'テスト徹底', '継続学習'], challenges: ['急速な技術変化', '創造的設計'], reasoning: '確実で品質の高いシステム開発により、信頼性の高いサービスを提供できます。'}
    ]
  },
  {
    mbtiType: 'ISFJ',
    careerScores: [
      { careerId: 7, score: 0.90, strengths: ['サポート精神', '調和重視', '個別配慮', '継続的支援'], challenges: ['厳しい決断', '大規模変革'], reasoning: '従業員一人ひとりを大切にし、温かく支援的な職場環境を創造できます。'},
      { careerId: 11, score: 0.85, strengths: ['患者ケア', 'チーム協力', '詳細な観察', '継続的支援'], challenges: ['厳しい決断', '感情的負担'], reasoning: '患者への細やかな配慮と継続的なケアにより、安心できる医療を提供できます。'},
      { careerId: 15, score: 0.80, strengths: ['顧客第一', '問題解決', '親身な対応', '継続的フォロー'], challenges: ['厳しいクレーム', '感情的負担'], reasoning: '顧客の立場に立った親身な対応により、高い顧客満足度を実現できます。'},
      { careerId: 10, score: 0.75, strengths: ['個別サポート', '成長支援', '温かい指導', '継続的関係'], challenges: ['厳格な評価', '大人数指導'], reasoning: '学習者一人ひとりに寄り添い、温かく継続的な成長支援を提供できます。'},
      { careerId: 6, score: 0.70, strengths: ['正確性', '責任感', '継続性', 'サポート業務'], challenges: ['厳しい判断', '数値重視'], reasoning: '正確で責任感のある業務処理により、組織の財務管理を確実にサポートできます。'}
    ]
  },
  {
    mbtiType: 'ESTJ',
    careerScores: [
      { careerId: 14, score: 0.90, strengths: ['組織運営', '目標達成', 'チーム牽引', '効率性追求'], challenges: ['個人の感情配慮', '創造性重視'], reasoning: '強力なリーダーシップと実行力で、組織を効率的に運営し目標達成を実現できます。'},
      { careerId: 3, score: 0.85, strengths: ['結果重視', 'チーム牽引', '目標管理', '顧客関係'], challenges: ['長期関係重視', '感情的配慮'], reasoning: '強い目標志向とチーム牽引力で、営業組織を成功に導くことができます。'},
      { careerId: 12, score: 0.80, strengths: ['効率化', '品質管理', 'チーム統率', 'プロセス改善'], challenges: ['創造的改善', '個別配慮'], reasoning: '効率的な生産プロセスとチーム統率により、高品質で低コストな製造を実現できます。'},
      { careerId: 6, score: 0.75, strengths: ['数値管理', 'コスト意識', '効率化', 'システム化'], challenges: ['詳細作業', '個別対応'], reasoning: '数値に基づいた効率的な財務管理により、企業の収益性向上に貢献できます。'},
      { careerId: 7, score: 0.70, strengths: ['組織効率化', '制度運用', '目標管理', 'チーム統率'], challenges: ['個別配慮', '感情的対応'], reasoning: '効率的な人事制度と組織運営により、生産性の高い職場環境を創造できます。'}
    ]
  },
  {
    mbtiType: 'ESFJ',
    careerScores: [
      { careerId: 7, score: 0.90, strengths: ['チームワーク', '人間関係', '調和重視', 'サポート精神'], challenges: ['厳しい決断', '数値重視'], reasoning: '人を大切にする姿勢とチームワークで、働きやすい職場環境を創造できます。'},
      { careerId: 15, score: 0.85, strengths: ['顧客満足', '親身な対応', 'チーム協力', '問題解決'], challenges: ['厳しいクレーム', '個人作業'], reasoning: '顧客との良好な関係構築により、高い顧客満足度と信頼を獲得できます。'},
      { careerId: 3, score: 0.80, strengths: ['関係構築', '信頼関係', 'チーム協力', '顧客理解'], challenges: ['厳しい競争', '数値プレッシャー'], reasoning: '顧客との温かい関係性を築き、長期的なパートナーシップを構築できます。'},
      { careerId: 11, score: 0.75, strengths: ['患者ケア', 'チーム医療', '協調性', 'サポート精神'], challenges: ['厳しい決断', '感情的負担'], reasoning: 'チーム医療の中で患者と医療スタッフの橋渡し役として活躍できます。'},
      { careerId: 10, score: 0.70, strengths: ['学習者支援', 'グループ指導', '協調性', '成長促進'], challenges: ['厳格な評価', '個別指導'], reasoning: '学習者同士の協調を促進し、温かい学習環境を創造できます。'}
    ]
  },
  {
    mbtiType: 'ISTP',
    careerScores: [
      { careerId: 1, score: 0.85, strengths: ['技術習得', '問題解決', '独立作業', '効率性追求'], challenges: ['チームコミュニケーション', '長期計画'], reasoning: '技術的な問題に対する実践的なアプローチで、効率的な解決策を見つけられます。'},
      { careerId: 12, score: 0.80, strengths: ['実践的スキル', '効率性', '問題解決', '独立性'], challenges: ['チーム管理', '長期計画'], reasoning: '実践的な技術スキルと効率性への関心で、生産現場の問題を解決できます。'},
      { careerId: 8, score: 0.70, strengths: ['実験的アプローチ', '技術革新', '独立性', '問題解決'], challenges: ['理論構築', 'チーム協働'], reasoning: '実践的な実験とテストにより、技術的な革新を生み出すことができます。'},
      { careerId: 2, score: 0.65, strengths: ['分析ツール', '実装力', '効率性', '技術習得'], challenges: ['理論的背景', 'プレゼンテーション'], reasoning: 'データ分析ツールの効率的な活用により、実用的な分析結果を提供できます。'},
      { careerId: 16, score: 0.60, strengths: ['専門技術', '独立性', '効率性', '実践性'], challenges: ['営業活動', '人間関係'], reasoning: '専門的な技術スキルを活かして、独立性の高い仕事で価値を提供できます。'}
    ]
  },
  {
    mbtiType: 'ISFP',
    careerScores: [
      { careerId: 9, score: 0.90, strengths: ['美的感覚', '個性表現', '細部へのこだわり', '価値観重視'], challenges: ['厳しいデッドライン', '商業的制約'], reasoning: '内なる美的感覚と個性を活かして、心に響く美しい作品を創造できます。'},
      { careerId: 11, score: 0.75, strengths: ['患者への配慮', '個別対応', '細やかなケア', '価値観重視'], challenges: ['チーム医療', '厳しい決断'], reasoning: '患者一人ひとりに寄り添い、心のこもった個別ケアを提供できます。'},
      { careerId: 10, score: 0.70, strengths: ['一対一指導', '実践的教育', '個別理解', '価値観伝達'], challenges: ['大人数指導', '厳格な評価'], reasoning: '学習者の個性を大切にし、実践的で心に届く教育を提供できます。'},
      { careerId: 16, score: 0.65, strengths: ['専門性', '独立性', '価値観重視', '個性発揮'], challenges: ['営業活動', '競争環境'], reasoning: '自分の価値観に合った専門分野で、個性を活かした独自の価値を提供できます。'},
      { careerId: 15, score: 0.60, strengths: ['個別対応', '共感力', '親身なサポート', '価値観重視'], challenges: ['大量処理', '厳しいクレーム'], reasoning: '顧客一人ひとりの気持ちに寄り添い、心のこもったサポートを提供できます。'}
    ]
  },
  {
    mbtiType: 'ESTP',
    careerScores: [
      { careerId: 3, score: 0.90, strengths: ['行動力', '瞬発力', '関係構築', '現場感覚'], challenges: ['長期計画', '詳細管理'], reasoning: '持前の行動力と人とのつながりで、積極的で成果の出る営業活動ができます。'},
      { careerId: 4, score: 0.80, strengths: ['市場感覚', '実行力', 'トレンド感度', '変化対応'], challenges: ['長期戦略', '詳細分析'], reasoning: '市場の動きを敏感に察知し、スピーディーなマーケティング施策を実行できます。'},
      { careerId: 15, score: 0.75, strengths: ['即座の対応', '実践的解決', '関係構築', 'エネルギー'], challenges: ['継続的フォロー', '詳細記録'], reasoning: '顧客の問題に対して即座に対応し、実践的な解決策を提供できます。'},
      { careerId: 14, score: 0.70, strengths: ['現場感覚', '迅速な判断', 'チーム牽引', '変化対応'], challenges: ['長期戦略', '詳細計画'], reasoning: '現場の状況を的確に把握し、迅速な判断でチームを成功に導けます。'},
      { careerId: 12, score: 0.65, strengths: ['現場対応', '迅速な判断', '実践的解決', 'チーム協力'], challenges: ['長期計画', '詳細管理'], reasoning: '生産現場での突発的な問題に迅速に対応し、実践的な解決策を見つけられます。'}
    ]
  },
  {
    mbtiType: 'ESFP',
    careerScores: [
      { careerId: 15, score: 0.90, strengths: ['人とのつながり', '明るさ', '親身な対応', 'エネルギー'], challenges: ['反復作業', '詳細記録'], reasoning: '明るく親しみやすい人柄で、顧客との良好な関係を築き、問題解決をサポートできます。'},
      { careerId: 3, score: 0.80, strengths: ['人間関係', 'エネルギー', '関係構築', '顧客理解'], challenges: ['数値管理', '長期計画'], reasoning: '人とのつながりを大切にし、顧客との信頼関係を築いて営業成果を上げられます。'},
      { careerId: 10, score: 0.75, strengths: ['楽しい学習', '参加型指導', 'モチベーション向上', 'エネルギー'], challenges: ['詳細準備', '厳格な評価'], reasoning: '楽しく参加型の教育により、学習者のモチベーションと学習効果を高められます。'},
      { careerId: 9, score: 0.70, strengths: ['表現力', '感性', '人への理解', 'トレンド感度'], challenges: ['継続的制作', '技術的制約'], reasoning: '豊かな表現力と人への理解で、人の心に響くクリエイティブを生み出せます。'},
      { careerId: 7, score: 0.65, strengths: ['人とのつながり', '明るい雰囲気', '関係構築', 'サポート精神'], challenges: ['厳格な制度運用', '数値管理'], reasoning: '明るく親しみやすい人柄で、職場の雰囲気を良くし、従業員をサポートできます。'}
    ]
  }
];

// MBTI適性データ取得のヘルパー関数
export function getMBTICompatibility(mbtiType: string): MBTICompatibility | undefined {
  return MBTI_COMPATIBILITY.find(compatibility => compatibility.mbtiType === mbtiType);
}

export function getCareerCompatibilityScore(mbtiType: string, careerId: number): number {
  const compatibility = getMBTICompatibility(mbtiType);
  if (!compatibility) return 0;
  
  const careerScore = compatibility.careerScores.find(score => score.careerId === careerId);
  return careerScore ? careerScore.score : 0;
}

export function getAllMBTITypes(): string[] {
  return MBTI_COMPATIBILITY.map(compatibility => compatibility.mbtiType);
}

export function getTopCareersForMBTI(mbtiType: string, limit: number = 5): any[] {
  const compatibility = getMBTICompatibility(mbtiType);
  if (!compatibility) return [];
  
  return compatibility.careerScores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
