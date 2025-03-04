import express, { Request, Response } from "express";
import { Team } from '../models/team';
import TeamService from "../services/team-svc";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { year } = req.query;

        if (year) {
            const teams = await TeamService.getAllByYear(Number(year));
            res.json(teams);
        } else {
            const teams = await TeamService.getAll();
            res.json(teams);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/:teamName", async (req: Request, res: Response) => {
    const teamId = parseInt(req.params.teamName);

    if (isNaN(teamId)) {
        try {
            const champion = await TeamService.getTeam(req.params.teamName);
            if (!champion) {
                res.status(404).send("Team not found");
                return;
            }
            res.json(champion);
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        try {
            const champion = await TeamService.getOne(teamId);
            if (!champion) {
                res.status(404).send("Team not found");
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
        const team = req.body as Team;
        const newTeam = await TeamService.create(team);
        res.json(newTeam);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/:teamId", async (req: Request, res: Response) => {
    try {
        const team = req.body as Team;
        const updatedTeam = await TeamService.update(parseInt(req.params.teamId), team);
        if (!updatedTeam) {
            res.status(404).send("Team not found");
            return;
        }
        res.json(updatedTeam);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:teamId", async (req: Request, res: Response) => {
    try {
        const removed = await TeamService.remove(parseInt(req.params.teamId));
        if (!removed) {
            res.status(404).send("Team not found");
            return;
        }
        res.send("Team removed");
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;