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
var match_svc_exports = {};
__export(match_svc_exports, {
  default: () => match_svc_default
});
module.exports = __toCommonJS(match_svc_exports);
var import_mysql = __toESM(require("../mysql"));
const MatchService = {
  async getAll() {
    const [rows] = await import_mysql.default.execute(`
            select m.id as id,
            t.id as tournament_id,
            t.league as tournament,
            t.split as split,
            m.date as date,
            t1.id as team_one_id,
            t1.name as team_one_name,
            t2.id as team_two_id,
            t2.name as team_two_name,
            m.playoffs as playoffs,
            m.patch as patch
            from matches as m
            left join tournaments as t
            on t.id = m.tournament_id 
            left join teams as t1
            on t1.id = m.team_one
            left join teams as t2
            on t2.id = m.team_two`);
    return rows;
  },
  async getByTournament(tournamentId) {
    const [rows] = await import_mysql.default.execute(`
            select m.id as id,
            t.id as tournament_id,
            t.league as tournament,
            t.split as split,
            m.date as date,
            t1.id as team_one_id,
            t1.name as team_one_name,
            t2.id as team_two_id,
            t2.name as team_two_name,
            m.playoffs as playoffs,
            m.patch as patch
            from matches as m
            left join tournaments as t
            on t.id = m.tournament_id 
            left join teams as t1
            on t1.id = m.team_one
            left join teams as t2
            on t2.id = m.team_two 
            where m.tournamentId = ?`, [tournamentId]);
    return rows;
  },
  async getOne(matchId) {
    const [rows] = await import_mysql.default.execute(`
            select m.id as id,
            t.id as tournament_id,
            t.league as tournament,
            t.split as split,
            m.date as date,
            t1.id as team_one_id,
            t1.name as team_one_name,
            t2.id as team_two_id,
            t2.name as team_two_name,
            m.playoffs as playoffs,
            m.patch as patch
            from matches as m
            left join tournaments as t
            on t.id = m.tournament_id 
            left join teams as t1
            on t1.id = m.team_one
            left join teams as t2
            on t2.id = m.team_two 
            where m.id = ?`, [matchId]);
    const matches = rows;
    return matches.length > 0 ? matches[0] : null;
  },
  async create(match) {
    const { tournament_id, date, team_one, team_two, playoffs, patch } = match;
    await import_mysql.default.execute("INSERT INTO matches (tournament_id, date, team_one, team_two, playoffs, patch) VALUES (?, ?, ?, ?, ?, ?)", [
      tournament_id,
      date,
      team_one,
      team_two,
      playoffs,
      patch
    ]);
    return match;
  },
  async update(matchId, match) {
    const { tournament_id, date, team_one, team_two, playoffs, patch } = match;
    const [result] = await import_mysql.default.execute("UPDATE matches SET tournament_id = ?, date = ?, team_one = ?, team_two = ?, playoffs = ?, patch = ? WHERE id = ?", [
      tournament_id,
      date,
      team_one,
      team_two,
      playoffs,
      patch,
      matchId
    ]);
    if (result.affectedRows > 0) return match;
    return null;
  },
  async remove(matchId) {
    const [result] = await import_mysql.default.execute("DELETE FROM matches WHERE id = ?", [matchId]);
    return result.affectedRows > 0;
  }
};
var match_svc_default = MatchService;
