import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchRouter = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRouter.get('/', matchController.getFinishedMatches);
matchRouter.get('/', matchController.getAllMatches);

export default matchRouter;
