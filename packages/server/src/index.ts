import express from "express";
// import { connect } from "./mysql";
import pool from "./mysql";
import cors from "cors";

import Champions from "./routes/champion";
import Teams from "./routes/team";
import Players from "./routes/player";
import Tournaments from "./routes/tournament";
import Matches from "./routes/match";
import Games from "./routes/game";
import Objectives from "./routes/objectives";
import PickBans from "./routes/pick_ban";
import PlayerPerformances from "./routes/player_performance";
import TeamStats from "./routes/team_stats";
import Predictions from "./routes/prediction";

const app = express();
const port = process.env.PORT || 3000;

// Connect to DB
const database_pool = pool;

// Static Files 
const staticDir = process.env.STATIC || "public";
app.use(express.static(staticDir));

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/champions", Champions);
app.use("/api/teams", Teams);
app.use("/api/players", Players);
app.use("/api/tournaments", Tournaments);
app.use("/api/matches", Matches);
app.use("/api/games", Games);
app.use("/api/objectives", Objectives);
app.use("/api/pickbans", PickBans);
app.use("/api/playerperformances", PlayerPerformances);
app.use("/api/teamstats", TeamStats);
app.use("/api/predictions", Predictions);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});