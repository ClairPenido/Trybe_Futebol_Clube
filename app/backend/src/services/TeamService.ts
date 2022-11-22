// import Match from '../database/models/MatchModel';
// import Team from '../database/models/TeamModel';
// // import HttpException from '../utils/HttpException';

// export default class MatchService {
//   private model = Match;
//   public async getAllMatches() {
//     const getAllMatches = await this.model.findAll({
//       include: [{ // https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
//         model: Team,
//         as: 'teamHome',
//         attributes: {
//           exclude: ['id'],
//         },
//       },
//       {
//         model: Team,
//         as: 'teamAway',
//         attributes: {
//           exclude: ['id'],
//         },
//       }],
//     });
//     return getAllMatches;
//   }

//   public async getFineshedMatches(inprogss = {}) {
//     const returnProgress = inprogss === 'true';
//     const getFineshedMatches = await this.model.findAll({ where: { inProgress: returnProgress },
//       include: [{
//         model: Team,
//         as: 'teamHome',
//         attributes: {
//           exclude: ['id'],
//         },
//       },
//       {
//         model: Team,
//         as: 'teamAway',
//         attributes: {
//           exclude: ['id'],
//         },
//       }],
//     });
//     return getFineshedMatches;
//   }
// }
