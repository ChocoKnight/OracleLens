import { useState, useEffect } from 'react';
import TopBar from '../../components/Navbars/TopBar'
// import BottomBar from '../../components/Navbars/BottomBar'
import SearchYearBar from '../../components/Navbars/SearchYear'
import ContentTable from '../../components/Tables/TournamentTable';
import { Tournament } from '../../types/Types';
import '../../styles/Search.css'

function fetchTournaments(year: number | null): Promise<Response> {
    const url = year ? `http://localhost:3000/api/tournaments?year=${year}` : 'http://localhost:3000/api/tournaments';
    return fetch(url);
}

function Main() {
    const [data, setData] = useState<Tournament[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const handleYearSelection = (year: number | null) => {
        setSelectedYear(year);
    };

    useEffect(() => {
        fetchTournaments(selectedYear)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error('Error fetching data:', error));
    }, [selectedYear]);

    console.log(selectedYear)

    return (
        <div>
            <TopBar></TopBar>
            <h2>
                Tournaments
            </h2>
            <div className="mt-4"> {/* Add space between navbar and content */}
                <SearchYearBar onYearSelect={handleYearSelection}></SearchYearBar>
            </div>
            <div className="mt-4"> {/* Add space between navbar and content */}
                <ContentTable tournaments={data} />
            </div>
            {/* <BottomBar></BottomBar> */}
        </div>
    )
}

export default Main;