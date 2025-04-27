import express, { Request, Response } from "express";
import { PlayerPerformance } from '../models/player_performance';
import PlayerPerformanceService from "../services/player_performance-svc";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { gameId, playerId, side } = req.query;

        if(gameId && playerId) {
            const playerperformance = await PlayerPerformanceService.getByGamePlayer(Number(gameId), Number(playerId));
            if (playerperformance) {
                res.json(playerperformance);
            } else {
                res.status(404).send("PlayerPerformance not found");
            }
        } else if (gameId) {
            if (side) {
                const playerperformancees = await PlayerPerformanceService.getByGameSide(Number(gameId), side as string);
                res.json(playerperformancees);
                return 
            }  else {
                const playerperformancees = await PlayerPerformanceService.getByGame(Number(gameId));
            res.json(playerperformancees);
            }
        } else if (playerId) {
            const playerperformancees = await PlayerPerformanceService.getByPlayer(Number(gameId));
            res.json(playerperformancees);
        } else {
            const playerperformancees = await PlayerPerformanceService.getAll();
            res.json(playerperformancees)
        }
    } catch (error) {
        console.error("Error fetching playerperformancees:", error);
        res.status(500).send(error);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const playerperformance = req.body as PlayerPerformance;
        const newPlayerPerformance = await PlayerPerformanceService.create(playerperformance);
        res.json(newPlayerPerformance);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/:gameId/:playerId", async (req: Request, res: Response) => {
    try {
        const playerperformance = req.body as PlayerPerformance;
        const updatedPlayerPerformance = await PlayerPerformanceService.update(parseInt(req.params.gameId), parseInt(req.params.playerId), playerperformance);
        if (!updatedPlayerPerformance) {
            res.status(404).send("PlayerPerformance not found");
            return;
        }
        res.json(updatedPlayerPerformance);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:gameId/:playerId", async (req: Request, res: Response) => {
    try {
        const removed = await PlayerPerformanceService.remove(parseInt(req.params.gameId), parseInt(req.params.playerId));
        if (!removed) {
            res.status(404).send("PlayerPerformance not found");
            return;
        }
        res.send("PlayerPerformance removed");
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;