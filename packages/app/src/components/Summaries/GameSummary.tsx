import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Games, PickBan, GameScore, Objectives, PlayerPerformance } from '../../types/Types';
import PickBanTable from '../Tables/PickBanTable';
import PlayerPerformanceTable from '../Tables/PlayerPerformanceTable';
import '../../styles/ViewPage.css'

const GameTabs: React.FC<{ games: Games }> = (props) => {
    // console.log(props);

    const [activeTab, setActiveTab] = useState<number>(1);

    const groupedGames: Record<number, PickBan[]> = props.games.pickBans.reduce(
        (acc: Record<number, PickBan[]>, game) => {
            if (!acc[game.gameNumber]) {
                acc[game.gameNumber] = [];
            }
            acc[game.gameNumber].push(game);
            return acc;
        },
        {} as Record<number, PickBan[]>
    );

    return (
        <div className='content'>
            <div className="tabs">
                {Object.keys(groupedGames).map((gameNumber) => (
                    <button
                        key={gameNumber}
                        className={activeTab === Number(gameNumber) ? "active" : ""}
                        onClick={() => setActiveTab(Number(gameNumber))}
                    >
                        Game {gameNumber}
                    </button>
                ))}
            </div>

            <div className='tav-content'>
                {Object.keys(groupedGames).map((gameNumber) =>
                    activeTab === Number(gameNumber) && (
                        <div key={gameNumber}>
                            <h3>Game {gameNumber}</h3>
                            <PickBanTable pickBans={props.games.pickBans.filter((pickBan) => pickBan.gameNumber === Number(gameNumber))}></PickBanTable>

                            <PlayerPerformanceTable
                                playerPerformances={
                                    props.games.playerPerformances
                                        .filter((playerPerformance) => playerPerformance.gameNumber === Number(gameNumber))
                                        .filter((playerPerformance) =>
                                            playerPerformance.playerTeam === props.games.gameScores.filter((gameScore) => gameScore.gameNumber === Number(gameNumber))[0].blueTeamId)
                                }
                                color={'blue'} 
                            />

                            <PlayerPerformanceTable
                                playerPerformances={
                                    props.games.playerPerformances
                                        .filter((playerPerformance) => playerPerformance.gameNumber === Number(gameNumber))
                                        .filter((playerPerformance) =>
                                            playerPerformance.playerTeam === props.games.gameScores.filter((gameScore) => gameScore.gameNumber === Number(gameNumber))[0].redTeamId)
                                }
                                color={'red'} 
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default GameTabs;