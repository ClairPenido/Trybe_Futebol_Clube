import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
// import HttpException from '../utils/HttpException';

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
}
