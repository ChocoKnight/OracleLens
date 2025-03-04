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
            <Table className='side-stats'>
                <thead>
                    <tr>
                        <th className='blue'>Blue Side</th>
                        <th></th>
                        <th className='red'>Red Side</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='blue'>{blueSide.wins}</td>
                        <td>Wins</td>
                        <td className='red'>{redSide.wins}</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.games}</td>
                        <td>Games</td>
                        <td className='red'>{redSide.games}</td>
                    </tr>
                    <tr>
                        <td className='blue'>
                            {Math.floor(blueSide.avgDuration / 60)}:{Math.floor(blueSide.avgDuration % 60).toString().padStart(2, '0')}
                        </td>
                        <td>Average Duration</td>
                        <td className='red'>
                            {Math.floor(redSide.avgDuration / 60)}:{Math.floor(redSide.avgDuration % 60).toString().padStart(2, '0')}
                        </td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.featOfStrengthRate}%</td>
                        <td>Feat of Strength</td>
                        <td className='red'>{redSide.featOfStrengthRate}%</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.firstBloodRate}%</td>
                        <td>First Bloods</td>
                        <td className='red'>{redSide.firstBloodRate}%</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.firstTowerRate}%</td>
                        <td>First Towers</td>
                        <td className='red'>{redSide.firstTowerRate}%</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.avgTowers}</td>
                        <td>Towers</td>
                        <td className='red'>{redSide.avgTowers}</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.avgTowerPlates}</td>
                        <td>Tower Plates</td>
                        <td className='red'>{redSide.avgTowerPlates}</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.avgVoidGrubs}</td>
                        <td>Void Grubs</td>
                        <td className='red'>{redSide.avgVoidGrubs}</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.avgRiftHeralds}</td>
                        <td>Rift Heralds</td>
                        <td className='red'>{redSide.avgRiftHeralds}</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.avgBaronNashors}</td>
                        <td>Baron Nashors</td>
                        <td className='red'>{redSide.avgBaronNashors}</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.avgInfernals}</td>
                        <td>Infernal Drakes</td>
                        <td className='red'>{redSide.avgInfernals}</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.avgMountains}</td>
                        <td>Mountain Drakes</td>
                        <td className='red'>{redSide.avgMountains}</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.avgClouds}</td>
                        <td>Cloud Drakes</td>
                        <td className='red'>{redSide.avgClouds}</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.avgOceans}</td>
                        <td>Ocean Drakes</td>
                        <td className='red'>{redSide.avgOceans}</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.avgHextechs}</td>
                        <td>Hextech Drakes</td>
                        <td className='red'>{redSide.avgHextechs}</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.avgChemtechs}</td>
                        <td>Chemtech Drakes</td>
                        <td className='red'>{redSide.avgChemtechs}</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.avgElders}</td>
                        <td>Elder Drakes</td>
                        <td className='red'>{redSide.avgElders}</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.avgRuinousAtakahn}</td>
                        <td>Ruinous Atakahn</td>
                        <td className='red'>{redSide.avgRuinousAtakahn}</td>
                    </tr>
                    <tr>
                        <td className='blue'>{blueSide.avgVoraciousAtakahn}</td>
                        <td>Voracious Atakahn</td>
                        <td className='red'>{redSide.avgVoraciousAtakahn}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default sideStats;