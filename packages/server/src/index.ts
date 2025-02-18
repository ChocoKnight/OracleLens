import express from "express";
// import { connect } from "./mysql";
import pool from "./mysql";

import Champions from "./routes/champion";
import Teams from "./routes/team";

const app = express();
const port = process.env.PORT || 3000;

// Connect to DB
const database_pool = pool;

// Static Files 
const staticDir = process.env.STATIC || "public";
app.use(express.static(staticDir));

// Middleware
app.use(express.json());

// API Routes
app.use("/api/champions", Champions);
app.use("/api/teams", Teams);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});