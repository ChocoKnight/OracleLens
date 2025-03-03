import { useState, useEffect } from 'react';
import TopBar from '../../components/Navbars/TopBar'
import SearchNameBar from '../../components/Navbars/SearchName'
import SearchYearBar from '../../components/Navbars/SearchYear'
import ContentTable from '../../components/Tables/PlayerTable';
import { Player } from '../../types/Types';
import '../../styles/Search.css'

function fetchPlayers(year: number | null): Promise<Response> {
    const url = year ? `http://localhost:3000/api/players?year=${year}` : 'http://localhost:3000/api/players';
    return fetch(url);
}

function Main() {
    const [data, setData] = useState<Player[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [searchName, setSearchName] = useState(""); // Search for player's name
    const [searchTeam, setSearchTeam] = useState(""); // Search for team name

    useEffect(() => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        fetchPlayers(selectedYear)
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
    }, [selectedYear]);

    // Filter players based on both name and team
    const filteredPlayers = data.filter(player =>
        player.name.toLowerCase().includes(searchName.toLowerCase()) &&
        player.team.toLowerCase().includes(searchTeam.toLowerCase())
    );

    return (
        <div>
            <TopBar />
            <h2>Players</h2>
            <div className="mt-4">
                {/* Search by player name */}
                <SearchNameBar onSubmit={setSearchName} searchLabel={'Name'} />
            </div>
            <div className="mt-4">
                {/* Search by team name */}
                <SearchNameBar onSubmit={setSearchTeam} searchLabel={'Team'} />
            </div>
            <div className="mt-4">
                <SearchYearBar onYearSelect={setSelectedYear} />
            </div>
            <div className="mt-4">
                <ContentTable players={filteredPlayers} />
            </div>
        </div>
    );
}

export default Main;
