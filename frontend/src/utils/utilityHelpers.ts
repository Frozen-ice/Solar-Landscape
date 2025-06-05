export function normalizeUtility(util: string): string {
  const lowerUtil = util.toLowerCase();
  if (lowerUtil.includes('pse&g')) return 'PSEG';
  if (lowerUtil.includes('jersey central')) return 'JCPL';
  if (lowerUtil.includes('atlantic city')) return 'ACE';
  if (lowerUtil === 'jcpl') return 'JCPL';
  if (lowerUtil === 'ace') return 'ACE';
  return util;
} 