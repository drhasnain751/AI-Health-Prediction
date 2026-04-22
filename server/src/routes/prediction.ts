import { Router } from 'express';
import { predictDisease, getPredictionHistory } from '../controllers/prediction';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.post('/', authenticateJWT, predictDisease);
router.get('/history/:patientId', authenticateJWT, getPredictionHistory);

export default router;
