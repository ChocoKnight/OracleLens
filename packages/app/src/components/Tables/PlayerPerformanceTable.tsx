// import React, { useState } from 'react';
import React from 'react';
import { Table } from 'react-bootstrap';
import { PlayerPerformance } from '../../types/Types';
import '../../styles/Search.css'

interface playerPerformanceInfo {
    playerPerformances: PlayerPerformance[];
    color: string;
}

const PlayerPerformanceTable: React.FC<playerPerformanceInfo> = (props) => {
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Champion</th>
                        <th>Role</th>
                        <th>KDA</th>
                        <th>Damage to Champions</th>
                        <th>Vision Score</th>
                        <th>Total Gold</th>
                        <th>Creep Score</th>
                        <th>KDA at 15</th>
                        <th>Gold at 15</th>
                    </tr>
                </thead>
                <tbody>
                    {props.playerPerformances.map(playerPerformance => (
                        <tr className={props.color}>
                            <td>
                                <a href={`/Players/${playerPerformance.playerId}`}>
                                    {playerPerformance.playerName}
                                </a>
                            </td>
                            <td>
                                <a href={`/Champions/${playerPerformance.champion}`}>
                                    {playerPerformance.champion}
                                </a>
                            </td>
                            <td>
                                {playerPerformance.role}
                            </td>
                            <td>
                                {playerPerformance.kills} / {playerPerformance.deaths} / {playerPerformance.assists}
                            </td>
                            <td>
                                {playerPerformance.damageToChampions}
                            </td>
                            <td>
                                {playerPerformance.visionScore}
                            </td>
                            <td>
                                {playerPerformance.totalGold}
                            </td>
                            <td>
                                {playerPerformance.creepScore}
                            </td>
                            <td>
                                {playerPerformance.killsAt15} / {playerPerformance.deathsAt15} / {playerPerformance.assistsAt15}
                            </td>
                            <td>
                                {playerPerformance.goldAt15}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default PlayerPerformanceTable;