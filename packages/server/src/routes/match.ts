import express, { Request, Response } from "express";
import { Match } from '../models/match';
import MatchService from "../services/match-svc";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { matchId, tournamentId, id, teamId, gamesPlayed, date } = req.query;

        if (id) {
            const match = await MatchService.getOne(Number(id));
            if (match) {
                res.json(match);
            } else {
                res.status(404).send("Match not found");
            }
        } else if (teamId) {
            if (gamesPlayed) {
                if (date) {
                    const matches = await MatchService.getTeamFromDateTenMatchesPlayed(Number(teamId), String(date), Number(gamesPlayed));
                    res.json(matches);
                } else {
                    const matches = await MatchService.getTeamMostRecentTenMatchesPlayed(Number(teamId), Number(gamesPlayed));
                    res.json(matches);
                }
            } else {
                const matches = await MatchService.getTeamMatchesPlayed(Number(teamId));
                res.json(matches);
            }
        } else {
            const matches = await MatchService.getAll();
            res.json(matches);
        }
    } catch (error) {
        console.error("Error fetching matches:", error);
        res.status(500).send(error);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const match = req.body as Match;
        const newMatch = await MatchService.create(match);
        res.json(newMatch);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/:matchId", async (req: Request, res: Response) => {
    try {
        const match = req.body as Match;
        const updatedMatch = await MatchService.update(parseInt(req.params.matchId), match);
        if (!updatedMatch) {
            res.status(404).send("Match not found");
            return;
        }
        res.json(updatedMatch);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:matchId", async (req: Request, res: Response) => {
    try {
        const removed = await MatchService.remove(parseInt(req.params.matchId));
        if (!removed) {
            res.status(404).send("Match not found");
            return;
        }
        res.send("Match removed");
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;