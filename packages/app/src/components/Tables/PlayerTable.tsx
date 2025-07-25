// import React, { useState } from 'react';
import React from 'react';
import { Table } from 'react-bootstrap';
import { Player } from '../../types/Types';

const PlayerTable: React.FC<{ players: Player[] }> = (props) => {
    console.log(props.players[0]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Team</th>
                        <th>Role</th>
                        <th>Number of Games</th>
                        <th>Most Played Champion</th>
                    </tr>
                </thead>
                <tbody>
                    {props.players.map(players => (
                        <tr>
                            <td>
                                <a href={`/Players/${players.id}`}>
                                    {players.name}
                                </a>
                            </td>
                            <td>{players.year}</td>
                            <td>
                                <a href={`/Teams/${players.teamId}`}>
                                    {players.team}
                                </a>
                            </td>
                            <td>{players.role !== null ? players.role : 'Unknown'}</td>
                            <td>{players.gamesPlayed}</td>
                            <td>
                                <a href={`/Champions/${players.mostPlayedChampion}`}>
                                    {players.mostPlayedChampion}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default PlayerTable;