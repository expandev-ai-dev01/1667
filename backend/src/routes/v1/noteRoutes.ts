import { Router } from 'express';
import * as noteController from '@/api/v1/internal/note/controller';
import { authMiddleware } from '@/middleware/authMiddleware';

const router = Router();

/**
 * @route   POST /api/v1/internal/note
 * @desc    Create a new note
 * @access  Private
 */
router.post('/', authMiddleware, noteController.postHandler);

export default router;
