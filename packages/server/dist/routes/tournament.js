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
var tournament_exports = {};
__export(tournament_exports, {
  default: () => tournament_default
});
module.exports = __toCommonJS(tournament_exports);
var import_express = __toESM(require("express"));
var import_tournament_svc = __toESM(require("../services/tournament-svc"));
const router = import_express.default.Router();
router.get("/", async (req, res) => {
  try {
    const { year } = req.query;
    if (year) {
      const tournaments = await import_tournament_svc.default.getAllForYear(Number(year));
      res.json(tournaments);
    } else {
      const tournaments = await import_tournament_svc.default.getAll();
      res.json(tournaments);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/:tournamentName", async (req, res) => {
  const tournamentId = parseInt(req.params.tournamentName);
  if (isNaN(tournamentId)) {
    try {
      const champion = await import_tournament_svc.default.getTournament(req.params.tournamentName);
      if (!champion) {
        res.status(404).send("Tournament not found");
        return;
      }
      res.json(champion);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    try {
      const champion = await import_tournament_svc.default.getOne(tournamentId);
      if (!champion) {
        res.status(404).send("Tournament not found");
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
    const tournament = req.body;
    const newTournament = await import_tournament_svc.default.create(tournament);
    res.json(newTournament);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put("/:tournamentId", async (req, res) => {
  try {
    const tournament = req.body;
    const updatedTournament = await import_tournament_svc.default.update(parseInt(req.params.tournamentId), tournament);
    if (!updatedTournament) {
      res.status(404).send("Tournament not found");
      return;
    }
    res.json(updatedTournament);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.delete("/:tournamentId", async (req, res) => {
  try {
    const removed = await import_tournament_svc.default.remove(parseInt(req.params.tournamentId));
    if (!removed) {
      res.status(404).send("Tournament not found");
      return;
    }
    res.send("Tournament removed");
  } catch (error) {
    res.status(500).send(error);
  }
});
var tournament_default = router;
