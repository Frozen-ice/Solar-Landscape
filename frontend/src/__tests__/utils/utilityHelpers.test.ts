import { normalizeUtility } from '../../utils/utilityHelpers';

describe('normalizeUtility', () => {
  it('should normalize PSE&G variations', () => {
    expect(normalizeUtility('PSE&G')).toBe('PSEG');
    expect(normalizeUtility('pse&g')).toBe('PSEG');
  });

  it('should normalize JCPL variations', () => {
    expect(normalizeUtility('jersey central')).toBe('JCPL');
    expect(normalizeUtility('JCPL')).toBe('JCPL');
    expect(normalizeUtility('jcpl')).toBe('JCPL');
  });

  it('should normalize ACE variations', () => {
    expect(normalizeUtility('atlantic city')).toBe('ACE');
    expect(normalizeUtility('ACE')).toBe('ACE');
    expect(normalizeUtility('ace')).toBe('ACE');
  });

  it('should return original string for unknown utilities', () => {
    expect(normalizeUtility('unknown')).toBe('unknown');
    expect(normalizeUtility('other utility')).toBe('other utility');
  });
}); 