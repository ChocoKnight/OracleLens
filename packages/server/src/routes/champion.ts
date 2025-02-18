import express, { Request, Response } from "express";
import { Champion } from '../models/champion';
import ChampionService from "../services/champion-svc";

const router = express.Router();

router.get("/", async (_, res: Response) => {
    try {
        const champions = await ChampionService.getAll();
        res.json(champions);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/:championName", async (req: Request, res: Response) => {
    try {
        const champion = await ChampionService.getOne(req.params.championName);
        if (!champion) {
            res.status(404).send("Champion not found");
            return;
        }
        res.json(champion);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const champion = req.body as Champion;
        const newChampion = await ChampionService.create(champion);
        res.json(newChampion);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/:championId", async (req: Request, res: Response) => {
    try {
        const champion = req.body as Champion;
        const updatedChampion = await ChampionService.update(parseInt(req.params.championId), champion);
        if (!updatedChampion) {
            res.status(404).send("Champion not found");
            return;
        }
        res.json(updatedChampion);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:championName", async (req: Request, res: Response) => {
    try {
        const removed = await ChampionService.remove(req.params.championName);
        if (!removed) {
            res.status(404).send("Champion not found");
            return;
        }
        res.send("Champion removed");
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;