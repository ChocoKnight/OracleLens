import { useState, useEffect } from 'react';
import TopBar from '../../components/Navbars/TopBar'
// import SearchNameBar from '../../components/Navbars/SearchName'
import ContentTable from '../../components/Tables/ChampionTable';
import { Champion } from '../../types/Types';
import '../../styles/Search.css'

function fetchChampions(): Promise<Response> {
    const url = 'http://localhost:3000/api/champions';
    return fetch(url);
}

function Main() {
    const [data, setData] = useState<Champion[]>([]);
    // const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        fetchChampions()
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
    }, []);

    // const filteredChampions = data.filter(champion =>
    //     champion.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    console.log('test')

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