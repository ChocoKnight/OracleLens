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
var pick_ban_svc_exports = {};
__export(pick_ban_svc_exports, {
  default: () => pick_ban_svc_default
});
module.exports = __toCommonJS(pick_ban_svc_exports);
var import_mysql = __toESM(require("../mysql"));
const PickBanService = {
  async getAll() {
    const [rows] = await import_mysql.default.query("SELECT * FROM pick_bans");
    return rows;
  },
  async getByGame(gameId) {
    const [rows] = await import_mysql.default.query("SELECT * FROM pick_bans where game_id = ?", [gameId]);
    return rows;
  },
  async getByGameSide(gameId, side) {
    const [rows] = await import_mysql.default.query("SELECT * FROM pick_ban where game_id = ? and side = ?", [gameId, side]);
    const pickBans = rows;
    return pickBans.length > 0 ? pickBans[0] : null;
  },
  async create(pickBan) {
    const { game_id, side, ban1, ban2, ban3, ban4, ban5, pick1, pick2, pick3, pick4, pick5 } = pickBan;
    await import_mysql.default.execute("INSERT INTO pick_ban (game_id, side, ban1, ban2, ban3, ban4, ban5, pick1, pick2, pick3, pick4, pick5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      game_id,
      side,
      ban1,
      ban2,
      ban3,
      ban4,
      ban5,
      pick1,
      pick2,
      pick3,
      pick4,
      pick5
    ]);
    return pickBan;
  },
  async update(gameId, side, pickBan) {
    const { ban1, ban2, ban3, ban4, ban5, pick1, pick2, pick3, pick4, pick5 } = pickBan;
    const [result] = await import_mysql.default.execute("UPDATE pick_ban SET ban1 = ?, ban2 = ?, ban3 = ?, ban4 = ?, ban5 = ?, pick1 = ?, pick2 = ?, pick3 = ?, pick4 = ?, pick5 = ? WHERE game_id = ? and side = ?", [
      ban1,
      ban2,
      ban3,
      ban4,
      ban5,
      pick1,
      pick2,
      pick3,
      pick4,
      pick5,
      gameId,
      side
    ]);
    if (result.affectedRows > 0) return pickBan;
    return null;
  },
  async remove(gameId, side) {
    const [result] = await import_mysql.default.execute("DELETE FROM pick_ban WHERE game_id = ? and side = ?", [gameId, side]);
    return result.affectedRows > 0;
  }
};
var pick_ban_svc_default = PickBanService;
