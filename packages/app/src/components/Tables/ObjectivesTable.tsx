// import React, { useState } from 'react';
import React from 'react';
import { Table } from 'react-bootstrap';
import { Objectives } from '../../types/Types';
import '../../styles/Search.css'

interface objectiveInfo {
    objectives: Objectives[];
    color: string;
}

const ObjectiveTable: React.FC<objectiveInfo> = (props) => {
    console.log(props.objectives[0]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Towers</th>
                        <th>Tower Plates</th>
                        <th>Void Grubs</th>
                        <th>Rift Heralds</th>
                        <th>Baron Nashors</th>
                        <th>Dragons</th>
                        <th>Atakhan</th>
                        <th>Feats of Strength</th>
                    </tr>
                </thead>
                <tbody>
                    {props.objectives.map(objective => (
                        <tr className={props.color}>
                            <td>{objective.towers}</td>
                            <td>{objective.towerPlates}</td>
                            <td>{objective.voidGrubs}</td>
                            <td>{objective.riftHeralds}</td>
                            <td>{objective.baronNashors}</td>
                            <td>{objective.infernals + objective.mountains
                                + objective.clouds + objective.oceans
                                + objective.hextechs + objective.chemtechs
                                + objective.elders}</td>
                            <td>{objective.ruinousAtakhan + objective.voraciousAtakhan}</td>
                            <td>{objective.featsOfStrength}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ObjectiveTable;