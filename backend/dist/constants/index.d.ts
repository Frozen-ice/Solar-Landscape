export declare const VALID_UTILITIES: readonly ["PSEG", "JCPL", "ACE"];
export declare const ASSISTANCE_PROGRAMS: readonly ["Medicare", "SNAP"];
export type UtilityType = typeof VALID_UTILITIES[number];
export type AssistanceProgramType = typeof ASSISTANCE_PROGRAMS[number];
