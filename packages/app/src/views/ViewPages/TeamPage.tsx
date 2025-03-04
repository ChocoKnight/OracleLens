import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TopBar from '../../components/Navbars/TopBar'
import SideStats from '../../components/TeamComparison/SideStats';
import PlayerInfo from '../../components/TeamComparison/PlayerStats';
import { TeamStats } from '../../types/Types';
import '../../styles/ViewPage.css'

function fetchTeamsStats(teamId: number): Promise<Response> {
    const url = `http://localhost:3000/api/teamstats?id=${teamId}`;
    return fetch(url);
}

const TeamPage = () => {
    const { teamId } = useParams();
    const [data, setData] = useState<TeamStats | null>(null);

    useEffect(() => {
        if (!teamId) return;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        fetchTeamsStats(Number(teamId))
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
    }, [teamId]);

    return (
        <div>
            <TopBar></TopBar>
            {/* Team Page {teamId} */}
            {data ? (
                <div>
                    <h2>{data.team} {data.year}</h2>
                    <h4>Team Stats</h4>
                    <SideStats blueSide={data.blueSideStats} redSide={data.redSideStats}></SideStats>
                    <h4>Player Stats</h4>
                    <PlayerInfo playerInfo={data.playerStats.sort()}></PlayerInfo>
                    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                </div>
            ) : (
                <p>Select Team</p>
            )}
        </div>
    );
};

export default TeamPage;
