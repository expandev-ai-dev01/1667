import { Router } from 'express';
import * as healthController from '@/api/v1/external/public/health/controller';

const router = Router();

// Health check route
router.get('/public/health', healthController.getHandler);

// Other public routes like login, register, etc., would go here

export default router;
