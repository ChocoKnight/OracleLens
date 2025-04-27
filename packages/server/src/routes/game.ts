import express, { Request, Response } from "express";
import { Game } from '../models/game';
import GameService from "../services/game-svc";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { matchId, gameNumber, gameId, side } = req.query;

        // console.log("Query params:", req.query);

        if(gameId) {
            if (side) {
                const games = await GameService.getByGameIDSideObjectives(Number(gameId), side as string);
                if (games) {
                    res.json(games);
                } else {
                    res.status(404).send("Game not found");
                }
                return;
            } else {
                const game = await GameService.getOne(Number(gameId));
                if (game) {
                    res.json(game);
                } else {
                    res.status(404).send("Game not found");
                }
                return;
            }
        } else if (matchId && gameNumber) {
            const game = await GameService.getByMatchGameNumber(Number(matchId), Number(gameNumber));
            if (game) {
                res.json(game);
            } else {
                res.status(404).send("Game not found");
            }
        } else if (matchId) {
            const games = await GameService.getByMatch(Number(matchId));
            res.json(games)
        }
        else {
            const games = await GameService.getAll();
            res.json(games)
        }
    } catch (error) {
        console.error("Error fetching gamees:", error);
        res.status(500).send(error);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const game = req.body as Game;
        const newGame = await GameService.create(game);
        res.json(newGame);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/:gameId", async (req: Request, res: Response) => {
    try {
        const game = req.body as Game;
        const updatedGame = await GameService.update(parseInt(req.params.gameId), game);
        if (!updatedGame) {
            res.status(404).send("Game not found");
            return;
        }
        res.json(updatedGame);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:gameId", async (req: Request, res: Response) => {
    try {
        const removed = await GameService.remove(parseInt(req.params.gameId));
        if (!removed) {
            res.status(404).send("Game not found");
            return;
        }
        res.send("Game removed");
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;