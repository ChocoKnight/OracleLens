import React from 'react';
import { Table } from 'react-bootstrap';
import { Tournament } from '../../types/Types';

const TournamentTable: React.FC<{ tournaments: Tournament[] }> = (props) => {
    console.log(props.tournaments[0]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Number of Matches</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tournaments.map(tournament => (
                        <tr key={tournament.id}>
                            <td>
                                <a href={`/Tournaments/${tournament.id}`}>
                                    {tournament.league} {tournament.split !== 'N/A' ? tournament.split : ''}
                                </a>
                            </td>
                            <td>{tournament.year}</td>
                            <td>{tournament.count}</td>
                            <td>{tournament.startDate ? new Date(tournament.startDate).toLocaleDateString() : 'N/A'}</td>
                            <td>{tournament.endDate ? new Date(tournament.endDate).toLocaleDateString() : 'N/A'}</td>
                        </tr>

                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TournamentTable;