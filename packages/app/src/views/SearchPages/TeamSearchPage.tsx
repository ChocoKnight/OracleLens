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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        fetchTeams(selectedYear)
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

    console.log('test')

    console.log(data[0])

    const filteredTeams = data.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <TopBar />
            <h2>Teams</h2>
            <div className="mt-4">
                <SearchNameBar onSubmit={setSearchTerm} searchLabel={'Team Name'} />
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
