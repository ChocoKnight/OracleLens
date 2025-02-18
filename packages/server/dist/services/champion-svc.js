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
    const [rows] = await import_mysql.default.query("SELECT * FROM champion");
    return rows;
  },
  async getOne(champioName) {
    const [rows] = await import_mysql.default.query("SELECT * FROM champion WHERE champion_name = ?", [champioName]);
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
