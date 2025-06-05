import { UtilityType, AssistanceProgramType } from '../constants';

export interface Enrollment {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  utility: UtilityType;
  uan?: string;
  assistanceProgram?: AssistanceProgramType;
  createdAt?: Date;
}

export interface ZipCodeData {
  zip: string;
  city: string;
  electric_utility: UtilityType;
}

export interface AddressValidationRequest {
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface AddressValidationResponse {
  valid: boolean;
  reason?: string;
  match?: {
    addressComponents: {
      city: string;
      state: string;
      zip: string;
    };
  };
  details?: {
    cityMatch: boolean;
    stateMatch: boolean;
    zipMatch: boolean;
  };
}

export interface UtilityResponse {
  utility: UtilityType;
  city: string;
}

export interface ApiError {
  status: 'fail' | 'error';
  message: string;
  error?: any;
  stack?: string;
} 