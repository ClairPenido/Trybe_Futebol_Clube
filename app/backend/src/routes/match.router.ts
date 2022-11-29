import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchRouter = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRouter.post('/', matchController.addMatch);
matchRouter.patch('/:id/finish', matchController.updateMatch);
matchRouter.patch('/:id', matchController.updateTeam);
matchRouter.get('/', matchController.getFinishedMatches);
matchRouter.get('/', matchController.getAllMatches);

export default matchRouter;
