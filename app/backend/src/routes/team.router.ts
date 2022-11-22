import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamRouter = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter.get('/:id', teamController.getTeamById);
teamRouter.get('/', teamController.getAllTeams);

export default teamRouter;
