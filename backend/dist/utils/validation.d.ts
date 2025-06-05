import Joi from 'joi';
import { Enrollment } from '../types';
import { UtilityType } from '../constants';
declare const enrollmentSchema: Joi.ObjectSchema<Enrollment>;
declare const addressValidationSchema: Joi.ObjectSchema<any>;
declare function validateUAN(utility: UtilityType, uan?: string): boolean;
export { enrollmentSchema, addressValidationSchema, validateUAN };
