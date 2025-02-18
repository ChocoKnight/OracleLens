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
var team_exports = {};
__export(team_exports, {
  default: () => team_default
});
module.exports = __toCommonJS(team_exports);
var import_express = __toESM(require("express"));
var import_team_svc = __toESM(require("../services/team-svc"));
const router = import_express.default.Router();
router.get("/", async (_, res) => {
  try {
    const teams = await import_team_svc.default.getAll();
    res.json(teams);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/:teamName", async (req, res) => {
  const teamId = parseInt(req.params.teamName);
  if (isNaN(teamId)) {
    try {
      const champion = await import_team_svc.default.getTeam(req.params.teamName);
      if (!champion) {
        res.status(404).send("Team not found");
        return;
      }
      res.json(champion);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    try {
      const champion = await import_team_svc.default.getOne(teamId);
      if (!champion) {
        res.status(404).send("Team not found");
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
    const team = req.body;
    const newTeam = await import_team_svc.default.create(team);
    res.json(newTeam);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put("/:teamId", async (req, res) => {
  try {
    const team = req.body;
    const updatedTeam = await import_team_svc.default.update(parseInt(req.params.teamId), team);
    if (!updatedTeam) {
      res.status(404).send("Team not found");
      return;
    }
    res.json(updatedTeam);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.delete("/:teamId", async (req, res) => {
  try {
    const removed = await import_team_svc.default.remove(parseInt(req.params.teamId));
    if (!removed) {
      res.status(404).send("Team not found");
      return;
    }
    res.send("Team removed");
  } catch (error) {
    res.status(500).send(error);
  }
});
var team_default = router;
