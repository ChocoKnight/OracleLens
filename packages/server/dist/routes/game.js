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
var game_exports = {};
__export(game_exports, {
  default: () => game_default
});
module.exports = __toCommonJS(game_exports);
var import_express = __toESM(require("express"));
var import_game_svc = __toESM(require("../services/game-svc"));
const router = import_express.default.Router();
router.get("/", async (req, res) => {
  try {
    const { matchId, gameNumber, gameId } = req.query;
    if (gameId) {
      const game = await import_game_svc.default.getOne(Number(gameId));
      if (game) {
        res.json(game);
      } else {
        res.status(404).send("Game not found");
      }
    } else if (matchId && gameNumber) {
      const game = await import_game_svc.default.getByMatchGameNumber(Number(matchId), Number(gameNumber));
      if (game) {
        res.json(game);
      } else {
        res.status(404).send("Game not found");
      }
    } else if (matchId) {
      const games = await import_game_svc.default.getByMatch(Number(matchId));
      res.json(games);
    } else {
      const games = await import_game_svc.default.getAll();
      res.json(games);
    }
  } catch (error) {
    console.error("Error fetching gamees:", error);
    res.status(500).send(error);
  }
});
router.post("/", async (req, res) => {
  try {
    const game = req.body;
    const newGame = await import_game_svc.default.create(game);
    res.json(newGame);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put("/:gameId", async (req, res) => {
  try {
    const game = req.body;
    const updatedGame = await import_game_svc.default.update(parseInt(req.params.gameId), game);
    if (!updatedGame) {
      res.status(404).send("Game not found");
      return;
    }
    res.json(updatedGame);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.delete("/:gameId", async (req, res) => {
  try {
    const removed = await import_game_svc.default.remove(parseInt(req.params.gameId));
    if (!removed) {
      res.status(404).send("Game not found");
      return;
    }
    res.send("Game removed");
  } catch (error) {
    res.status(500).send(error);
  }
});
var game_default = router;
