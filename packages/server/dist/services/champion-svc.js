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
var champion_svc_exports = {};
__export(champion_svc_exports, {
  default: () => champion_svc_default
});
module.exports = __toCommonJS(champion_svc_exports);
var import_mysql = __toESM(require("../mysql"));
const ChampionService = {
  async getAll() {
    await import_mysql.default.query(`create view championBluePicked as
        SELECT champion, COUNT(*) AS count
        FROM (
            SELECT pick1 AS champion FROM pick_bans where side = 'Blue'
            UNION ALL
            SELECT pick2 FROM pick_bans where side = 'Blue'
            UNION ALL
            SELECT pick3 FROM pick_bans where side = 'Blue'
            UNION ALL
            SELECT pick4 FROM pick_bans where side = 'Blue'
            UNION ALL
            SELECT pick5 FROM pick_bans where side = 'Blue'
        ) AS all_picks
        GROUP BY champion;`);
    await import_mysql.default.query(`create view championBlueBanned as
            SELECT champion, COUNT(*) AS count
            FROM (
                SELECT ban1 AS champion FROM pick_bans where side = 'Blue'
                UNION ALL
                SELECT ban2 FROM pick_bans where side = 'Blue'
                UNION ALL
                SELECT ban3 FROM pick_bans where side = 'Blue'
                UNION ALL
                SELECT ban4 FROM pick_bans where side = 'Blue'
                UNION ALL
                SELECT ban5 FROM pick_bans where side = 'Blue'
            ) AS all_bans
            GROUP BY champion;`);
    await import_mysql.default.query(`create view championRedPicked as
            SELECT champion, COUNT(*) AS count
            FROM (
                SELECT pick1 AS champion FROM pick_bans where side = 'Red'
                UNION ALL
                SELECT pick2 FROM pick_bans where side = 'Red'
                UNION ALL
                SELECT pick3 FROM pick_bans where side = 'Red'
                UNION ALL
                SELECT pick4 FROM pick_bans where side = 'Red'
                UNION ALL
                SELECT pick5 FROM pick_bans where side = 'Red'
            ) AS all_picks
            GROUP BY champion;`);
    await import_mysql.default.query(`create view championRedBanned as
            SELECT champion, COUNT(*) AS count
            FROM (
                SELECT ban1 AS champion FROM pick_bans where side = 'Red'
                UNION ALL
                SELECT ban2 FROM pick_bans where side = 'Red'
                UNION ALL
                SELECT ban3 FROM pick_bans where side = 'Red'
                UNION ALL
                SELECT ban4 FROM pick_bans where side = 'Red'
                UNION ALL
                SELECT ban5 FROM pick_bans where side = 'Red'
            ) AS all_bans
            GROUP BY champion;`);
    await import_mysql.default.query(`create view championBlueWins as
            select pp.champion, count(*) as count
            from player_performances as pp
            left join games as g
            on pp.game_id  = g.id
            where g.blue_win = 1
            group by pp.champion;`);
    await import_mysql.default.query(`create view championRedWins as
            select pp.champion, count(*) as count
            from player_performances as pp
            left join games as g
            on pp.game_id  = g.id
            where g.blue_win = 0
            group by pp.champion;`);
    await import_mysql.default.query(`create view championKDA as 
            select pp.champion, avg(pp.kills) as averageKills, avg(pp.deaths) as averageDeaths, avg(pp.assists) as averageAssists, avg(pp.kills_at_15) as averagePre15Kills, avg(pp.deaths_at_15) as averagePre15Deaths, avg(pp.assists_at_15) as averagePre15Assists
            from player_performances as pp
            group by pp.champion;`);
    const [rows] = await import_mysql.default.query(`select 
            c.champion_name as name,
            c.champion_id as id,
            c.champion_title as title,
            COALESCE(cbp.count, 0) AS bluePicked,
            COALESCE(crp.count, 0) AS redPicked,
            COALESCE(cbb.count, 0) AS blueBanned,
            COALESCE(crb.count, 0) AS redBanned, 
            COALESCE(cbw.count, 0) AS blueWins,
            COALESCE(crw.count, 0) AS redWins, 
            COALESCE(ckda.averageKills, 0) AS averageKills,
            COALESCE(ckda.averageDeaths, 0) AS averageDeaths,
            COALESCE(ckda.averageAssists, 0) AS averageAssists,
            COALESCE(ckda.averagePre15Kills, 0) AS averagePre15Kills,
            COALESCE(ckda.averagePre15Deaths, 0) AS averagePre15Deaths,
            COALESCE(ckda.averagePre15Assists, 0) AS averagePre15Assists
            from champion as c
            left join championBluePicked as cbp
            on c.champion_name = cbp.champion
            left join championRedPicked as crp
            on c.champion_name = crp.champion
            left join championBlueBanned as cbb
            on c.champion_name = cbb.champion
            left join championRedBanned as crb
            on c.champion_name = crb.champion
            left join championBlueWins as cbw
            on c.champion_name = cbw.champion
            left join championRedWins as crw
            on c.champion_name = crw.champion
            left join championKDA as ckda
            on c.champion_name = ckda.champion;`);
    await import_mysql.default.query(`drop view championBluePicked, championRedPicked, championBlueBanned, championRedBanned, championBlueWins, championRedWins, championKDA;`);
    return rows;
  },
  async getOne(championName) {
    const [rows] = await import_mysql.default.query("SELECT * FROM champion WHERE champion_name = ?", [championName]);
    const champions = rows;
    return champions.length > 0 ? champions[0] : null;
  },
  async create(champion) {
    const { champion_name, champion_id, champion_title } = champion;
    await import_mysql.default.query(
      "INSERT INTO champion (champion_name, champion_id, champion_title) VALUES (?, ?, ?)",
      [champion_name, champion_id, champion_title]
    );
    return champion;
  },
  async update(championId, champion) {
    const { champion_name, champion_id, champion_title } = champion;
    const [result] = await import_mysql.default.query(
      "UPDATE champion SET champion_name = ?, champion_id = ?, champion_title = ? WHERE champion_id = ?",
      [champion_name, champion_id, champion_title, championId]
    );
    if (result.affectedRows > 0) return champion;
    return null;
  },
  async remove(championName) {
    const [result] = await import_mysql.default.query("DELETE FROM champion WHERE champion_name = ?", [
      championName
    ]);
    return result.affectedRows > 0;
  }
};
var champion_svc_default = ChampionService;
