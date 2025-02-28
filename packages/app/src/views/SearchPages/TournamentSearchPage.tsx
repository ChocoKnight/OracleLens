import { useState, useEffect } from 'react';
import TopBar from '../../components/Navbars/TopBar'
import BottomBar from '../../components/Navbars/BottomBar'
import ContentTable from '../../components/Tables/TournamentTable';
import { Tournament } from '../../types/Types';
import '../../styles/Search.css'

function fetchTournaments() {
    return fetch('http://localhost:3000/api/tournaments')
}

function Main() {
    const [data, setData] = useState<Tournament[]>([]);

    useEffect(() => {
        fetchTournaments()
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <TopBar></TopBar>
            <h2>
                Tournament Search Page
            </h2>
            <ContentTable tournaments={data}></ContentTable>
            <BottomBar></BottomBar>
        </div>
    )
}

export default Main;