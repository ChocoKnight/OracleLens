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
var pick_ban_exports = {};
__export(pick_ban_exports, {
  default: () => pick_ban_default
});
module.exports = __toCommonJS(pick_ban_exports);
var import_express = __toESM(require("express"));
var import_pick_ban_svc = __toESM(require("../services/pick_ban-svc"));
const router = import_express.default.Router();
router.get("/", async (req, res) => {
  try {
    const { gameId, side } = req.query;
    if (gameId && side) {
      const pickban = await import_pick_ban_svc.default.getByGameSide(Number(gameId), String(side));
      if (pickban) {
        res.json(pickban);
      } else {
        res.status(404).send("PickBan not found");
      }
    } else if (gameId) {
      const pickbanes = await import_pick_ban_svc.default.getByGame(Number(gameId));
      res.json(pickbanes);
    } else {
      const pickbanes = await import_pick_ban_svc.default.getAll();
      res.json(pickbanes);
    }
  } catch (error) {
    console.error("Error fetching pickbanes:", error);
    res.status(500).send(error);
  }
});
router.post("/", async (req, res) => {
  try {
    const pickban = req.body;
    const newPickBan = await import_pick_ban_svc.default.create(pickban);
    res.json(newPickBan);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put("/:gameId/:side", async (req, res) => {
  try {
    const pickban = req.body;
    const updatedPickBan = await import_pick_ban_svc.default.update(parseInt(req.params.gameId), req.params.side, pickban);
    if (!updatedPickBan) {
      res.status(404).send("PickBan not found");
      return;
    }
    res.json(updatedPickBan);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.delete("/:gameId/:side", async (req, res) => {
  try {
    const removed = await import_pick_ban_svc.default.remove(parseInt(req.params.gameId), req.params.side);
    if (!removed) {
      res.status(404).send("PickBan not found");
      return;
    }
    res.send("PickBan removed");
  } catch (error) {
    res.status(500).send(error);
  }
});
var pick_ban_default = router;
