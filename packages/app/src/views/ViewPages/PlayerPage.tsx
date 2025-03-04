import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TopBar from '../../components/Navbars/TopBar'
import DetailedPlayedStats from '../../components/Tables/DetailedPlayerStats'
import PlayerChampionInfo from '../../components/Tables/ChampionPlayed'
import { PlayerSummary } from '../../types/Types';
import '../../styles/ViewPage.css'

function fetchPlayerStats(id: number): Promise<Response> {
    const url = `http://localhost:3000/api/players?id=${id}`;
    return fetch(url);
}

const PlayerPage = () => {
    const { playerId } = useParams();

    const [data, setData] = useState<PlayerSummary | null>(null);

    useEffect(() => {
        if (!playerId) return;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        fetchPlayerStats(Number(playerId))
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
    }, [playerId]);

    return (
        <div>
            <TopBar></TopBar>
            {data ? (
                <div>
                    <h2>{data.playerStats.playerName} - <a href={`/Teams/${data.playerStats.teamId}`}>
                        {data.playerStats.teamName} {data.playerStats.year}</a></h2>
                    <h4>Role: {data.playerStats.role}</h4>
                    <DetailedPlayedStats playerInfo={[data.playerStats]}></DetailedPlayedStats>
                    <h4>Champion Pool</h4>
                    <PlayerChampionInfo playerChampionInfo={data.mostPlayedChampions}></PlayerChampionInfo>
                </div>
            ) : (
                <p>Select Player</p>
            )}
        </div>
    );
};

export default PlayerPage;
