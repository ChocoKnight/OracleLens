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
var champion_exports = {};
__export(champion_exports, {
  default: () => champion_default
});
module.exports = __toCommonJS(champion_exports);
var import_express = __toESM(require("express"));
var import_champion_svc = __toESM(require("../services/champion-svc"));
const router = import_express.default.Router();
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const champions = await import_champion_svc.default.getOne(String(name));
      res.json(champions);
    } else {
      const champions = await import_champion_svc.default.getAll();
      res.json(champions);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/:championName", async (req, res) => {
  try {
    const champion = await import_champion_svc.default.getOne(req.params.championName);
    if (!champion) {
      res.status(404).send("Champion not found");
      return;
    }
    res.json(champion);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.post("/", async (req, res) => {
  try {
    const champion = req.body;
    const newChampion = await import_champion_svc.default.create(champion);
    res.json(newChampion);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put("/:championId", async (req, res) => {
  try {
    const champion = req.body;
    const updatedChampion = await import_champion_svc.default.update(parseInt(req.params.championId), champion);
    if (!updatedChampion) {
      res.status(404).send("Champion not found");
      return;
    }
    res.json(updatedChampion);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.delete("/:championName", async (req, res) => {
  try {
    const removed = await import_champion_svc.default.remove(req.params.championName);
    if (!removed) {
      res.status(404).send("Champion not found");
      return;
    }
    res.send("Champion removed");
  } catch (error) {
    res.status(500).send(error);
  }
});
var champion_default = router;
