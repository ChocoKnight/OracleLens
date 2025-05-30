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
var game_svc_exports = {};
__export(game_svc_exports, {
  default: () => game_svc_default
});
module.exports = __toCommonJS(game_svc_exports);
var import_mysql = __toESM(require("../mysql"));
const GameService = {
  async getAll() {
    const [rows] = await import_mysql.default.execute(`SELECT g.*,
                                            tb.name as blue_team_name,
                                            tr.name as red_team_name
                                            FROM games as g
                                            left join teams as tb
                                            on tb.id = g.blue_team
                                            left join teams as tr
                                            on tr.id = g.red_team;`);
    return rows;
  },
  async getByMatch(matchId) {
    const [rows] = await import_mysql.default.execute(`SELECT g.*,
                                            tb.name as blue_team_name,
                                            tr.name as red_team_name
                                            FROM games as g
                                            left join teams as tb
                                            on tb.id = g.blue_team
                                            left join teams as tr
                                            on tr.id = g.red_team
                                            where g.match_id = ?`, [matchId]);
    return rows;
  },
  async getByMatchGameNumber(matchId, gameNumber) {
    const [rows] = await import_mysql.default.execute(`SELECT g.*,
                                            tb.name as blue_team_name,
                                            tr.name as red_team_name
                                            FROM games as g
                                            left join teams as tb
                                            on tb.id = g.blue_team
                                            left join teams as tr
                                            on tr.id = g.red_team
                                            where g.match_id = ? and g.game_number = ?`, [matchId, gameNumber]);
    const games = rows;
    return games.length > 0 ? games[0] : null;
  },
  async getByGameIDSideObjectives(gameId, side) {
    const [rows] = await import_mysql.default.execute(`select
                                            g.*,
                                            o.*
                                            from games as g
                                            inner join objectives as o on o.game_id = g.id
                                            where g.id = ? and o.side = ?`, [gameId, side]);
    return rows;
  },
  async getOne(gameId) {
    const [rows] = await import_mysql.default.execute(`SELECT g.*,
                                            tb.name as blue_team_name,
                                            tr.name as red_team_name
                                            FROM games as g
                                            left join teams as tb
                                            on tb.id = g.blue_team
                                            left join teams as tr
                                            on tr.id = g.red_team
                                            where g.id = ?`, [gameId]);
    const games = rows;
    return games.length > 0 ? games[0] : null;
  },
  async create(game) {
    const { match_id, game_number, blue_team, red_team, blue_win, duration } = game;
    await import_mysql.default.execute("INSERT INTO games (match_id, game_number, blue_team, red_team, blue_win, duration) VALUES (?, ?, ?, ?, ?, ?)", [
      match_id,
      game_number,
      blue_team,
      red_team,
      blue_win,
      duration
    ]);
    return game;
  },
  async update(gameId, game) {
    const { match_id, game_number, blue_team, red_team, blue_win, duration } = game;
    const [result] = await import_mysql.default.execute("UPDATE games SET match_id = ?, game_number = ?, blue_team = ?, red_team = ?, blue_win = ?, duration = ? WHERE id = ?", [
      match_id,
      game_number,
      blue_team,
      red_team,
      blue_win,
      duration,
      gameId
    ]);
    if (result.affectedRows > 0) return game;
    return null;
  },
  async remove(gameId) {
    const [result] = await import_mysql.default.execute("DELETE FROM games WHERE id = ?", [gameId]);
    return result.affectedRows > 0;
  }
};
var game_svc_default = GameService;
