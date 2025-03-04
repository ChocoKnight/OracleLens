import React from 'react';
import { Table } from 'react-bootstrap';
import { PlayerChampionPlayed } from '../../types/Types';

const PlayerChampionInfo: React.FC<{ playerChampionInfo: PlayerChampionPlayed[] }> = ({ playerChampionInfo }) => {
    return (
        <div>
            <div className="scrollable-table-container">
                <Table className='side-stats'>
                    <thead>
                        <tr>
                            <th>Champion Name</th>
                            <th>Win Rate</th>
                            <th>Times Played</th>
                            <th>Blue Win Rate</th>
                            <th>Blue Wins</th>
                            <th>Times Played Blue</th>
                            <th>Red Win Rate</th>
                            <th>Red Wins</th>
                            <th>Times Played Red</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerChampionInfo.map(playerChampionInfo => (
                            <tr key={playerChampionInfo.championName}>
                                <td>
                                    <a href={`/Champions/${playerChampionInfo.championName}`}>
                                        {playerChampionInfo.championName}
                                    </a>
                                </td>
                                <td>{(((Number(playerChampionInfo.blueWins) + Number(playerChampionInfo.redWins)) / playerChampionInfo.timesPlayed) * 100).toFixed(2)}%</td>
                                <td>{playerChampionInfo.timesPlayed}</td>
                                <td>{((Number(playerChampionInfo.blueWins) / playerChampionInfo.blueGames) * 100).toFixed(2)}%</td>
                                <td>{playerChampionInfo.blueWins}</td>
                                <td>{playerChampionInfo.blueGames}</td>
                                <td>{((Number(playerChampionInfo.redWins) / playerChampionInfo.redGames) * 100).toFixed(2)}%</td>
                                <td>{playerChampionInfo.redWins}</td>
                                <td>{playerChampionInfo.redGames}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default PlayerChampionInfo;
