import { useParams } from 'react-router-dom';
import TopBar from '../../components/Navbars/TopBar'
import '../../styles/ViewPage.css'

const TeamPage = () => {
    const { teamId } = useParams();

    return (
        <div>
            <TopBar></TopBar>
            Team Page {teamId}
        </div>
    );
};

export default TeamPage;
