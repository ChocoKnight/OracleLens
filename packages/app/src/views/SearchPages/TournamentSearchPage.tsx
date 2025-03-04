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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        fetchTournaments(selectedYear)
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

    console.log(selectedYear)

    console.log('test')

    console.log(data[0])

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