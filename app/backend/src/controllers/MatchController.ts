// import { NextFunction, Request, Response } from 'express';
// import MatchService from '../services/MatchService';

// export default class MatchController {
//   constructor(private matchService = new MatchService()) {}
//   public getAllMatches = async (req:Request, res: Response) => {
//     const allMatches = await this.matchService.getAllMatches();
//     res.status(200).json(allMatches);
//   };

//   public getFinishedMatches = async (req:Request, res: Response, next: NextFunction) => {
//     const { inProgress } = req.query;
//     if (!inProgress) return next();
//     const finishedMatches = await this.matchService.getFineshedMatches(inProgress);
//     res.status(200).json(finishedMatches);
//   };
// }
