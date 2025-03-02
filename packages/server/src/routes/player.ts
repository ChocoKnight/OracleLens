import express, { Request, Response } from "express";
import { Player } from '../models/player';
import PlayerService from "../services/player-svc";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { playerName, playerId, year } = req.query;

        if (playerName) {
            const players = await PlayerService.getPlayer(String(playerName));
            res.json(players);
        } else if (playerId) {
            const players = await PlayerService.getOne(Number(playerId));
            res.json(players)
        } else if (year) {
            const players = await PlayerService.getAllByYear(Number(year));
            res.json(players);
        } else {
            const players = await PlayerService.getAll();
            res.json(players);
        }
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).send(error);
    }
});

router.get("/:playerName", async (req: Request, res: Response) => {
    const playerId = parseInt(req.params.playerName);

    if (isNaN(playerId)) {
        try {
            const champion = await PlayerService.getPlayer(req.params.playerName);
            if (!champion) {
                res.status(404).send("Player not found");
                return;
            }
            res.json(champion);
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        try {
            const champion = await PlayerService.getOne(playerId);
            if (!champion) {
                res.status(404).send("Player not found");
                return;
            }
            res.json(champion);
        } catch (error) {
            res.status(500).send(error);
        }
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const player = req.body as Player;
        const newPlayer = await PlayerService.create(player);
        res.json(newPlayer);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/:playerId", async (req: Request, res: Response) => {
    try {
        const player = req.body as Player;
        const updatedPlayer = await PlayerService.update(parseInt(req.params.playerId), player);
        if (!updatedPlayer) {
            res.status(404).send("Player not found");
            return;
        }
        res.json(updatedPlayer);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:playerId", async (req: Request, res: Response) => {
    try {
        const removed = await PlayerService.remove(parseInt(req.params.playerId));
        if (!removed) {
            res.status(404).send("Player not found");
            return;
        }
        res.send("Player removed");
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;