import axios from "axios";

const PredictionService = {
    async runPipeline(teamOneId: number, teamTwoId: number) {
        const url = `http://localhost:8000/predict?teamOne=${teamOneId}&teamTwo=${teamTwoId}`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error: any) {
            console.error("Error calling prediction service:", error.message);
            throw new Error("Prediction service failed");
        }
    }
}

export default PredictionService;