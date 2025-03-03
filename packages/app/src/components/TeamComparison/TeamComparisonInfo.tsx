import React, { useState, useEffect } from 'react';
import SideStats from './SideStats';
import PlayerInfo from './PlayerStats';
import { TeamStats } from '../../types/Types';

function fetchTeamsStats(teamId: number): Promise<Response> {
    const url = `http://localhost:3000/api/teamstats?id=${teamId}`;
    return fetch(url);
}

const TeamInfo: React.FC<{ teamId: number }> = ({ teamId }) => {
    const [data, setData] = useState<TeamStats | null>(null);

    console.log(teamId)

    useEffect(() => {
        if (!teamId) return;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        fetchTeamsStats(teamId)
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
            {data ? (
                <div>
                    <h5>{data.team} {data.year}</h5>
                    <SideStats blueSide={data.blueSideStats} redSide={data.redSideStats}></SideStats>
                    <PlayerInfo playerInfo={data.playerStats}></PlayerInfo>
                    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                </div>
            ) : (
                <p>Select Team</p>
            )}
        </div>
    );
    
}

export default TeamInfo;
