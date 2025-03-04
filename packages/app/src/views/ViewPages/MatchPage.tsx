import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TopBar from '../../components/Navbars/TopBar'
import GameTabs from '../../components/Summaries/GameSummary';
import { MatchSummary } from '../../types/Types';
import '../../styles/ViewPage.css'

function fetchMatches(id: number): Promise<Response> {
    const url = `http://localhost:3000/api/matches?id=${id}`;
    return fetch(url);
}
const MatchPage = () => {
    const { matchId } = useParams();
    const [data, setData] = useState<MatchSummary | null>(null);

    useEffect(() => {
        if (!matchId) return;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        fetchMatches(Number(matchId))
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(json => {
                clearTimeout(timeoutId);
                setData(json);
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
    }, [matchId]);

    return (
        <div>
            <TopBar></TopBar>
            {/* MatchPage Page {matchId} */}
            {data ? (
                <div>
                    <h2>{data.matchInfo.league} {data.matchInfo.split} {data.matchInfo.year}</h2>
                    <h3>{data.teamScores[0].teamName} vs {data.teamScores[1].teamName}</h3>
                    <h3>{Number(data.teamScores[0].redWins) + Number(data.teamScores[0].blueWins)} - {Number(data.teamScores[1].redWins) + Number(data.teamScores[1].blueWins)}</h3>
                    <p>
                        {data.matchInfo.date ? new Date(data.matchInfo.date).toLocaleDateString() : 'N/A'}
                    </p>
                    <p>
                        Patch: {data.matchInfo.patch}
                    </p>
                    <GameTabs games={data.games}></GameTabs>
                </div>
            ) : (
                <p>Select Tournament</p>
            )}
        </div>
    );
};

export default MatchPage;
