
export function getGrowthLabel(outlook: string): string {
  const labels: { [key: string]: string } = {
    'excellent': '非常に高い',
    'good': '高い',
    'stable': '安定',
    'declining': '低下傾向'
  };
  return labels[outlook] || '不明';
}
