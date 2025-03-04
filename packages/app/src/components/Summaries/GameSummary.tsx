import React, { useState } from 'react';
import { Games, PickBan, } from '../../types/Types';
import PickBanTable from '../Tables/PickBanTable';
import ObjectiveTable from '../Tables/ObjectivesTable';
import PlayerPerformanceTable from '../Tables/PlayerPerformanceTable';
import '../../styles/ViewPage.css'

const GameTabs: React.FC<{ games: Games }> = (props) => {

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

            <div className='tab-content'>
                {Object.keys(groupedGames).map((gameNumber) =>
                    activeTab === Number(gameNumber) && (
                        <div key={gameNumber}>
                            <h3>Game {gameNumber}</h3>

                            <div className='side-split'>
                                <div>
                                    <h4>Blue Team</h4>
                                    <h4>
                                        <a href={`/Teams/${props.games.gameScores.filter((gameScore) => gameScore.gameNumber === Number(gameNumber))[0].blueTeamId}`}>
                                            {props.games.gameScores.filter((gameScore) => gameScore.gameNumber === Number(gameNumber))[0].blueTeamName}
                                        </a>
                                    </h4>
                                </div>

                                <h4>
                                    {props.games.gameScores.filter((gameScore) => gameScore.gameNumber === Number(gameNumber))[0].blueWin === 1
                                        ? "W - L"
                                        : "L - W"}
                                </h4>

                                <div>
                                    <h4>Red Team</h4>
                                    <h4>
                                        <a href={`/Teams/${props.games.gameScores.filter((gameScore) => gameScore.gameNumber === Number(gameNumber))[0].redTeamId}`}>
                                            {props.games.gameScores.filter((gameScore) => gameScore.gameNumber === Number(gameNumber))[0].redTeamName}
                                        </a>
                                    </h4>
                                </div>
                            </div>

                            <h4>Pick Bans</h4>

                            <PickBanTable pickBans={props.games.pickBans.filter((pickBan) => pickBan.gameNumber === Number(gameNumber))}></PickBanTable>

                            <h4>Objectives</h4>

                            <div className='side-split'>
                                <div className='side-info'>
                                    <ObjectiveTable
                                        objectives={props.games.objectives
                                            .filter((objective) => objective.gameNumber === Number(gameNumber))
                                            .filter((objective) => objective.side === 'Blue')
                                        }
                                        color={'blue'}
                                    />
                                </div>

                                <div className='side-info'>
                                    <ObjectiveTable
                                        objectives={props.games.objectives
                                            .filter((objective) => objective.gameNumber === Number(gameNumber))
                                            .filter((objective) => objective.side === 'Red')
                                        }
                                        color={'red'}
                                    />


                                </div>
                            </div>

                            <h4>Player Performances</h4>

                            <div className='side-split'>
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
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default GameTabs;