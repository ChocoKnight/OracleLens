import { useState, useEffect } from 'react';
import TopBar from '../../components/Navbars/TopBar'
import SearchNameBar from '../../components/Navbars/SearchName'
import SearchYearBar from '../../components/Navbars/SearchYear'
import ContentTable from '../../components/Tables/TeamTable';
import { Team } from '../../types/Types';
import '../../styles/Search.css'

function fetchTeams(year: number | null): Promise<Response> {
    const url = year ? `http://localhost:3000/api/teams?year=${year}` : 'http://localhost:3000/api/teams';
    return fetch(url);
}

function Main() {
    const [data, setData] = useState<Team[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchTeams(selectedYear)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error('Error fetching data:', error));
    }, [selectedYear]);

    const filteredTeams = data.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <TopBar />
            <h2>Teams</h2>
            <div className="mt-4">
                <SearchNameBar onSubmit={setSearchTerm} />
            </div>
            <div className="mt-4">
                <SearchYearBar onYearSelect={setSelectedYear} />
            </div>
            <div className="mt-4">
                <ContentTable teams={filteredTeams} />
            </div>
        </div>
    );
}

export default Main;
