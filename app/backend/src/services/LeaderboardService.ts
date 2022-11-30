import Sequelize from '../database/models/index';
import Board from '../interfaces/ILeaderBoard';

const leaderBoardHome = `SELECT team_name AS name, 

(SELECT SUM(
CASE WHEN(home_team_goals > away_team_goals) THEN 3
WHEN (home_team_goals < away_team_goals) THEN 0
ELSE 1
END )) AS totalPoints,

(SELECT COUNT(home_team))AS totalGames,

(SELECT SUM(
CASE WHEN(home_team_goals > away_team_goals) THEN 1
ELSE 0
END )) AS totalVictories,

(SELECT SUM(
CASE WHEN (home_team_goals = away_team_goals) THEN 1
ELSE 0
END )) AS totalDraws,

(SELECT SUM(
CASE WHEN (home_team_goals < away_team_goals) THEN 1
ELSE 0
END )) AS totalLosses,

SUM(home_team_goals) as goalsFavor,

SUM(away_team_goals) as goalsOwn,

(SELECT SUM(
SUM(home_team_goals) - SUM(away_team_goals))) AS goalsBalance,

((ROUND
(((
SELECT SUM(
CASE WHEN (home_team_goals < away_team_goals) THEN 0
WHEN (home_team_goals > away_team_goals) THEN 3
ELSE 1 
END )) / ((SELECT COUNT(home_team)*3)))*100,2))      
) AS efficiency

FROM TRYBE_FUTEBOL_CLUBE.matches AS m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t ON t.id = m.home_team
WHERE m.in_progress = 0
GROUP BY t.team_name
ORDER BY totalPoints DESC, goalsBalance DESC,
totalVictories DESC, goalsFavor DESC, goalsOwn DESC;`;

const leaderBoardAway = `SELECT team_name AS name, 

(SELECT SUM(
CASE WHEN(away_team_goals > home_team_goals) THEN 3
WHEN (away_team_goals < home_team_goals) THEN 0
ELSE 1
END )) AS totalPoints,

(SELECT COUNT(away_team))AS totalGames,

(SELECT SUM(
CASE WHEN(away_team_goals > home_team_goals) THEN 1
ELSE 0
END )) AS totalVictories,

(SELECT SUM(
CASE WHEN (away_team_goals = home_team_goals) THEN 1
ELSE 0
END )) AS totalDraws,

(SELECT SUM(
CASE WHEN (away_team_goals < home_team_goals) THEN 1
ELSE 0
END )) AS totalLosses,

SUM(away_team_goals) as goalsFavor,

SUM(home_team_goals) as goalsOwn,

(SELECT SUM(
SUM(away_team_goals) - SUM(home_team_goals))) AS goalsBalance,

((ROUND
(((
SELECT SUM(
CASE WHEN (away_team_goals < home_team_goals) THEN 0
WHEN (away_team_goals > home_team_goals) THEN 3
ELSE 1 
END )) / ((SELECT COUNT(away_team)*3)))*100,2))      
) AS efficiency

FROM TRYBE_FUTEBOL_CLUBE.matches AS m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t ON t.id = m.away_team
WHERE m.in_progress = 0
GROUP BY t.team_name
ORDER BY totalPoints DESC, goalsBalance DESC,
totalVictories DESC, goalsFavor DESC, goalsOwn DESC;`;

export default class LeaderboardService {
  private model = Sequelize;
  public async leaderBoardHome():Promise<Board | unknown> {
    const [leaderboard] = await this.model.query(leaderBoardHome);
    return leaderboard;
  }

  public async leaderBoardAway():Promise<Board | unknown> {
    const [leaderboard] = await this.model.query(leaderBoardAway);
    return leaderboard;
  }
}
