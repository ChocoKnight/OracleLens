export interface Tournament {
    id: number;
    league: string;
    year: number;
    split: string;
    count: number;
    startDate: string;
    endDate: string;
}

export interface Team {
    id: number;
    name: string;
    year: number;
    matches: number;
    blueGames: number;
    redGames: number;
    blueWins: number;
    redWins: number;
}

export interface Player {
    id: number;
    name: string;
    year: number;
    team: string;
    role: string;
    gamesPlayed: number;
}