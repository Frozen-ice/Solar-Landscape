import dotenv from 'dotenv';
import path from 'path';
import { VALID_UTILITIES, ASSISTANCE_PROGRAMS } from '../constants';

// Load environment variables
dotenv.config();

interface Config {
  port: number;
  database: {
    path: string;
  };
  cors: {
    origin: string;
  };
  censusApi: {
    baseUrl: string;
    benchmark: string;
  };
  utilities: {
    validUtilities: readonly string[];
    assistancePrograms: readonly string[];
  };
}

const config: Config = {
  port: parseInt(process.env.PORT || '4000', 10),
  database: {
    path: path.join(__dirname, '../../db.sqlite')
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },
  censusApi: {
    baseUrl: 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress',
    benchmark: 'Public_AR_Current'
  },
  utilities: {
    validUtilities: VALID_UTILITIES,
    assistancePrograms: ASSISTANCE_PROGRAMS
  }
};

export default config; 