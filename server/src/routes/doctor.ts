// src/routes/doctor.ts
import { Router } from 'express';
import { getAllPatients, getPatientDetails } from '../controllers/doctor';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.get('/patients', authenticateJWT, getAllPatients);
router.get('/patient/:id', authenticateJWT, getPatientDetails);

export default router;
