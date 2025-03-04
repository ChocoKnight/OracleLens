// import React, { useState } from 'react';
import React from 'react';
import { Table } from 'react-bootstrap';
import { Match } from '../../types/Types';
import '../../styles/Search.css';

const MatchList: React.FC<{ matches: Match[] }> = (props) => {
    console.log(props.matches[0]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Game</th>
                        <th>Score</th>
                        <th>Date</th>
                        <th>Patch</th>
                    </tr>
                </thead>
                <tbody>
                    {props.matches.map(match => (
                        <tr key={match.matchId}>
                            <td>
                                <a href={`/Matches/${match.matchId}`}>
                                    {match.teamOneName} vs {match.teamTwoName}
                                </a>
                            </td>
                            <td>{match.teamOneWins} - {match.teamTwoWins}</td>
                            <td>{match.date ? new Date(match.date).toLocaleDateString() : 'N/A'}</td>
                            <td>{match.patch}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default MatchList;