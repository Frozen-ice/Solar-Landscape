export type SubmitResult =
  | { success: true; id: number }
  | { success: false; error: string }
  | null;

export interface EnrollmentFormData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  utility: string;
  uan?: string;
  assistanceProgram?: string;
} 