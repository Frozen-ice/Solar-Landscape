export const VALID_UTILITIES = ['PSEG', 'JCPL', 'ACE'] as const;
export const ASSISTANCE_PROGRAMS = ['Medicare', 'SNAP'] as const;

export type UtilityType = typeof VALID_UTILITIES[number];
export type AssistanceProgramType = typeof ASSISTANCE_PROGRAMS[number]; 