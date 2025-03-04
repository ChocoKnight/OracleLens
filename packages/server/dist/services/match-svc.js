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
  async getOne(id) {
    const [rows] = await import_mysql.default.query(`select 
            m.id as matchId,
            t.id as tournamentId,
            t.league as league,
            t.split as split,
            t.year as year,
            m.date as date,
            m.patch as patch
            from matches as m
            left join tournaments as t
                on t.id = m.tournament_id
            where m.id = ?;`, [id]);
    const [teamScores] = await import_mysql.default.query(`SELECT DISTINCT
                team.id AS teamId,
                team.name AS teamName,
                team.year AS year,
                SUM(CASE WHEN g.blue_team = team.id THEN g.blue_win ELSE 0 END) AS blueWins,
                SUM(CASE WHEN g.red_team = team.id AND g.blue_win = 0 THEN 1 ELSE 0 END) AS redWins
            from matches AS m 
            LEFT JOIN games AS g
                ON g.match_id = m.id
            LEFT JOIN teams AS team
                ON team.id IN (m.team_one, m.team_two)
            WHERE m.id = ?
            GROUP BY team.id, team.name, team.year;`, [id]);
    const [objectives] = await import_mysql.default.query(`select 
            g.id as gameId,
            g.match_id as matchId,
            g.game_number as gameNumber,
            tb.name as blueTeamName,
            tr.name as redTeamName, 
            o.side as side,
            o.first_blood as firstBlood,
            o.first_tower as firstTower,
            o.towers as towers,
            o.tower_plates as towerPlates,
            o.void_grubs as voidGrubs,
            o.rift_heralds as riftHeralds,
            o.baron_nashors as baronNashors,
            o.infernals,
            o.mountains,
            o.clouds, 
            o.oceans, 
            o.hextechs,
            o.chemtechs,
            o.elders,
            o.feats_of_strength as featsOfStrength,
            o.ruinous_atakhan as ruinousAtakhan,
            o.voracious_atakhan as voraciousAtakhan
            from games as g
            left join objectives as o
                on o.game_id = g.id
            left join teams as tb
                on tb.id = g.blue_team
            left join teams as tr
                on tr.id = g.red_team
            where g.match_id = ?;`, [id]);
    const [pickBans] = await import_mysql.default.query(`select
            g.id as gameId,
            g.match_id as matchId,
            g.game_number as gameNumber,
            tb.name as blueTeamName,
            tr.name as redTeamName, 
            pb.side,
            pb.ban1,
            pb.ban2,
            pb.ban3,
            pb.ban4,
            pb.ban5,
            pb.pick1,
            pb.pick2,
            pb.pick3,
            pb.pick4,
            pb.pick5
            from games as g
            left join pick_bans as pb
            on pb.game_id = g.id
            left join teams as tb
            on tb.id = g.blue_team
            left join teams as tr
            on tr.id = g.red_team
            where g.match_id = ?;`, [id]);
    const [playerPerformances] = await import_mysql.default.query(`select
            g.id as gameId,
            g.match_id as matchId,
            g.game_number as gameNumber,
            tb.id as blueTeamId,
            tb.name as blueTeamName,
            tr.id as redTeamId,
            tr.name as redTeamName,
            p.id as playerId,
            p.name as playerName,
            p.team as playerTeam,
            pp.role,
            pp.champion,
            pp.kills,
            pp.deaths,
            pp.assists,
            pp.damage_to_champions as damageToChampions,
            pp.wards_placed as wardsPlaced,
            pp.wards_destroyed as wardsDestroyed,
            pp.control_wards_bought as controlWardsBought,
            pp.vision_score as visionScore,
            pp.total_gold as totalGold,
            pp.gold_spent as goldSpent,
            pp.creep_score as creepScore,
            pp.kills_at_15 as killsAt15,
            pp.deaths_at_15 as deathsAt15,
            pp.assists_at_15 as assistsAt15,
            pp.gold_at_15 as goldAt15
            from games as g
            left join player_performances as pp
            on pp.game_id = g.id
            left join teams as tb
            on tb.id = g.blue_team
            left join teams as tr
            on tr.id = g.red_team
            left join players as p
            on p.id = pp.player_id
            where g.match_id = ?;`, [id]);
    const [gameScores] = await import_mysql.default.query(`select
            g.id as gameId,
            g.match_id as matchId,
            g.game_number as gameNumber,
            tb.id as blueTeamId,
            tb.name as blueTeamName,
            tr.id as redTeamId,
            tr.name as redTeamName,
            g.blue_win as blueWin
            from games as g
            left join teams as tb
            on tb.id = g.blue_team
            left join teams as tr
            on tr.id = g.red_team
            where g.match_id = ?;`, [id]);
    const MatchSummaries = rows;
    const match = MatchSummaries.length > 0 ? MatchSummaries[0] : null;
    const game = {
      gameScores,
      pickBans,
      objectives,
      playerPerformances
    };
    if (!match) return null;
    const matchSummary = {
      matchInfo: match,
      teamScores,
      games: game
    };
    return matchSummary;
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
