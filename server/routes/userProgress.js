// User progress routes: track completed question IDs per authenticated user
import express from 'express';

import { protect } from '../middleswares/auth.js';
import { addToProgress, getProgress } from '../controllers/progressControllers.js';

const router = express.Router();





router.get('/',protect, getProgress);
router.post('/addToProgress',protect, addToProgress);

export default router;
