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
var objective_svc_exports = {};
__export(objective_svc_exports, {
  default: () => objective_svc_default
});
module.exports = __toCommonJS(objective_svc_exports);
var import_mysql = __toESM(require("../mysql"));
const ObjectiveService = {
  async getAll() {
    const [rows] = await import_mysql.default.query("SELECT * FROM objectives");
    return rows;
  },
  async getByGame(gameId) {
    const [rows] = await import_mysql.default.query("SELECT * FROM objectives where game_id = ?", [gameId]);
    return rows;
  },
  async getByGameSide(gameId, side) {
    const [rows] = await import_mysql.default.query("SELECT * FROM objectives where game_id = ? and side = ?", [gameId, side]);
    const objectives = rows;
    return objectives.length > 0 ? objectives[0] : null;
  },
  async create(objective) {
    const {
      game_id,
      side,
      first_blood,
      first_tower,
      towers,
      tower_plates,
      void_grubs,
      rift_heralds,
      baron_nashors,
      infernals,
      mountains,
      clouds,
      oceans,
      hextechs,
      chemtechs,
      elders,
      feats_of_strength,
      ruinous_atakhan,
      voracious_atakhan
    } = objective;
    await import_mysql.default.execute("INSERT INTO objectives (game_id, side, first_blood, first_tower, towers, tower_plates, void_grubs, rift_heralds, baron_nashors, infernals, mountains, clouds, oceans, hextechs, chemtechs, elders, feats_of_strength, ruinous_atakhan, voracious_atakhan) VALUES (?, ?, ? , ?, ?, ?, ? , ?, ?, ?, ? , ?, ?, ?, ? , ?, ?, ?, ?)", [
      game_id,
      side,
      first_blood,
      first_tower,
      towers,
      tower_plates,
      void_grubs,
      rift_heralds,
      baron_nashors,
      infernals,
      mountains,
      clouds,
      oceans,
      hextechs,
      chemtechs,
      elders,
      feats_of_strength,
      ruinous_atakhan,
      voracious_atakhan
    ]);
    return objective;
  },
  async update(gameId, side, objective) {
    const {
      first_blood,
      first_tower,
      towers,
      tower_plates,
      void_grubs,
      rift_heralds,
      baron_nashors,
      infernals,
      mountains,
      clouds,
      oceans,
      hextechs,
      chemtechs,
      elders,
      feats_of_strength,
      ruinous_atakhan,
      voracious_atakhan
    } = objective;
    const [result] = await import_mysql.default.execute("UPDATE objectives SET first_blood = ?, first_tower = ?, towers = ?, tower_plates = ?, void_grubs = ?, rift_heralds = ?, baron_nashors = ?, infernals = ?, mountains = ?, clouds = ?, oceans = ?, hextechs = ?, chemtechs = ?, elders = ?, feats_of_strength = ?, ruinous_atakhan = ?, voracious_atakhan = ? WHERE game_id = ? and side = ?", [
      first_blood,
      first_tower,
      towers,
      tower_plates,
      void_grubs,
      rift_heralds,
      baron_nashors,
      infernals,
      mountains,
      clouds,
      oceans,
      hextechs,
      chemtechs,
      elders,
      feats_of_strength,
      ruinous_atakhan,
      voracious_atakhan,
      gameId,
      side
    ]);
    if (result.affectedRows > 0) return objective;
    return null;
  },
  async remove(gameId, side) {
    const [result] = await import_mysql.default.execute("DELETE FROM objectives WHERE game_id = ? and side = ?", [gameId, side]);
    return result.affectedRows > 0;
  }
};
var objective_svc_default = ObjectiveService;
