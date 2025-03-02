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
var player_svc_exports = {};
__export(player_svc_exports, {
  default: () => player_svc_default
});
module.exports = __toCommonJS(player_svc_exports);
var import_mysql = __toESM(require("../mysql"));
const PlayerService = {
  async getAll() {
    await import_mysql.default.query(`CREATE VIEW gamesPlayed AS
            SELECT pp.player_id AS id, COUNT(*) AS count
            FROM player_performances AS pp
            GROUP BY pp.player_id;`);
    await import_mysql.default.query(`CREATE VIEW playerRoles AS
            SELECT pp.player_id AS id, pp.role, COUNT(*) AS count
            FROM player_performances AS pp
            GROUP BY pp.player_id, pp.role;`);
    await import_mysql.default.query(`CREATE VIEW mostPlayedChampion AS
            SELECT pp.player_id AS id, pp.champion, COUNT(*) AS count
            FROM player_performances AS pp
            GROUP BY pp.player_id, pp.champion;`);
    const [rows] = await import_mysql.default.query(`SELECT 
            p.id AS player_id, 
            p.name AS name, 
            t.id AS team_id, 
            t.name AS team, 
            t.year AS year,
            COALESCE(gp.count, 0) AS gamesPlayed,
            COALESCE(pr.role, 'Unknown') AS role,
            COALESCE(pc.champion, 'None') AS mostPlayedChampion
        FROM players AS p
        LEFT JOIN teams AS t 
            ON t.id = p.team
        LEFT JOIN gamesPlayed AS gp
            ON p.id = gp.id
        LEFT JOIN playerRoles AS pr
            ON p.id = pr.id
        LEFT JOIN (
            SELECT id, champion
            FROM mostPlayedChampion
            WHERE (id, count) IN (
                SELECT id, MAX(count)
                FROM mostPlayedChampion
                GROUP BY id
            )
        ) AS pc
            ON p.id = pc.id`);
    await import_mysql.default.query(`DROP VIEW gamesPlayed, playerRoles, mostPlayedChampion;`);
    return rows;
  },
  async getAllByYear(year) {
    await import_mysql.default.query(`CREATE VIEW gamesPlayed AS
            SELECT pp.player_id AS id, COUNT(*) AS count
            FROM player_performances AS pp
            GROUP BY pp.player_id;`);
    await import_mysql.default.query(`CREATE VIEW playerRoles AS
            SELECT pp.player_id AS id, pp.role, COUNT(*) AS count
            FROM player_performances AS pp
            GROUP BY pp.player_id, pp.role;`);
    await import_mysql.default.query(`CREATE VIEW mostPlayedChampion AS
            SELECT pp.player_id AS id, pp.champion, COUNT(*) AS count
            FROM player_performances AS pp
            GROUP BY pp.player_id, pp.champion;`);
    const [rows] = await import_mysql.default.query(`SELECT 
            p.id AS player_id, 
            p.name AS name, 
            t.id AS team_id, 
            t.name AS team, 
            t.year AS year,
            COALESCE(gp.count, 0) AS gamesPlayed,
            COALESCE(pr.role, 'Unknown') AS role,
            COALESCE(pc.champion, 'None') AS mostPlayedChampion
        FROM players AS p
        LEFT JOIN teams AS t 
            ON t.id = p.team
        LEFT JOIN gamesPlayed AS gp
            ON p.id = gp.id
        LEFT JOIN playerRoles AS pr
            ON p.id = pr.id
        LEFT JOIN (
            SELECT id, champion
            FROM mostPlayedChampion
            WHERE (id, count) IN (
                SELECT id, MAX(count)
                FROM mostPlayedChampion
                GROUP BY id
            )
        ) AS pc
            ON p.id = pc.id
            where t.year = ?`, [year]);
    await import_mysql.default.query(`DROP VIEW gamesPlayed, playerRoles, mostPlayedChampion;`);
    return rows;
  },
  async getPlayer(playerName) {
    const [rows] = await import_mysql.default.execute("select p.id as player_id, p.name as name, t.id as team_id, t.name as team_name, t.year as year from players as p left join teams as t on t.id = p.team where p.name = ?", [playerName]);
    return rows;
  },
  async getOne(playerId) {
    const [rows] = await import_mysql.default.execute("select p.id as player_id, p.name as name, t.id as team_id, t.name as team_name, t.year as year from players as p left join teams as t on t.id = p.team where p.id = ?", [playerId]);
    const players = rows;
    return players.length > 0 ? players[0] : null;
  },
  async create(player) {
    const { name, team } = player;
    await import_mysql.default.execute("INSERT INTO players (name, team) VALUES (?, ?)", [name, team]);
    return player;
  },
  async update(playerId, player) {
    const { name, team } = player;
    const [result] = await import_mysql.default.execute("UPDATE teams SET name = ?, year = ? WHERE id = ?", [name, team, playerId]);
    if (result.affectedRows > 0) return player;
    return null;
  },
  async remove(playerId) {
    const [result] = await import_mysql.default.execute("DELETE FROM players WHERE id = ?", [playerId]);
    return result.affectedRows > 0;
  }
};
var player_svc_default = PlayerService;
