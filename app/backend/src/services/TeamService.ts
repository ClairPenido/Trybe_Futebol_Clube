import Team from '../database/models/TeamModel';
// import HttpException from '../utils/HttpException';

export default class TeamService {
  private model = Team;
  public async getAllTeams() {
    const getAllTeams = await this.model.findAll();
    return getAllTeams;
  }

  public async getTeamById(id:string) {
    const team = await this.model.findOne({ where: { id } });
    return team;
  }
}
