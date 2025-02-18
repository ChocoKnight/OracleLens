import express, { Request, Response } from "express";
import { PickBan } from '../models/pick_ban';
import PickBanService from "../services/pick_ban-svc";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { gameId, side } = req.query;

        if(gameId && side) {
            const pickban = await PickBanService.getByGameSide(Number(gameId), String(side));
            if (pickban) {
                res.json(pickban);
            } else {
                res.status(404).send("PickBan not found");
            }
        } else if (gameId) {
            const pickbanes = await PickBanService.getByGame(Number(gameId));
            res.json(pickbanes);
        } else {
            const pickbanes = await PickBanService.getAll();
            res.json(pickbanes)
        }
    } catch (error) {
        console.error("Error fetching pickbanes:", error);
        res.status(500).send(error);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const pickban = req.body as PickBan;
        const newPickBan = await PickBanService.create(pickban);
        res.json(newPickBan);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/:gameId/:side", async (req: Request, res: Response) => {
    try {
        const pickban = req.body as PickBan;
        const updatedPickBan = await PickBanService.update(parseInt(req.params.gameId), req.params.side, pickban);
        if (!updatedPickBan) {
            res.status(404).send("PickBan not found");
            return;
        }
        res.json(updatedPickBan);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:gameId/:side", async (req: Request, res: Response) => {
    try {
        const removed = await PickBanService.remove(parseInt(req.params.gameId), req.params.side,);
        if (!removed) {
            res.status(404).send("PickBan not found");
            return;
        }
        res.send("PickBan removed");
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;