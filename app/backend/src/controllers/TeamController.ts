// import { Request, Response } from 'express';
// import TeamService from '../services/TeamService';

// export default class TeamController {
//   constructor(private teamService = new TeamService()) {}
//   public getAllTeams = async (req:Request, res: Response) => {
//     const allTeams = await this.teamService.getAllTeams();
//     res.status(200).json(allTeams);
//   };

//   public getTeamById = async (req:Request, res: Response) => {
//     const { id } = req.params;
//     const getTeam = await this.teamService.getTeamById(id);
//     res.status(200).json(getTeam);
//   };
// }
