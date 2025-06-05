"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrollmentController_1 = require("../controllers/enrollmentController");
const router = (0, express_1.Router)();
// Get utility by ZIP code
router.get('/utilities/:zip', enrollmentController_1.getUtilityByZip);
// Validate address
router.post('/validate-address', enrollmentController_1.validateAddress);
// Create enrollment
router.post('/enroll', enrollmentController_1.createEnrollment);
exports.default = router;
//# sourceMappingURL=enrollmentRoutes.js.map