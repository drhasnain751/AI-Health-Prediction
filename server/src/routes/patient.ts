import { Router } from 'express';
import { getPatientDashboard } from '../controllers/patient';
import { getMedications, getAppointments, getLabResults, createAppointment, addMedication, deleteMedication, cancelAppointment } from '../controllers/patientFeatures';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.get('/:profileId', authenticateJWT, getPatientDashboard);
router.get('/:profileId/medications', authenticateJWT, getMedications);
router.post('/medications', authenticateJWT, addMedication);
router.delete('/medications/:id', authenticateJWT, deleteMedication);
router.get('/:profileId/appointments', authenticateJWT, getAppointments);
router.post('/appointments', authenticateJWT, createAppointment);
router.patch('/appointments/:id/cancel', authenticateJWT, cancelAppointment);
router.get('/:profileId/results', authenticateJWT, getLabResults);

export default router;
