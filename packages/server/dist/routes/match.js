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
var match_exports = {};
__export(match_exports, {
  default: () => match_default
});
module.exports = __toCommonJS(match_exports);
var import_express = __toESM(require("express"));
var import_match_svc = __toESM(require("../services/match-svc"));
const router = import_express.default.Router();
router.get("/", async (req, res) => {
  try {
    const { matchId, tournamentId } = req.query;
    if (matchId) {
      const match = await import_match_svc.default.getOne(Number(matchId));
      if (match) {
        res.json(match);
      } else {
        res.status(404).send("Match not found");
      }
    } else if (tournamentId) {
      const matches = await import_match_svc.default.getByTournament(Number(tournamentId));
      res.json(matches);
    } else {
      const matches = await import_match_svc.default.getAll();
      res.json(matches);
    }
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).send(error);
  }
});
router.post("/", async (req, res) => {
  try {
    const match = req.body;
    const newMatch = await import_match_svc.default.create(match);
    res.json(newMatch);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put("/:matchId", async (req, res) => {
  try {
    const match = req.body;
    const updatedMatch = await import_match_svc.default.update(parseInt(req.params.matchId), match);
    if (!updatedMatch) {
      res.status(404).send("Match not found");
      return;
    }
    res.json(updatedMatch);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.delete("/:matchId", async (req, res) => {
  try {
    const removed = await import_match_svc.default.remove(parseInt(req.params.matchId));
    if (!removed) {
      res.status(404).send("Match not found");
      return;
    }
    res.send("Match removed");
  } catch (error) {
    res.status(500).send(error);
  }
});
var match_default = router;
