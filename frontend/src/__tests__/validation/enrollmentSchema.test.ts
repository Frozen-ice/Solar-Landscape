import { enrollmentSchema } from '../../validation/enrollmentSchema';

describe('enrollmentSchema', () => {
  const validEnrollment = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Test St',
    city: 'Test City',
    state: 'Test State',
    zip: '12345',
    utility: 'PSEG',
    uan: '1234567890',
    assistanceProgram: 'Medicare'
  };

  it('should validate a complete valid enrollment', async () => {
    const isValid = await enrollmentSchema.isValid(validEnrollment);
    expect(isValid).toBe(true);
  });

  it('should require all required fields', async () => {
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zip', 'utility'];
    
    for (const field of requiredFields) {
      const invalidEnrollment = { ...validEnrollment, [field]: '' };
      const isValid = await enrollmentSchema.isValid(invalidEnrollment);
      expect(isValid).toBe(false);
    }
  });

  describe('UAN validation', () => {
    it('should validate PSEG UAN format', async () => {
      const enrollment = {
        ...validEnrollment,
        utility: 'PSEG',
        uan: '1234567890' // 10 digits
      };
      const isValid = await enrollmentSchema.isValid(enrollment);
      expect(isValid).toBe(true);
    });

    it('should reject invalid PSEG UAN format', async () => {
      const enrollment = {
        ...validEnrollment,
        utility: 'PSEG',
        uan: '123456789' // 9 digits
      };
      const isValid = await enrollmentSchema.isValid(enrollment);
      expect(isValid).toBe(false);
    });

    it('should validate JCPL UAN format', async () => {
      const enrollment = {
        ...validEnrollment,
        utility: 'JCPL',
        uan: '123456789012' // 12 digits
      };
      const isValid = await enrollmentSchema.isValid(enrollment);
      expect(isValid).toBe(true);
    });

    it('should reject invalid JCPL UAN format', async () => {
      const enrollment = {
        ...validEnrollment,
        utility: 'JCPL',
        uan: '12345678901' // 11 digits
      };
      const isValid = await enrollmentSchema.isValid(enrollment);
      expect(isValid).toBe(false);
    });

    it('should accept any UAN format for ACE', async () => {
      const enrollment = {
        ...validEnrollment,
        utility: 'ACE',
        uan: 'any-format-123'
      };
      const isValid = await enrollmentSchema.isValid(enrollment);
      expect(isValid).toBe(true);
    });

    it('should reject non-numeric UAN for PSEG', async () => {
      const enrollment = {
        ...validEnrollment,
        utility: 'PSEG',
        uan: 'abc123def'
      };
      const isValid = await enrollmentSchema.isValid(enrollment);
      expect(isValid).toBe(false);
    });

    it('should reject non-numeric UAN for JCPL', async () => {
      const enrollment = {
        ...validEnrollment,
        utility: 'JCPL',
        uan: 'abc123def'
      };
      const isValid = await enrollmentSchema.isValid(enrollment);
      expect(isValid).toBe(false);
    });
  });

  describe('assistanceProgram validation', () => {
    it('should accept valid assistance programs', async () => {
      const validPrograms = ['Medicare', 'SNAP', ''];
      
      for (const program of validPrograms) {
        const enrollment = {
          ...validEnrollment,
          assistanceProgram: program
        };
        const isValid = await enrollmentSchema.isValid(enrollment);
        expect(isValid).toBe(true);
      }
    });

    it('should reject invalid assistance programs', async () => {
      const enrollment = {
        ...validEnrollment,
        assistanceProgram: 'InvalidProgram'
      };
      const isValid = await enrollmentSchema.isValid(enrollment);
      expect(isValid).toBe(false);
    });
  });

  describe('utility validation', () => {
    it('should accept valid utilities', async () => {
      const validUtilities = [
        { utility: 'PSEG', uan: '1234567890' },
        { utility: 'JCPL', uan: '123456789012' },
        { utility: 'ACE', uan: 'any-format' }
      ];
      
      for (const { utility, uan } of validUtilities) {
        const enrollment = {
          ...validEnrollment,
          utility,
          uan
        };
        const isValid = await enrollmentSchema.isValid(enrollment);
        expect(isValid).toBe(true);
      }
    });

    it('should reject invalid utilities', async () => {
      const enrollment = {
        ...validEnrollment,
        utility: 'InvalidUtility'
      };
      const isValid = await enrollmentSchema.isValid(enrollment);
      expect(isValid).toBe(false);
    });
  });

  describe('zip code validation', () => {
    it('should accept valid zip codes', async () => {
      const validZips = ['12345'];
      
      for (const zip of validZips) {
        const enrollment = {
          ...validEnrollment,
          zip
        };
        const isValid = await enrollmentSchema.isValid(enrollment);
        expect(isValid).toBe(true);
      }
    });

    it('should reject invalid zip codes', async () => {
      const invalidZips = ['1234', '123456', 'abcde', '12345-'];
      
      for (const zip of invalidZips) {
        const enrollment = {
          ...validEnrollment,
          zip
        };
        const isValid = await enrollmentSchema.isValid(enrollment);
        expect(isValid).toBe(false);
      }
    });
  });
}); 