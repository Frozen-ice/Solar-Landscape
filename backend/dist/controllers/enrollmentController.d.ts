import { Request, Response, NextFunction } from 'express';
import { AddressValidationRequest, AddressValidationResponse, UtilityResponse } from '../types';
export declare const getUtilityByZip: (req: Request<{
    zip: string;
}>, res: Response<UtilityResponse>, next: NextFunction) => Promise<void>;
export declare const validateAddress: (req: Request<{}, {}, AddressValidationRequest>, res: Response<AddressValidationResponse>, next: NextFunction) => Promise<void>;
export declare const createEnrollment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
