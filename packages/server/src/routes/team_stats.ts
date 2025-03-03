import express, { Request, Response } from "express";
import { TeamStats } from '../models/team_stats';
import TeamStatsService from "../services/team_stats-svc";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { id } = req.query;

        if (id) {
            const teamStats = await TeamStatsService.getTeamStats(Number(id));
            res.json(teamStats);
        } 
    } catch (error) {
        res.status(500).send(error);
    }
});


export default router;