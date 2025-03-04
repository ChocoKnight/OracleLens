"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express = __toESM(require("express"));
var import_mysql = __toESM(require("./mysql"));
var import_cors = __toESM(require("cors"));
var import_champion = __toESM(require("./routes/champion"));
var import_team = __toESM(require("./routes/team"));
var import_player = __toESM(require("./routes/player"));
var import_tournament = __toESM(require("./routes/tournament"));
var import_match = __toESM(require("./routes/match"));
var import_game = __toESM(require("./routes/game"));
var import_objectives = __toESM(require("./routes/objectives"));
var import_pick_ban = __toESM(require("./routes/pick_ban"));
var import_player_performance = __toESM(require("./routes/player_performance"));
var import_team_stats = __toESM(require("./routes/team_stats"));
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const database_pool = import_mysql.default;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.static(staticDir));
app.use((0, import_cors.default)());
app.use(import_express.default.json());
app.use("/api/champions", import_champion.default);
app.use("/api/teams", import_team.default);
app.use("/api/players", import_player.default);
app.use("/api/tournaments", import_tournament.default);
app.use("/api/matches", import_match.default);
app.use("/api/games", import_game.default);
app.use("/api/objectives", import_objectives.default);
app.use("/api/pickbans", import_pick_ban.default);
app.use("/api/playerperformances", import_player_performance.default);
app.use("/api/teamstats", import_team_stats.default);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
