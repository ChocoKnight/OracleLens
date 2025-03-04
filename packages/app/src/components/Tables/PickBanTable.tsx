// import React, { useState } from 'react';
import React from 'react';
import { Table } from 'react-bootstrap';
import { PickBan } from '../../types/Types';
import '../../styles/Search.css'

const PickBanTable: React.FC<{ pickBans: PickBan[] }> = (props) => {
    console.log(props.pickBans[0]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Side</th>
                        <th>Ban 1</th>
                        <th>Ban 2</th>
                        <th>Ban 3</th>
                        <th>Pick 1</th>
                        <th>Pick 2</th>
                        <th>Pick 3</th>
                        <th>Ban 4</th>
                        <th>Ban 5</th>
                        <th>Pick 4</th>
                        <th>Pick 5</th>
                    </tr>
                </thead>
                <tbody>
                    {props.pickBans.map(pickBans => (
                        <tr className={pickBans.side === "Blue" ? "blue" : "red"}>
                            <td>{pickBans.side}</td>
                            <td>
                                <a href={`/Champions/${pickBans.ban1}`}>
                                    {pickBans.ban1}
                                </a>
                            </td>
                            <td>
                                <a href={`/Champions/${pickBans.ban2}`}>
                                    {pickBans.ban2}
                                </a>
                            </td>
                            <td>
                                <a href={`/Champions/${pickBans.ban3}`}>
                                    {pickBans.ban3}
                                </a>
                            </td>
                            <td>
                                <a href={`/Champions/${pickBans.pick1}`}>
                                    {pickBans.pick1}
                                </a>
                            </td>
                            <td>
                                <a href={`/Champions/${pickBans.pick2}`}>
                                    {pickBans.pick2}
                                </a>
                            </td>
                            <td>
                                <a href={`/Champions/${pickBans.pick3}`}>
                                    {pickBans.pick3}
                                </a>
                            </td>
                            <td>
                                <a href={`/Champions/${pickBans.ban4}`}>
                                    {pickBans.ban4}
                                </a>
                            </td>
                            <td>
                                <a href={`/Champions/${pickBans.ban5}`}>
                                    {pickBans.ban5}
                                </a>
                            </td>
                            <td>
                                <a href={`/Champions/${pickBans.pick4}`}>
                                    {pickBans.pick4}
                                </a>
                            </td>
                            <td>
                                <a href={`/Champions/${pickBans.pick5}`}>
                                    {pickBans.pick5}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default PickBanTable;