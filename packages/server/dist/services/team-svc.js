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
    const [rows] = await import_mysql.default.execute("SELECT * FROM teams");
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
