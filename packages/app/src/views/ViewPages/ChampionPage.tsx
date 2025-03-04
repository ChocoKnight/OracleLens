import { useParams } from 'react-router-dom';
import TopBar from '../../components/Navbars/TopBar'
import '../../styles/ViewPage.css'

const ChampionPage = () => {
    const { championName } = useParams();

    return (
        <div>
            <TopBar></TopBar>
            Champion Page {championName}
        </div>
    );
};

export default ChampionPage;
