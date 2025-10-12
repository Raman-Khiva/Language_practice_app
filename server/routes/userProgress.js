// User progress routes: track completed question IDs per authenticated user
import express from 'express';

import { protect } from '../middleswares/auth.js';
import { getUserProgress, updateProgressStats } from '../controllers/progressControllers.js';

const router = express.Router();





router.get("/getUserProgress", protect, getUserProgress );
router.post('/addToProgress',protect, updateProgressStats);

export default router;
