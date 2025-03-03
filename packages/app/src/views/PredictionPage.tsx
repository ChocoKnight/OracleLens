import { useState, useEffect } from 'react';
import TopBar from '../components/Navbars/TopBar'
import TeamInfo from '../components/TeamComparison/TeamComparisonInfo'
import TeamSearch from '../components/TeamComparison/TeamSearch'
import { Team } from '../types/Types';
import '../styles/Prediction.css'

function fetchTeams(): Promise<Response> {
    const url = 'http://localhost:3000/api/teams';
    return fetch(url);
}

function Main() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [teamOneId, setTeamOneId] = useState("");
    const [teamTwoId, setTeamTwoId] = useState("");

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
                    Predictions
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