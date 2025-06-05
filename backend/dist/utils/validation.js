"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressValidationSchema = exports.enrollmentSchema = void 0;
exports.validateUAN = validateUAN;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../constants");
const enrollmentSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().trim().min(2).max(50),
    lastName: joi_1.default.string().required().trim().min(2).max(50),
    address: joi_1.default.string().required().trim().min(5).max(100),
    city: joi_1.default.string().required().trim().min(2).max(50),
    state: joi_1.default.string().required().trim().length(2),
    zip: joi_1.default.string().required().trim().pattern(/^\d{5}$/),
    utility: joi_1.default.string().valid(...constants_1.VALID_UTILITIES).required(),
    uan: joi_1.default.string().allow('').trim(),
    assistanceProgram: joi_1.default.string().valid(...constants_1.ASSISTANCE_PROGRAMS).allow('')
});
exports.enrollmentSchema = enrollmentSchema;
const addressValidationSchema = joi_1.default.object({
    address: joi_1.default.string().required().trim().min(5).max(100),
    city: joi_1.default.string().required().trim().min(2).max(50),
    state: joi_1.default.string().required().trim().length(2),
    zip: joi_1.default.string().required().trim().pattern(/^\d{5}$/)
});
exports.addressValidationSchema = addressValidationSchema;
const uanPatterns = {
    PSEG: /^\d{10}$/,
    JCPL: /^\d{12}$/,
    ACE: /^.*$/ // ACE accepts any format
};
function validateUAN(utility, uan) {
    if (!uan)
        return true;
    return uanPatterns[utility]?.test(uan) || false;
}
//# sourceMappingURL=validation.js.map