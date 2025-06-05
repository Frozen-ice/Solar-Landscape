import { Router } from 'express';
import {
  getUtilityByZip,
  validateAddress,
  createEnrollment
} from '../controllers/enrollmentController';

const router = Router();

// Get utility by ZIP code
router.get('/utilities/:zip', getUtilityByZip);

// Validate address
router.post('/validate-address', validateAddress);

// Create enrollment
router.post('/enroll', createEnrollment);

export default router; 