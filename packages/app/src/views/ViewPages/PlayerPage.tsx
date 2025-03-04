import { useParams } from 'react-router-dom';
import TopBar from '../../components/Navbars/TopBar'
import '../../styles/ViewPage.css'

const PlayerPage = () => {
    const { playerId } = useParams();

    return (
        <div>
            <TopBar></TopBar>
            Player Page {playerId}
        </div>
    );
};

export default PlayerPage;
