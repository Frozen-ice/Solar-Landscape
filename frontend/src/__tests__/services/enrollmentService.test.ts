import axios from 'axios';
import { enrollmentService } from '../../services/enrollmentService';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('enrollmentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateAddress', () => {
    it('should validate address successfully', async () => {
      const mockResponse = {
        data: {
          valid: true,
          match: {
            addressComponents: {
              city: 'Test City',
              state: 'Test State',
              zip: '12345'
            }
          }
        }
      };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await enrollmentService.validateAddress({
        address: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zip: '12345'
      });

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:4000/api/validate-address',
        {
          address: '123 Test St',
          city: 'Test City',
          state: 'Test State',
          zip: '12345'
        }
      );
    });

    it('should handle validation failure', async () => {
      const mockResponse = {
        data: {
          valid: false,
          reason: 'Address not found'
        }
      };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await enrollmentService.validateAddress({
        address: 'Invalid Address',
        city: 'Test City',
        state: 'Test State',
        zip: '12345'
      });

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('submitEnrollment', () => {
    it('should submit enrollment successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          id: 1
        }
      };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const enrollmentData = {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zip: '12345',
        utility: 'PSE&G',
        uan: '1234567890',
        assistanceProgram: 'Medicare'
      };

      const result = await enrollmentService.submitEnrollment(enrollmentData);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:4000/api/enroll',
        enrollmentData
      );
    });
  });

  describe('getUtilityByZip', () => {
    it('should get utility by zip code', async () => {
      const mockResponse = {
        data: {
          utility: 'PSE&G',
          city: 'Test City'
        }
      };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await enrollmentService.getUtilityByZip('12345');

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:4000/api/utilities/12345'
      );
    });
  });
}); 