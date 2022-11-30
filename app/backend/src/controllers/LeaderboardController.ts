import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderBoardController {
  constructor(private leaderboardService = new LeaderboardService()) {}
  public allLeaderBoardHome = async (req:Request, res: Response) => {
    const allLeaderBdHome = await this.leaderboardService.leaderBoardHome();
    res.status(200).json(allLeaderBdHome);
  };

  public allLeaderBoardAway = async (req:Request, res: Response) => {
    const allLeaderBdAway = await this.leaderboardService.leaderBoardAway();
    res.status(200).json(allLeaderBdAway);
  };
}
