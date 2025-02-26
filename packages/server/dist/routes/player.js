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
var player_exports = {};
__export(player_exports, {
  default: () => player_default
});
module.exports = __toCommonJS(player_exports);
var import_express = __toESM(require("express"));
var import_player_svc = __toESM(require("../services/player-svc"));
const router = import_express.default.Router();
router.get("/", async (req, res) => {
  try {
    const { playerName, playerId } = req.query;
    if (playerName) {
      const players = await import_player_svc.default.getPlayer(String(playerName));
      res.json(players);
    } else if (playerId) {
      const pickbanes = await import_player_svc.default.getOne(Number(playerId));
      res.json(pickbanes);
    } else {
      const players = await import_player_svc.default.getAll();
      res.json(players);
    }
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).send(error);
  }
});
router.get("/:playerName", async (req, res) => {
  const playerId = parseInt(req.params.playerName);
  if (isNaN(playerId)) {
    try {
      const champion = await import_player_svc.default.getPlayer(req.params.playerName);
      if (!champion) {
        res.status(404).send("Player not found");
        return;
      }
      res.json(champion);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    try {
      const champion = await import_player_svc.default.getOne(playerId);
      if (!champion) {
        res.status(404).send("Player not found");
        return;
      }
      res.json(champion);
    } catch (error) {
      res.status(500).send(error);
    }
  }
});
router.post("/", async (req, res) => {
  try {
    const player = req.body;
    const newPlayer = await import_player_svc.default.create(player);
    res.json(newPlayer);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put("/:playerId", async (req, res) => {
  try {
    const player = req.body;
    const updatedPlayer = await import_player_svc.default.update(parseInt(req.params.playerId), player);
    if (!updatedPlayer) {
      res.status(404).send("Player not found");
      return;
    }
    res.json(updatedPlayer);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.delete("/:playerId", async (req, res) => {
  try {
    const removed = await import_player_svc.default.remove(parseInt(req.params.playerId));
    if (!removed) {
      res.status(404).send("Player not found");
      return;
    }
    res.send("Player removed");
  } catch (error) {
    res.status(500).send(error);
  }
});
var player_default = router;
