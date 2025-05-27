import express, { Request, Response } from "express";
// import { Prediction } from '../models/prediction';
import PredictionService from "services/prediction-svc";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { teamOneId, teamTwoId } = req.query;

        // if (!teamOneId || !teamTwoId) {
        //     // return res.status(400).send("Missing required query params: teamOneId, teamTwoId");
        //     return res.status(400);
        // }

        const result = await PredictionService.runPipeline(Number(teamOneId), Number(teamTwoId));
        res.json(result);
    } catch (error) {
        console.error("Error running pipeline:", error);
        res.status(500).send("Internal server error");
    }
});

export default router;