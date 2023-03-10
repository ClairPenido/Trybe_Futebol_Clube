import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/MatchService';
import LoginService from '../services/LoginService';
import HttpException from '../utils/HttpException';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
    private loginService = new LoginService(),
  ) {}

  public getAllMatches = async (req:Request, res: Response) => {
    const allMatches = await this.matchService.getAllMatches();
    res.status(200).json(allMatches);
  };

  public getInProgressMatches = async (req:Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    if (!inProgress) return next();
    const progressMatches = await this.matchService.getInProgressMatches(inProgress);
    res.status(200).json(progressMatches);
  };

  public getFinishedMatches = async (req:Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    if (!inProgress) return next();
    const finishedMatches = await this.matchService.getFinishedMatches(inProgress);
    res.status(200).json(finishedMatches);
  };

  public addMatch = async (req:Request, res: Response, _next: NextFunction) => {
    const { authorization } = req.headers;
    const validateLogin = this.loginService.validateLogin(authorization);
    if (!validateLogin) throw new HttpException(401, 'Token must be a valid token');
    const addMatch = await this.matchService.addMatch(req.body);
    res.status(201).json(addMatch);
  };

  public updateMatch = async (req:Request, res: Response, _next: NextFunction) => {
    await this.matchService.updateMatch(req.params.id);
    res.status(200).json({ message: 'Finished' });
  };

  public updateTeam = async (req:Request, res: Response, _next: NextFunction) => {
    const teste = await this.matchService.updateTeam(req.params.id, req.body);
    console.log('teste:', teste);
    res.status(200).json(teste);
  };
}
