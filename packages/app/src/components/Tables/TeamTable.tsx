// import React, { useState } from 'react';
import React from 'react';
import { Table } from 'react-bootstrap';
import { Team } from '../../types/Types';

const TeamTable: React.FC<{ teams: Team[] }> = (props) => {
    console.log(props.teams[0]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Year</th>
                        <th>Win Rate</th>
                        <th>Number of Matches</th>
                        <th>Number of Games</th>
                        <th>Blue Side Games</th>
                        <th>Blue Side Wins</th>
                        <th>Red Side Games</th>
                        <th>Red Side Wins</th>
                    </tr>
                </thead>
                <tbody>
                    {props.teams.map(team => (
                        <tr key={team.id}>
                            <td>{team.name}</td>
                            <td>{team.year}</td>
                            <td>{(((team.blueWins + team.redWins) / (team.blueGames + team.redGames)) * 100).toFixed(2)}%</td>
                            <td>{team.matches}</td>
                            <td>{(team.blueGames + team.redGames)}</td>
                            <td>{team.blueGames}</td>
                            <td>{team.blueWins}</td>
                            <td>{team.redGames}</td>
                            <td>{team.redWins}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TeamTable;