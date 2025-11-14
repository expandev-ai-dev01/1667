import { Router } from 'express';
import noteRoutes from './noteRoutes';

const router = Router();

// --- INTEGRATION POINT FOR NEW FEATURES ---
router.use('/note', noteRoutes);

export default router;
