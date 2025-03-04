import express, { Request, Response } from "express";
import { Tournament } from '../models/tournament';
import TournamentService from "../services/tournament-svc";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { year, id } = req.query;

        if (id) {
            const tournamentSummary = await TournamentService.getOne(Number(id));
            res.json(tournamentSummary);
        } else if (year) {
            const tournaments = await TournamentService.getAllForYear(Number(year));
            res.json(tournaments);
        } else {
            const tournaments = await TournamentService.getAll();
            res.json(tournaments);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const tournament = req.body as Tournament;
        const newTournament = await TournamentService.create(tournament);
        res.json(newTournament);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/:tournamentId", async (req: Request, res: Response) => {
    try {
        const tournament = req.body as Tournament;
        const updatedTournament = await TournamentService.update(parseInt(req.params.tournamentId), tournament);
        if (!updatedTournament) {
            res.status(404).send("Tournament not found");
            return;
        }
        res.json(updatedTournament);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:tournamentId", async (req: Request, res: Response) => {
    try {
        const removed = await TournamentService.remove(parseInt(req.params.tournamentId));
        if (!removed) {
            res.status(404).send("Tournament not found");
            return;
        }
        res.send("Tournament removed");
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;