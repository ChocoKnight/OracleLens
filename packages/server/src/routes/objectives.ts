import express, { Request, Response } from "express";
import { Objective } from '../models/objective';
import ObjectiveService from "../services/objective-svc";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { gameId, side } = req.query;

        if(gameId && side) {
            const objective = await ObjectiveService.getByGameSide(Number(gameId), String(side));
            if (objective) {
                res.json(objective);
            } else {
                res.status(404).send("Objective not found");
            }
        } else if (gameId) {
            const objectivees = await ObjectiveService.getByGame(Number(gameId));
            res.json(objectivees);
        } else {
            const objectivees = await ObjectiveService.getAll();
            res.json(objectivees)
        }
    } catch (error) {
        console.error("Error fetching objectivees:", error);
        res.status(500).send(error);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const objective = req.body as Objective;
        const newObjective = await ObjectiveService.create(objective);
        res.json(newObjective);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/:gameId/:side", async (req: Request, res: Response) => {
    try {
        const objective = req.body as Objective;
        const updatedObjective = await ObjectiveService.update(parseInt(req.params.gameId), req.params.side, objective);
        if (!updatedObjective) {
            res.status(404).send("Objective not found");
            return;
        }
        res.json(updatedObjective);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:gameId/:side", async (req: Request, res: Response) => {
    try {
        const removed = await ObjectiveService.remove(parseInt(req.params.gameId), req.params.side,);
        if (!removed) {
            res.status(404).send("Objective not found");
            return;
        }
        res.send("Objective removed");
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;