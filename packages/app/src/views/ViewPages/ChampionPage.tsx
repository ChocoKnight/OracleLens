import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TopBar from '../../components/Navbars/TopBar'
import ContentTable from '../../components/Tables/DetailedChampionStats';
import { Champion } from '../../types/Types';
import '../../styles/ViewPage.css'

function fetchChampion(name: string): Promise<Response> {
    const url = `http://localhost:3000/api/champions?name=${name}`;
    return fetch(url);
}

const ChampionPage = () => {
    const { championName } = useParams();
    const [data, setData] = useState<Champion | null>(null);

    useEffect(() => {
        if (!championName) return;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        fetchChampion(championName)
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
    }, [championName]);

    return (
        <div>
            <TopBar></TopBar>
            {/* Champion Page {championName} */}
            {data ? (
                <div>
                    <h2>{data.name}</h2>
                    <h4>{data.title}</h4>
                    <div className='side-split'>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.name}_0.jpg`}></img>
                        <ContentTable champion={data} />
                    </div>
                </div>
            ) : (
                <p>Select Champion</p>
            )}

        </div>
    );
};

export default ChampionPage;
