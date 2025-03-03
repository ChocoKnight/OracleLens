import { useState, useEffect } from 'react';
import TopBar from '../../components/Navbars/TopBar'
// import SearchNameBar from '../../components/Navbars/SearchName'
import ContentTable from '../../components/Tables/ChampionTable';
import { Champion } from '../../types/Types';
import '../../styles/Search.css'

function fetchTeams(): Promise<Response> {
    const url = 'http://localhost:3000/api/champions';
    return fetch(url);
}

function Main() {
    const [data, setData] = useState<Champion[]>([]);
    // const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchTeams()
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // const filteredChampions = data.filter(champion =>
    //     champion.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    return (
        <div>
            <TopBar></TopBar>
            <h2>
                Champion Search Page
            </h2>
            {/* <div className="mt-4">
                <SearchNameBar onSubmit={setSearchTerm} searchLabel={'Champion'} />
            </div> */}
            <div className="mt-4">
                <ContentTable champions={data} />
            </div>
        </div>
    )
}

export default Main;