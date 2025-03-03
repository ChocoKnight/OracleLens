// import React, { useState } from 'react';
import React from 'react';
import { Table } from 'react-bootstrap';
import { Champion } from '../../types/Types';

const ChampionTable: React.FC<{ champions: Champion[] }> = (props) => {
    console.log(props.champions[0]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Blue Picks</th>
                        <th>Red Picks</th>
                        <th>Blue Bans</th>
                        <th>Red Bans</th>
                        <th>Blue Wins</th>
                        <th>Red Wins</th>
                        <th>Kills</th>
                        <th>Deaths</th>
                        <th>Assists</th>
                        <th>Pre15 Kills</th>
                        <th>Pre15 Deaths</th>
                        <th>Pre15 Assists</th>
                    </tr>
                </thead>
                <tbody>
                    {props.champions.map(champion => (
                        <tr key={champion.id}>
                            <td>{champion.name}</td>
                            <td>{champion.title}</td>
                            <td>{champion.bluePicked}</td>
                            <td>{champion.redPicked}</td>
                            <td>{champion.blueBanned}</td>
                            <td>{champion.redBanned}</td>
                            <td>{champion.blueWins}</td>
                            <td>{champion.redWins}</td>
                            <td>{champion.averageKills}</td>
                            <td>{champion.averageDeaths}</td>
                            <td>{champion.averageAssists}</td>
                            <td>{champion.averagePre15Kills}</td>
                            <td>{champion.averagePre15Deaths}</td>
                            <td>{champion.averagePre15Assists}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ChampionTable;