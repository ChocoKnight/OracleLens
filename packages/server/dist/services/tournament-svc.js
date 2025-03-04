"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var tournament_svc_exports = {};
__export(tournament_svc_exports, {
  default: () => tournament_svc_default
});
module.exports = __toCommonJS(tournament_svc_exports);
var import_mysql = __toESM(require("../mysql"));
const TournamentService = {
  async getAll() {
    await import_mysql.default.query(`CREATE VIEW tournamentMatchCounts AS 
            SELECT DISTINCT t.id, COUNT(*) AS count
            FROM tournaments AS t
            LEFT JOIN matches AS m ON t.id = m.tournament_id
            GROUP BY t.id, t.league, t.year, t.split;`);
    await import_mysql.default.query(`CREATE VIEW tournamentStart AS 
            SELECT DISTINCT t.id, MIN(m.date) AS startDate
            FROM tournaments AS t
            LEFT JOIN matches AS m ON t.id = m.tournament_id
            GROUP BY t.id;`);
    await import_mysql.default.query(`CREATE VIEW tournamentEnd AS 
            SELECT DISTINCT t.id, MAX(m.date) AS endDate
            FROM tournaments AS t
            LEFT JOIN matches AS m ON t.id = m.tournament_id
            GROUP BY t.id;`);
    const [rows] = await import_mysql.default.query(`SELECT t.*, tmc.count, ts.startDate, te.endDate
            FROM tournaments AS t
            LEFT JOIN tournamentMatchCounts AS tmc ON t.id = tmc.id
            LEFT JOIN tournamentStart AS ts ON t.id = ts.id
            LEFT JOIN tournamentEnd AS te ON t.id = te.id;`);
    await import_mysql.default.query(`DROP VIEW tournamentMatchCounts;`);
    await import_mysql.default.query(`DROP VIEW tournamentStart;`);
    await import_mysql.default.query(`DROP VIEW tournamentEnd;`);
    return rows;
  },
  async getAllForYear(year) {
    await import_mysql.default.query(`CREATE VIEW tournamentMatchCounts AS 
            SELECT DISTINCT t.id, COUNT(*) AS count
            FROM tournaments AS t
            LEFT JOIN matches AS m ON t.id = m.tournament_id
            GROUP BY t.id, t.league, t.year, t.split;`);
    await import_mysql.default.query(`CREATE VIEW tournamentStart AS 
            SELECT DISTINCT t.id, MIN(m.date) AS startDate
            FROM tournaments AS t
            LEFT JOIN matches AS m ON t.id = m.tournament_id
            GROUP BY t.id;`);
    await import_mysql.default.query(`CREATE VIEW tournamentEnd AS 
            SELECT DISTINCT t.id, MAX(m.date) AS endDate
            FROM tournaments AS t
            LEFT JOIN matches AS m ON t.id = m.tournament_id
            GROUP BY t.id;`);
    const [rows] = await import_mysql.default.query(`SELECT t.*, tmc.count, ts.startDate, te.endDate
            FROM tournaments AS t
            LEFT JOIN tournamentMatchCounts AS tmc ON t.id = tmc.id
            LEFT JOIN tournamentStart AS ts ON t.id = ts.id
            LEFT JOIN tournamentEnd AS te ON t.id = te.id
            WHERE t.year = ?;`, [year]);
    await import_mysql.default.query(`DROP VIEW tournamentMatchCounts;`);
    await import_mysql.default.query(`DROP VIEW tournamentStart;`);
    await import_mysql.default.query(`DROP VIEW tournamentEnd;`);
    return rows;
  },
  async getTournament(league) {
    const [rows] = await import_mysql.default.execute("SELECT * FROM tournaments where league = ?", [league]);
    return rows;
  },
  async getOne(id) {
    await import_mysql.default.query(`create view tournamentGameCounts as 
            select DISTINCT t.id, count(*) as count
            from tournaments as t
            left join matches as m
            on t.id = m.tournament_id 
            left join games as g
            on m.id = g.match_id 
            GROUP BY t.id, t.league, t.year, t.split;`);
    await import_mysql.default.query(`CREATE VIEW tournamentStart AS 
            SELECT DISTINCT t.id, MIN(m.date) AS startDate
            FROM tournaments AS t
            LEFT JOIN matches AS m ON t.id = m.tournament_id
            GROUP BY t.id;`);
    await import_mysql.default.query(`CREATE VIEW tournamentEnd AS 
            SELECT DISTINCT t.id, MAX(m.date) AS endDate
            FROM tournaments AS t
            LEFT JOIN matches AS m ON t.id = m.tournament_id
            GROUP BY t.id;`);
    const [rows] = await import_mysql.default.query(`SELECT t.*, tgc.count, ts.startDate, te.endDate
            FROM tournaments as t
            left join tournamentGameCounts as tgc
            on t.id = tgc.id
            left join tournamentStart as ts
            on t.id = ts.id
            left join tournamentEnd as te
            on t.id = te.id
            where t.id = ?;`, [id]);
    await import_mysql.default.query(`DROP VIEW tournamentGameCounts, tournamentStart, tournamentEnd;`);
    await import_mysql.default.query(`create view matchScores as
            SELECT match_id as matchId, team, SUM(wins) AS wins
            FROM (
                SELECT g.match_id, g.blue_team AS team, SUM(g.blue_win) AS wins
                FROM games AS g
                GROUP BY g.blue_team, g.match_id
                UNION ALL
                SELECT g.match_id, g.red_team AS team, SUM(CASE WHEN g.blue_win = 0 THEN 1 ELSE 0 END) AS wins
                FROM games AS g
                GROUP BY g.red_team, g.match_id
            ) AS combined
            GROUP BY team, match_id;`);
    const [matches] = await import_mysql.default.query(`SELECT 
                m.id AS matchId,
                t.id AS tournamentId,
                m.date AS date,
                t1.id AS teamOneId,
                t1.name AS teamOneName,
                ms1.wins AS teamOneWins,
                t2.id AS teamTwoId,
                t2.name AS teamTwoName,
                ms2.wins AS teamTwoWins,
                m.patch AS patch
            FROM matches AS m
            LEFT JOIN tournaments AS t 
                ON m.tournament_id = t.id 
            LEFT JOIN teams AS t1
                ON m.team_one = t1.id  
            LEFT JOIN teams AS t2
                ON m.team_two = t2.id
            LEFT JOIN matchScores as ms1
                ON t1.id = ms1.team 
            LEFT JOIN matchScores as ms2
                ON t2.id = ms2.team 
            WHERE t.id = ? and ms1.matchId = m.id and ms2.matchId = m.id;`, [id]);
    await import_mysql.default.query(`DROP VIEW matchScores;`);
    const [teams] = await import_mysql.default.query(`SELECT DISTINCT
                team.id AS teamId,
                team.name AS teamName,
                team.year AS year,
                SUM(CASE WHEN g.blue_team = team.id THEN g.blue_win ELSE 0 END) AS blueWins,
                SUM(CASE WHEN g.red_team = team.id AND g.blue_win = 0 THEN 1 ELSE 0 END) AS redWins,
                COUNT(CASE WHEN g.blue_team = team.id THEN 1 END) AS blueGames,
                COUNT(CASE WHEN g.red_team = team.id THEN 1 END) AS redGames
            FROM tournaments AS t
            LEFT JOIN matches AS m 
                ON m.tournament_id = t.id 
            LEFT JOIN games AS g
                ON g.match_id = m.id
            LEFT JOIN teams AS team
                ON team.id IN (m.team_one, m.team_two)
            WHERE t.id = ?
            GROUP BY team.id, team.name, team.year;`, [id]);
    const tournaments = rows;
    const tournament = tournaments.length > 0 ? tournaments[0] : null;
    if (!tournament) return null;
    const tournamentSummary = {
      tournament,
      matchList: matches,
      teams
    };
    return tournamentSummary;
  },
  async create(tournament) {
    const { league, year, split } = tournament;
    await import_mysql.default.execute("INSERT INTO tournaments (league, year, split) VALUES (?, ?, ?)", [league, year, split]);
    return tournament;
  },
  async update(tournamentId, tournament) {
    const { league, year, split } = tournament;
    const [result] = await import_mysql.default.execute("UPDATE tournaments SET league = ?, year = ?, split = ? WHERE id = ?", [league, year, split, tournamentId]);
    if (result.affectedRows > 0) return tournament;
    return null;
  },
  async remove(tournamentId) {
    const [result] = await import_mysql.default.execute("DELETE FROM tournaments WHERE id = ?", [tournamentId]);
    return result.affectedRows > 0;
  }
};
var tournament_svc_default = TournamentService;
