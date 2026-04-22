import { Router } from 'express';
import { getSystemStats, getAllUsers, impersonateUser } from '../controllers/admin';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.get('/stats', authenticateJWT, getSystemStats);
router.get('/users', authenticateJWT, getAllUsers);
router.get('/impersonate/:userId', authenticateJWT, impersonateUser);

export default router;
