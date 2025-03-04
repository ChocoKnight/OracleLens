import { useParams } from 'react-router-dom';
import TopBar from '../../components/Navbars/TopBar'
import '../../styles/ViewPage.css'

const MatchPage = () => {
    const { matchId } = useParams();

    return (
        <div>
            <TopBar></TopBar>
            MatchPage Page {matchId}
        </div>
    );
};

export default MatchPage;
