import React from 'react';
import { Table } from 'react-bootstrap';
import { TeamSideStats } from '../../types/Types';

interface bothSideStats {
    blueSide: TeamSideStats; 
    redSide: TeamSideStats;
}

const sideStats: React.FC<bothSideStats> = ({ blueSide, redSide }) => {
    return (
        <div>
            <pre>{JSON.stringify(sideStats, null, 2)}</pre>
            <Table className='stats'>
                <thead>
                    <tr>
                        <th className='blue'>Blue Side</th>
                        <th></th>
                        <th className='red'>Red Side</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{blueSide.wins}</td>
                        <td>Wins</td>
                        <td>{redSide.wins}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.games}</td>
                        <td>Games</td>
                        <td>{redSide.games}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgDuration}</td>
                        <td>Average Duration</td>
                        <td>{redSide.avgDuration}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.featOfStrengthRate}%</td>
                        <td>Feat of Strength</td>
                        <td>{redSide.featOfStrengthRate}%</td>
                    </tr>
                    <tr>
                        <td>{blueSide.firstBloodRate}%</td>
                        <td>First Bloods</td>
                        <td>{redSide.firstBloodRate}%</td>
                    </tr>
                    <tr>
                        <td>{blueSide.firstTowerRate}%</td>
                        <td>First Towers</td>
                        <td>{redSide.firstTowerRate}%</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgTowers}</td>
                        <td>Towers</td>
                        <td>{redSide.avgTowers}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgTowerPlates}</td>
                        <td>Tower Plates</td>
                        <td>{redSide.avgTowerPlates}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgVoidGrubs}</td>
                        <td>Void Grubs</td>
                        <td>{redSide.avgVoidGrubs}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgRiftHeralds}</td>
                        <td>Rift Heralds</td>
                        <td>{redSide.avgRiftHeralds}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgBaronNashors}</td>
                        <td>Baron Nashors</td>
                        <td>{redSide.avgBaronNashors}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgInfernals}</td>
                        <td>Infernal Drakes</td>
                        <td>{redSide.avgInfernals}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgMountains}</td>
                        <td>Mountain Drakes</td>
                        <td>{redSide.avgMountains}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgClouds}</td>
                        <td>Cloud Drakes</td>
                        <td>{redSide.avgClouds}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgOceans}</td>
                        <td>Ocean Drakes</td>
                        <td>{redSide.avgOceans}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgHextechs}</td>
                        <td>Hextech Drakes</td>
                        <td>{redSide.avgHextechs}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgChemtechs}</td>
                        <td>Chemtech Drakes</td>
                        <td>{redSide.avgChemtechs}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgElders}</td>
                        <td>Elder Drakes</td>
                        <td>{redSide.avgElders}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgRuinousAtakahn}</td>
                        <td>Ruinous Atakahn</td>
                        <td>{redSide.avgRuinousAtakahn}</td>
                    </tr>
                    <tr>
                        <td>{blueSide.avgVoraciousAtakahn}</td>
                        <td>Voracious Atakahn</td>
                        <td>{redSide.avgVoraciousAtakahn}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default sideStats;