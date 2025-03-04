import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TopBar from '../../components/Navbars/TopBar'
import TournamentInfo from '../../components/Summaries/TournamentSummary';
import MatchList from '../../components/Tables/MatchList';
import TeamList from '../../components/Tables/TeamList';
import { TournamentSummary } from '../../types/Types';
import '../../styles/ViewPage.css'

function fetchTournament(id: number): Promise<Response> {
    const url = `http://localhost:3000/api/tournaments?id=${id}`;
    return fetch(url);
}

const TournamentPage = () => {
    const { tournamentId } = useParams();
    const [activeTab, setActiveTab] = useState("overview");
    const [data, setData] = useState<TournamentSummary | null>(null);

    useEffect(() => {
        if (!tournamentId) return;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        fetchTournament(Number(tournamentId))
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(json => {
                clearTimeout(timeoutId);
                setData(json);
            })
            .catch(error => {
                if (error.name === "AbortError") {
                    console.warn("Fetch aborted due to timeout");
                } else {
                    console.error('Error fetching data:', error);
                }
            });

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [tournamentId]);

    return (
        <div>
            <TopBar></TopBar>
            {data ? (
                <div>
                    <h2>{data?.tournament.league} {data?.tournament.split} {data?.tournament.year}</h2>
                </div>
            ) : (
                <p>Select Tournament</p>
            )}

            <div className='content'>
                <div className="tabs">
                    <button
                        className={activeTab === "overview" ? "active" : ""}
                        onClick={() => setActiveTab("overview")}
                    >
                        Tournament Summary
                    </button>
                    <button
                        className={activeTab === "matches" ? "active" : ""}
                        onClick={() => setActiveTab("matches")}
                    >
                        Match List
                    </button>
                    <button
                        className={activeTab === "teams" ? "active" : ""}
                        onClick={() => setActiveTab("teams")}
                    >
                        Teams
                    </button>
                </div>

                <div className="tab-content">
                    {data ? (
                        <div>
                            {
                                activeTab === "overview" &&
                                <div>
                                    <TournamentInfo tournament={data.tournament}></TournamentInfo>
                                </div>
                            }
                            {
                                activeTab === "matches" &&
                                <MatchList matches={data.matchList}></MatchList>
                            }
                            {
                                activeTab === "teams" &&
                                <TeamList teams={data.teams}></TeamList>
                            }
                        </div>
                    ) : (
                        <p>Select Tournament</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TournamentPage;
