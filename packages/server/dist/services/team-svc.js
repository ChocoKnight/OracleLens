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
var team_svc_exports = {};
__export(team_svc_exports, {
  default: () => team_svc_default
});
module.exports = __toCommonJS(team_svc_exports);
var import_mysql = __toESM(require("../mysql"));
const TeamService = {
  async getAll() {
    await import_mysql.default.query(`create view teamMatchCounts as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join matches as m1
            on t.id = m1.team_one 
            left join matches as m2
            on t.id = m2.team_two
            GROUP BY t.id;`);
    await import_mysql.default.query(`create view teamBlueGameCounts as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.blue_team 
            GROUP BY t.id;`);
    await import_mysql.default.query(`create view teamRedGameCounts as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.red_team 
            GROUP BY t.id;`);
    await import_mysql.default.query(`create view teamBlueGameWins as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.blue_team 
            where g1.blue_win = 1
            GROUP BY t.id;`);
    await import_mysql.default.query(`create view teamRedGameWins as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.blue_team 
            where g1.blue_win = 0
            GROUP BY t.id;`);
    const [rows] = await import_mysql.default.query(`SELECT t.*, 
            tmc.count as matches,
            COALESCE(tbgc.count, 0) AS blueGames,
            COALESCE(trgc.count, 0) AS redGames,
            COALESCE(tbgw.count, 0) AS blueWins,
            COALESCE(trgw.count, 0) AS redWins
            FROM teams as t
            left join teamMatchCounts as tmc
            on t.id = tmc.id
            left join teamBlueGameCounts as tbgc
            on t.id = tbgc.id
            left join teamRedGameCounts as trgc
            on t.id = trgc.id
            left join teamBlueGameWins as tbgw
            on t.id = tbgw.id
            left join teamRedGameWins as trgw
            on t.id = trgw.id;`);
    await import_mysql.default.query(`DROP VIEW teamMatchCounts;`);
    await import_mysql.default.query(`DROP VIEW teamBlueGameCounts;`);
    await import_mysql.default.query(`DROP VIEW teamRedGameCounts;`);
    await import_mysql.default.query(`DROP VIEW teamBlueGameWins;`);
    await import_mysql.default.query(`DROP VIEW teamRedGameWins;`);
    return rows;
  },
  async getAllByYear(year) {
    await import_mysql.default.query(`create view teamMatchCounts as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join matches as m1
            on t.id = m1.team_one 
            left join matches as m2
            on t.id = m2.team_two
            GROUP BY t.id;`);
    await import_mysql.default.query(`create view teamBlueGameCounts as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.blue_team 
            GROUP BY t.id;`);
    await import_mysql.default.query(`create view teamRedGameCounts as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.red_team 
            GROUP BY t.id;`);
    await import_mysql.default.query(`create view teamBlueGameWins as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.blue_team 
            where g1.blue_win = 1
            GROUP BY t.id;`);
    await import_mysql.default.query(`create view teamRedGameWins as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.blue_team 
            where g1.blue_win = 0
            GROUP BY t.id;`);
    const [rows] = await import_mysql.default.query(`SELECT t.*, 
            tmc.count as matches,
            COALESCE(tbgc.count, 0) AS blueGames,
            COALESCE(trgc.count, 0) AS redGames,
            COALESCE(tbgw.count, 0) AS blueWins,
            COALESCE(trgw.count, 0) AS redWins
            FROM teams as t
            left join teamMatchCounts as tmc
            on t.id = tmc.id
            left join teamBlueGameCounts as tbgc
            on t.id = tbgc.id
            left join teamRedGameCounts as trgc
            on t.id = trgc.id
            left join teamBlueGameWins as tbgw
            on t.id = tbgw.id
            left join teamRedGameWins as trgw
            on t.id = trgw.id
            where t.year = ?;`, [year]);
    await import_mysql.default.query(`DROP VIEW teamMatchCounts;`);
    await import_mysql.default.query(`DROP VIEW teamBlueGameCounts;`);
    await import_mysql.default.query(`DROP VIEW teamRedGameCounts;`);
    await import_mysql.default.query(`DROP VIEW teamBlueGameWins;`);
    await import_mysql.default.query(`DROP VIEW teamRedGameWins;`);
    return rows;
  },
  async getTeam(teamName) {
    const [rows] = await import_mysql.default.execute("SELECT * FROM teams WHERE name = ?", [teamName]);
    return rows;
  },
  async getOne(teamId) {
    const [rows] = await import_mysql.default.execute("SELECT * FROM teams WHERE id = ?", [teamId]);
    const teams = rows;
    return teams.length > 0 ? teams[0] : null;
  },
  async create(team) {
    const { name, year } = team;
    await import_mysql.default.execute("INSERT INTO teams (name, year) VALUES (?, ?)", [name, year]);
    return team;
  },
  async update(teamId, team) {
    const { name, year } = team;
    const [result] = await import_mysql.default.execute("UPDATE teams SET name = ?, year = ? WHERE id = ?", [name, year, teamId]);
    if (result.affectedRows > 0) return team;
    return null;
  },
  async remove(teamId) {
    const [result] = await import_mysql.default.execute("DELETE FROM teams WHERE id = ?", [teamId]);
    return result.affectedRows > 0;
  }
};
var team_svc_default = TeamService;
