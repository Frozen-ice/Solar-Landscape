import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import database from '../models/database';
import { AppError } from '../middleware/errorHandler';
import { enrollmentSchema, validateUAN } from '../utils/validation';
import { AddressValidationRequest, AddressValidationResponse, UtilityResponse } from '../types';
import config from '../config/config';

const zipCodeData = require('../../zip_code_and_utilities.json');

interface CensusApiResponse {
  result: {
    addressMatches: Array<{
      addressComponents: {
        city: string;
        state: string;
        zip: string;
      };
    }>;
  };
}

export const getUtilityByZip = async (
  req: Request<{ zip: string }>,
  res: Response<UtilityResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { zip } = req.params;
    const entry = zipCodeData.find((item: any) => item.zip === zip);
    
    if (!entry) {
      throw new AppError('ZIP code not found', 404);
    }
    
    res.json({ utility: entry.electric_utility, city: entry.city });
  } catch (error) {
    next(error);
  }
};

export const validateAddress = async (
  req: Request<{}, {}, AddressValidationRequest>,
  res: Response<AddressValidationResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { address, city, state, zip } = req.body;

    const response = await axios.get<CensusApiResponse>(config.censusApi.baseUrl, {
      params: {
        address: `${address}, ${city}, ${state}, ${zip}`,
        benchmark: config.censusApi.benchmark,
        format: 'json'
      }
    });

    const matches = response.data.result.addressMatches;
    
    if (!matches || matches.length === 0) {
      res.json({ valid: false, reason: 'No matching address found' });
      return;
    }

    const match = matches[0];
    const matchedAddress = match.addressComponents;
    
    const isCityMatch = matchedAddress.city.toLowerCase() === city.toLowerCase();
    const isStateMatch = matchedAddress.state.toLowerCase() === state.toLowerCase();
    const isZipMatch = matchedAddress.zip === zip;
    
    if (isCityMatch && isStateMatch && isZipMatch) {
      res.json({ 
        valid: true, 
        match: {
          ...match,
          addressComponents: matchedAddress
        }
      });
    } else {
      res.json({ 
        valid: false, 
        reason: 'Address components do not match',
        details: {
          cityMatch: isCityMatch,
          stateMatch: isStateMatch,
          zipMatch: isZipMatch
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value } = enrollmentSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    if (!validateUAN(value.utility, value.uan)) {
      throw new AppError('Invalid Utility Account Number (UAN) for selected utility', 400);
    }

    const id = await database.createEnrollment(value);

    res.status(201).json({ 
      success: true, 
      id 
    });
  } catch (error) {
    next(error);
  }
}; 