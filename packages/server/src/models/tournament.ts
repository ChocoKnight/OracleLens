export interface Tournament {
    id: number,
    league: string, 
    year: number,
    split: string
}

export interface Match {
    matchId: number;
    tournamentId: number;
    date: string;
    teamOneId: number;
    teamOneName: string;
    teamOneWins: number;
    teamTwoId: number;
    teamTwoName: string;
    teamTwoWins: number;
    patch: string;
}

export interface TeamName {
    teamId: number;
    teamName: string;
    year : number;
    blueWins: number;
    redWins: number;
    blueGames: number;
    redGames: number;
}

export interface TournamentSummary {
    tournament: Tournament;
    matchList: Match[];
    teams: TeamName[];
}