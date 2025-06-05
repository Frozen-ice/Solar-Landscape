import axios from 'axios';
import type { EnrollmentFormData } from '../types/enrollment';

interface AddressValidationData {
  address: string;
  city: string;
  state: string;
  zip: string;
}

export const enrollmentService = {
  async validateAddress(data: AddressValidationData) {
    const response = await axios.post('http://localhost:4000/api/validate-address', data);
    return response.data;
  },

  async submitEnrollment(data: EnrollmentFormData) {
    const response = await axios.post('http://localhost:4000/api/enroll', data);
    return response.data;
  },

  async getUtilityByZip(zip: string) {
    const response = await axios.get(`http://localhost:4000/api/utilities/${zip}`);
    return response.data;
  }
}; 