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
  async getOne(tournamentId) {
    const [rows] = await import_mysql.default.execute("SELECT * FROM tournaments WHERE id = ?", [tournamentId]);
    const tournaments = rows;
    return tournaments.length > 0 ? tournaments[0] : null;
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
