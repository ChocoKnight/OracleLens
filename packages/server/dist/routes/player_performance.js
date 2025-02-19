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
var player_performance_exports = {};
__export(player_performance_exports, {
  default: () => player_performance_default
});
module.exports = __toCommonJS(player_performance_exports);
var import_express = __toESM(require("express"));
var import_player_performance_svc = __toESM(require("../services/player_performance-svc"));
const router = import_express.default.Router();
router.get("/", async (req, res) => {
  try {
    const { gameId, playerId } = req.query;
    if (gameId && playerId) {
      const playerperformance = await import_player_performance_svc.default.getByGamePlayer(Number(gameId), Number(playerId));
      if (playerperformance) {
        res.json(playerperformance);
      } else {
        res.status(404).send("PlayerPerformance not found");
      }
    } else if (gameId) {
      const playerperformancees = await import_player_performance_svc.default.getByGame(Number(gameId));
      res.json(playerperformancees);
    } else if (playerId) {
      const playerperformancees = await import_player_performance_svc.default.getByPlayer(Number(gameId));
      res.json(playerperformancees);
    } else {
      const playerperformancees = await import_player_performance_svc.default.getAll();
      res.json(playerperformancees);
    }
  } catch (error) {
    console.error("Error fetching playerperformancees:", error);
    res.status(500).send(error);
  }
});
router.post("/", async (req, res) => {
  try {
    const playerperformance = req.body;
    const newPlayerPerformance = await import_player_performance_svc.default.create(playerperformance);
    res.json(newPlayerPerformance);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put("/:gameId/:playerId", async (req, res) => {
  try {
    const playerperformance = req.body;
    const updatedPlayerPerformance = await import_player_performance_svc.default.update(parseInt(req.params.gameId), parseInt(req.params.playerId), playerperformance);
    if (!updatedPlayerPerformance) {
      res.status(404).send("PlayerPerformance not found");
      return;
    }
    res.json(updatedPlayerPerformance);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.delete("/:gameId/:playerId", async (req, res) => {
  try {
    const removed = await import_player_performance_svc.default.remove(parseInt(req.params.gameId), parseInt(req.params.playerId));
    if (!removed) {
      res.status(404).send("PlayerPerformance not found");
      return;
    }
    res.send("PlayerPerformance removed");
  } catch (error) {
    res.status(500).send(error);
  }
});
var player_performance_default = router;
