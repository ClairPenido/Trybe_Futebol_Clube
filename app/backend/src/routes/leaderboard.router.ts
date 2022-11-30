import { Router } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderBoardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderBoardController(leaderboardService);

leaderboardRouter.get('/home', leaderboardController.allLeaderBoardHome);
leaderboardRouter.get('/away', leaderboardController.allLeaderBoardAway);

export default leaderboardRouter;
