import React from 'react';
import { Table } from 'react-bootstrap';
import { PlayerStats } from '../../types/Types';

const PlayerInfo: React.FC<{ playerInfo: PlayerStats[] }> = ({ playerInfo }) => {
    return (
        <div>
            <div className="scrollable-table-container">
                <Table className='side-stats'>
                    <thead>
                        <tr>
                            <th>Avg KDA</th>
                            <th>Avg Damage To Champions</th>
                            <th>Avg Wards Placed</th>
                            <th>Avg Wards Destroyed</th>
                            <th>Avg Control Wards</th>
                            <th>Avg Vision Score</th>
                            <th>Avg Total Gold</th>
                            <th>Avg Gold Spent</th>
                            <th>Avg Creep Score</th>
                            <th>Avg At 15 Kills</th>
                            <th>Avg At 15 Deaths</th>
                            <th>Avg At 15 Assists</th>
                            <th>Avg At 15 Total Gold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerInfo.sort((a, b) => {
                            const roleOrder = ['top', 'jng', 'mid', 'bot', 'sup'];
                            const roleA = roleOrder.indexOf(a.role);
                            const roleB = roleOrder.indexOf(b.role);
                            return roleA - roleB;
                        }).map(player => (
                            <tr key={player.playerId}>
                                <td>{player.avgKills}/{player.avgDeaths}/{player.avgAssists}</td>
                                <td>{player.avgDamageToChampions}</td>
                                <td>{player.avgWardsPlaced}</td>
                                <td>{player.avgWardsDestroyed}</td>
                                <td>{player.avgControlWards}</td>
                                <td>{player.avgVisionScore}</td>
                                <td>{player.avgTotalGold}</td>
                                <td>{player.avgGoldSpent}</td>
                                <td>{player.avgCreepScore}</td>
                                <td>{player.avgAt15Kills}</td>
                                <td>{player.avgAt15Deaths}</td>
                                <td>{player.avgAt15Assists}</td>
                                <td>{player.avgAt15TotalGold}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default PlayerInfo;
