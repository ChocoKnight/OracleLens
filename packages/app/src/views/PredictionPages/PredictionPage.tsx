import { useState, useEffect } from 'react';
import TopBar from '../../components/Navbars/TopBar'
import TeamInfo from '../../components/TeamComparison/TeamComparisonInfo'
import TeamSearch from '../../components/TeamComparison/TeamSearch'
import { Team } from '../../types/Types';
import '../../styles/Prediction.css'

function fetchTeams(): Promise<Response> {
    const url = 'http://localhost:3000/api/teams';
    return fetch(url);
}

function fetchPrediction(teamOneId: string, teamTwoId: string): Promise<Response> {
    const url = `http://localhost:3000/api/predictions?teamOneId=${teamOneId}&teamTwoId=${teamTwoId}`;
    return fetch(url);
}

function Main() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [teamOneId, setTeamOneId] = useState("");
    const [teamTwoId, setTeamTwoId] = useState("");
    const [prediction, setPrediction] = useState<any>(null);

    useEffect(() => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        fetchTeams()
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(json => {
                clearTimeout(timeoutId);
                setTeams(json);
            })
            .catch(error => {
                if (error.name === "AbortError") {
                    console.warn("Fetch aborted due to timeout");
                } else {
                    console.error('Error fetching data:', error);
                }
            });

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, []);

    useEffect(() => {
        if (!teamOneId || !teamTwoId) return;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        fetchPrediction(teamOneId, teamTwoId)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(json => {
                clearTimeout(timeoutId);
                setPrediction(json);
            })
            .catch(error => {
                if (error.name === "AbortError") {
                    console.warn("Fetch aborted due to timeout");
                } else {
                    console.error('Error fetching prediction:', error);
                }
            });

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [teamOneId, teamTwoId]);

    console.log("Team One ID", teamOneId);
    console.log("Team Two ID", teamTwoId);
    console.log("Predictions", prediction)

    return (
        <div>
            <TopBar></TopBar>
            <h2>
                Predictions
            </h2>
            <div className='prediction-container'>
                <div className='team-info'>
                    <TeamSearch onTeamSelect={setTeamOneId} teams={teams}></TeamSearch>
                    <TeamInfo teamId={Number(teamOneId)}></TeamInfo>
                </div>
                <div className='prediction-info'>
                    {prediction ? (
                        <h3>
                            {(prediction.probability * 100).toFixed(0)} - {((1 - prediction.probability) * 100).toFixed(0)}
                        </h3>
                    ) : (
                        <h3>Select both teams to get prediction</h3>
                    )}
                </div>
                <div className='team-info'>
                    <TeamSearch onTeamSelect={setTeamTwoId} teams={teams}></TeamSearch>
                    <TeamInfo teamId={Number(teamTwoId)}></TeamInfo>
                </div>
            </div>
        </div>
    )
}

export default Main;