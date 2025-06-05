"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnrollment = exports.validateAddress = exports.getUtilityByZip = void 0;
const axios_1 = __importDefault(require("axios"));
const database_1 = __importDefault(require("../models/database"));
const errorHandler_1 = require("../middleware/errorHandler");
const validation_1 = require("../utils/validation");
const config_1 = __importDefault(require("../config/config"));
const zipCodeData = require('../../zip_code_and_utilities.json');
const getUtilityByZip = async (req, res, next) => {
    try {
        const { zip } = req.params;
        const entry = zipCodeData.find((item) => item.zip === zip);
        if (!entry) {
            throw new errorHandler_1.AppError('ZIP code not found', 404);
        }
        res.json({ utility: entry.electric_utility, city: entry.city });
    }
    catch (error) {
        next(error);
    }
};
exports.getUtilityByZip = getUtilityByZip;
const validateAddress = async (req, res, next) => {
    try {
        const { address, city, state, zip } = req.body;
        const response = await axios_1.default.get(config_1.default.censusApi.baseUrl, {
            params: {
                address: `${address}, ${city}, ${state}, ${zip}`,
                benchmark: config_1.default.censusApi.benchmark,
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
        }
        else {
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
    }
    catch (error) {
        next(error);
    }
};
exports.validateAddress = validateAddress;
const createEnrollment = async (req, res, next) => {
    try {
        const { error, value } = validation_1.enrollmentSchema.validate(req.body);
        if (error) {
            throw new errorHandler_1.AppError(error.details[0].message, 400);
        }
        if (!(0, validation_1.validateUAN)(value.utility, value.uan)) {
            throw new errorHandler_1.AppError('Invalid Utility Account Number (UAN) for selected utility', 400);
        }
        const id = await database_1.default.createEnrollment(value);
        res.status(201).json({
            success: true,
            id
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createEnrollment = createEnrollment;
//# sourceMappingURL=enrollmentController.js.map