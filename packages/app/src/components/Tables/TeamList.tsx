// import React, { useState } from 'react';
import React from 'react';
import { Table } from 'react-bootstrap';
import { TeamName } from '../../types/Types';
import '../../styles/Search.css';

const TeamList: React.FC<{ teams: TeamName[] }> = (props) => {
    console.log(props.teams[0]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Teams</th>
                        <th>Win Rate</th>
                        <th>Blue Win Rate</th>
                        <th>Red Win Rate</th>
                        <th>Games Played</th>
                    </tr>
                </thead>
                <tbody>
                    {props.teams.map(team => (
                        <tr key={team.teamId}>
                            <td>
                                <a href={`/Teams/${team.teamId}`}>
                                    {team.teamName} {team.year}
                                </a>
                            </td>
                            <td>
                                {((Number(team.blueWins) + Number(team.redWins)) / (team.blueGames + team.redGames)* 100).toFixed(2)}%
                            </td>
                            <td>{((team.blueWins / team.blueGames) * 100).toFixed(2)}%</td>
                            <td>{((team.redWins / team.redGames) * 100).toFixed(2)}%</td>
                            <td>{team.blueGames + team.redGames}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TeamList;