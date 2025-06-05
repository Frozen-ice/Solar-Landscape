import Joi from 'joi';
import { Enrollment } from '../types';
import { VALID_UTILITIES, ASSISTANCE_PROGRAMS, UtilityType } from '../constants';

const enrollmentSchema = Joi.object<Enrollment>({
  firstName: Joi.string().required().trim().min(2).max(50),
  lastName: Joi.string().required().trim().min(2).max(50),
  address: Joi.string().required().trim().min(5).max(100),
  city: Joi.string().required().trim().min(2).max(50),
  state: Joi.string().required().trim().length(2),
  zip: Joi.string().required().trim().pattern(/^\d{5}$/),
  utility: Joi.string().valid(...VALID_UTILITIES).required(),
  uan: Joi.string().allow('').trim(),
  assistanceProgram: Joi.string().valid(...ASSISTANCE_PROGRAMS).allow('')
});

const addressValidationSchema = Joi.object({
  address: Joi.string().required().trim().min(5).max(100),
  city: Joi.string().required().trim().min(2).max(50),
  state: Joi.string().required().trim().length(2),
  zip: Joi.string().required().trim().pattern(/^\d{5}$/)
});

const uanPatterns: Record<UtilityType, RegExp> = {
  PSEG: /^\d{10}$/,
  JCPL: /^\d{12}$/,
  ACE: /^.*$/ // ACE accepts any format
};

function validateUAN(utility: UtilityType, uan?: string): boolean {
  if (!uan) return true;
  return uanPatterns[utility]?.test(uan) || false;
}

export {
  enrollmentSchema,
  addressValidationSchema,
  validateUAN
}; 