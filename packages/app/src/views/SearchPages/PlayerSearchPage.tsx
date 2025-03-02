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
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchPlayers(selectedYear)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error('Error fetching data:', error));
    }, [selectedYear]);

    const filteredPlayers = data.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div>
            <TopBar></TopBar>
            <h2>
                Players
            </h2>
            <div className="mt-4">
                <SearchNameBar onSubmit={setSearchTerm} />
            </div>
            <div className="mt-4">
                <SearchYearBar onYearSelect={setSelectedYear} />
            </div>
            <div className="mt-4">
                <ContentTable players={filteredPlayers} />
            </div>
        </div>
    )
}

export default Main;