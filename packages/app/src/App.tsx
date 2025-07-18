import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/App.css'
import HomePage from './views/HomePage'
import RankingPage from './views/PredictionPages/RankingPage'
import PredictionPage from './views/PredictionPages/PredictionPage'
import TournamentSearchPage from './views/SearchPages/TournamentSearchPage'
import TeamSearchPage from './views/SearchPages/TeamSearchPage'
import PlayerSearchPage from './views/SearchPages/PlayerSearchPage'
import ChampionSearchPage from './views/SearchPages/ChampionSearchPage'
import TournamentPage from './views/ViewPages/TournamentPage';
import MatchPage from './views/ViewPages/MatchPage';
import TeamPage from './views/ViewPages/TeamPage';
import PlayerPage from './views/ViewPages/PlayerPage';
import ChampionPage from './views/ViewPages/ChampionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Tournaments' element={<TournamentSearchPage />} />
        <Route path='/Tournaments/:tournamentId' element={<TournamentPage />} />
        <Route path='/Matches/:matchId' element={<MatchPage />} />
        <Route path='/Teams' element={<TeamSearchPage />} />
        <Route path='/Teams/:teamId' element={<TeamPage />} />
        <Route path='/Players' element={<PlayerSearchPage />} />
        <Route path='/Players/:playerId' element={<PlayerPage />} />
        <Route path='/Champions' element={<ChampionSearchPage />} />
        <Route path='/Champions/:championName' element={<ChampionPage />} />
        <Route path='/Rankings' element={<RankingPage />} />
        <Route path='/Predictions' element={<PredictionPage />} />
      </Routes>
    </Router>
  )
}

export default App
