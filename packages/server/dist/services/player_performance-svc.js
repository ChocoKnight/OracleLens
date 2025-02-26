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
var player_performance_svc_exports = {};
__export(player_performance_svc_exports, {
  default: () => player_performance_svc_default
});
module.exports = __toCommonJS(player_performance_svc_exports);
var import_mysql = __toESM(require("../mysql"));
const PlayerPerformanceService = {
  async getAll() {
    const [rows] = await import_mysql.default.query(`SELECT 
                                        p.name as player_name,
                                        pp.*
                                        FROM player_performances as pp
                                        left join players as p
                                        on pp.player_id = p.id;`);
    return rows;
  },
  async getByGame(gameId) {
    const [rows] = await import_mysql.default.query(`SELECT 
                                        p.name as player_name,
                                        pp.*
                                        FROM player_performances as pp
                                        left join players as p
                                        on pp.player_id = p.id
                                        where pp.game_id = ?`, [gameId]);
    return rows;
  },
  async getByPlayer(playerId) {
    const [rows] = await import_mysql.default.query(`SELECT 
                                        p.name as player_name,
                                        pp.*
                                        FROM player_performances as pp
                                        left join players as p
                                        on pp.player_id = p.id
                                        where pp.player_id = ?`, [playerId]);
    return rows;
  },
  async getByGamePlayer(gameId, playerId) {
    const [rows] = await import_mysql.default.query(`SELECT 
                                        p.name as player_name,
                                        pp.*
                                        FROM player_performances as pp
                                        left join players as p
                                        on pp.player_id = p.id
                                        where pp.game_id = ?
                                        and pp.player_id = ?`, [gameId, playerId]);
    const playerPerformance = rows;
    return playerPerformance.length > 0 ? playerPerformance[0] : null;
  },
  async create(playerPerformance) {
    const {
      game_id,
      player_id,
      role,
      champion,
      kills,
      deaths,
      assists,
      damage_to_champions,
      wards_placed,
      wards_destroyed,
      control_wards_bought,
      vision_score,
      total_gold,
      gold_spent,
      creep_score,
      kills_at_15,
      deaths_at_15,
      assists_at_15,
      gold_at_15
    } = playerPerformance;
    await import_mysql.default.execute("INSERT INTO player_performances (game_id, player_id, role, champion, kills, deaths, assists, damage_to_champions, wards_placed, wards_destroyed, control_wards_bought, vision_score, total_gold, gold_spent, creep_score, kills_at_15, deaths_at_15, assists_at_15, gold_at_15) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      game_id,
      player_id,
      role,
      champion,
      kills,
      deaths,
      assists,
      damage_to_champions,
      wards_placed,
      wards_destroyed,
      control_wards_bought,
      vision_score,
      total_gold,
      gold_spent,
      creep_score,
      kills_at_15,
      deaths_at_15,
      assists_at_15,
      gold_at_15
    ]);
    return playerPerformance;
  },
  async update(gameId, playerId, playerPerformance) {
    const {
      role,
      champion,
      kills,
      deaths,
      assists,
      damage_to_champions,
      wards_placed,
      wards_destroyed,
      control_wards_bought,
      vision_score,
      total_gold,
      gold_spent,
      creep_score,
      kills_at_15,
      deaths_at_15,
      assists_at_15,
      gold_at_15
    } = playerPerformance;
    const [result] = await import_mysql.default.execute("UPDATE player_performances SET role = ?, champion = ?, kills = ?, deaths = ?, assists = ?, damage_to_champions = ?, wards_placed = ?, wards_destroyed = ?, control_wards_bought = ?, vision_score = ?, total_gold = ?, gold_spent = ?, creep_score = ?, kills_at_15 = ?, deaths_at_15 = ?, assists_at_15 = ?, gold_at_15 = ? WHERE game_id = ? and player_id = ?", [
      role,
      champion,
      kills,
      deaths,
      assists,
      damage_to_champions,
      wards_placed,
      wards_destroyed,
      control_wards_bought,
      vision_score,
      total_gold,
      gold_spent,
      creep_score,
      kills_at_15,
      deaths_at_15,
      assists_at_15,
      gold_at_15,
      gameId,
      playerId
    ]);
    if (result.affectedRows > 0) return playerPerformance;
    return null;
  },
  async remove(gameId, playerId) {
    const [result] = await import_mysql.default.execute("DELETE FROM player_performances WHERE game_id = ? and player_id = ?", [gameId, playerId]);
    return result.affectedRows > 0;
  }
};
var player_performance_svc_default = PlayerPerformanceService;
