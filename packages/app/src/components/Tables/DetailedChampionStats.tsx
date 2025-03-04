// import React, { useState } from 'react';
import React from 'react';
import { Table } from 'react-bootstrap';
import { Champion } from '../../types/Types';

const ChampionTable: React.FC<{ champion: Champion }> = (props) => {
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Times Played</th>
                        <th>Wins</th>
                        <th>Win Rate</th>
                        <th>Blue Wins</th>
                        <th>Blue Win Rate</th>
                        <th>Blue Win Games Played</th>
                        <th>Red Wins</th>
                        <th>Red Win Rate</th>
                        <th>Red Win Games Played</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={props.champion.id}>
                        <td>{props.champion.timesPlayed}</td>
                        <td>{Number(props.champion.blueWins) + Number(props.champion.redWins)}</td>
                        <td>{(((Number(props.champion.blueWins) + Number(props.champion.redWins)) / (Number(props.champion.blueGames) + Number(props.champion.redGames))) * 100).toFixed(2)}%</td>
                        <td>{props.champion.blueWins}</td>
                        <td>{((Number(props.champion.blueWins) / props.champion.blueGames) * 100).toFixed(2)}%</td>
                        <td>{props.champion.blueGames}</td>
                        <td>{props.champion.redWins}</td>
                        <td>{((Number(props.champion.redWins) / props.champion.redGames) * 100).toFixed(2)}%</td>
                        <td>{props.champion.redGames}</td>
                    </tr>
                </tbody>
            </Table>

            <h3>Stats</h3>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Kills</th>
                        <th>Deaths</th>
                        <th>Assists</th>
                        <th>Damage to Champions</th>
                        <th>Kills at 15</th>
                        <th>Deaths at 15</th>
                        <th>Assists at 15</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={props.champion.id}>
                        <td>{props.champion.averageKills}</td>
                        <td>{props.champion.averageDeaths}</td>
                        <td>{props.champion.averageAssists}</td>
                        <td>{props.champion.averageDamageToChampions}</td>
                        <td>{props.champion.averagePre15Kills}</td>
                        <td>{props.champion.averagePre15Deaths}</td>
                        <td>{props.champion.averagePre15Assists}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default ChampionTable;