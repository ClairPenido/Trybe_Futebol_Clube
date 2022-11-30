import IMatch from '../interfaces/IMatch';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import HttpException from '../utils/HttpException';

export default class MatchService {
  private model = Match;
  public async getAllMatches() {
    const getAllMatches = await this.model.findAll({
      include: [{ // https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
        model: Team,
        as: 'teamHome',
        attributes: {
          exclude: ['id'],
        },
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: {
          exclude: ['id'],
        },
      }],
    });
    return getAllMatches;
  }
  //! colocar um if para verificar se é true ou false

  public async getInProgressMatches(inprogss = {}) {
    const returnProgress = inprogss === 'true';
    const getInProgressMatches = await this.model.findAll({ where: { inProgress: returnProgress },
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: {
          exclude: ['id'],
        },
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: {
          exclude: ['id'],
        },
      }],
    });
    return getInProgressMatches;
  }

  public async getFinishedMatches(inprogss = {}) {
    const returnFinished = inprogss === 'true';
    const getFinishedMatches = await this.model.findAll({ where: { inProgress: returnFinished },
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: {
          exclude: ['id'],
        },
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: {
          exclude: ['id'],
        },
      }],
    });
    return getFinishedMatches;
  }

  public async addMatch(team:IMatch):Promise<Match> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = team;
    if (homeTeam === awayTeam) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }
    const verifyHomeTeam = await Team.findOne({ where: { id: homeTeam } });
    const verifyAwayTeam = await Team.findOne({ where: { id: awayTeam } });
    if (!verifyHomeTeam || !verifyAwayTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }
    const newMatch = await this.model.create({ homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true });
    if (!newMatch) throw new HttpException(401, 'Token must be a valid token');
    return newMatch;
  }

  public async updateMatch(id:string) {
    const matches = await this.model.update({ inProgress: false }, { where: { id } });
    if (!matches) throw new HttpException(401, 'Token must be a valid token');
    return matches;
  }

  public async updateTeam(id:string, corpo:any) {
    const { homeTeamGoals, awayTeamGoals } = corpo;
    console.log('o que ta vindo:', corpo);
    const matches = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    console.log(matches);
    return matches;
  }
}
