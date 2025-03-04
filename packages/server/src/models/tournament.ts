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

export interface TournamentStats {
    id: number;
    league: string;
    year: number;
    split: string;
    count: number;
    avgDuration: number;
    startDate: string;
    endDate: string;
}

export interface TournamentSummary {
    tournament: TournamentStats;
    matchList: Match[];
    teams: TeamName[];
}