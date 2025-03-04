// import React, { useState } from 'react';
import React from 'react';
import { Table } from 'react-bootstrap';
import { TournamentStats } from '../../types/Types';
import '../../styles/Search.css';

const TournamentInfo: React.FC<{ tournament: TournamentStats }> = (props) => {
    console.log(props.tournament);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Games Played</th>
                        <th>Average Duration</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    <td>
                        {props.tournament.count}
                    </td>
                    <td>
                        {Math.floor(props.tournament.avgDuration / 60)}:{Math.floor(props.tournament.avgDuration % 60).toString().padStart(2, '0')}
                    </td>
                    <td>{props.tournament.startDate ? new Date(props.tournament.startDate).toLocaleDateString() : 'N/A'}</td>
                    <td>{props.tournament.endDate ? new Date(props.tournament.endDate).toLocaleDateString() : 'N/A'}</td>
                </tbody>
            </Table>
        </div>
    )
}

export default TournamentInfo;