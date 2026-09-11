import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';
import { createResourceRouter } from './resource.js';

const router = Router();

router.use('/users', createResourceRouter(User));
router.use('/teams', createResourceRouter(Team));
router.use('/activities', createResourceRouter(Activity));
router.use('/leaderboard', createResourceRouter(LeaderboardEntry));
router.use('/workouts', createResourceRouter(Workout));

export default router;