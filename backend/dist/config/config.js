"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("../constants");
// Load environment variables
dotenv_1.default.config();
const config = {
    port: parseInt(process.env.PORT || '4000', 10),
    database: {
        path: path_1.default.join(__dirname, '../../db.sqlite')
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '*'
    },
    censusApi: {
        baseUrl: 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress',
        benchmark: 'Public_AR_Current'
    },
    utilities: {
        validUtilities: constants_1.VALID_UTILITIES,
        assistancePrograms: constants_1.ASSISTANCE_PROGRAMS
    }
};
exports.default = config;
//# sourceMappingURL=config.js.map