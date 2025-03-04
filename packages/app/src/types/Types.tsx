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
    mostPlayedChampion: string;
}

export interface Champion {
    id: number;
    name: string;
    title: string;
    bluePicked: number;
    redPicked: number;
    blueBanned: number;
    redBanned: number;
    blueWins: number;
    redWins: number;
    averageKills: number;
    averageDeaths: number;
    averageAssists: number;
    averagePre15Kills: number;
    averagePre15Deaths: number;
    averagePre15Assists: number;
}

export interface TeamSideStats {
    id: number;
    wins: number; 
    games: number;
    avgDuration: number;
    firstBloodRate: number;
    firstTowerRate: number;
    avgTowers: number;
    avgTowerPlates: number; 
    avgVoidGrubs: number;
    avgRiftHeralds: number;
    avgBaronNashors: number;
    avgInfernals: number;
    avgMountains: number;
    avgClouds: number;
    avgOceans: number;
    avgHextechs: number;
    avgChemtechs: number;
    avgElders: number;
    featOfStrengthRate: number;
    avgRuinousAtakahn: number;
    avgVoraciousAtakahn: number;
}

export interface PlayerStats {
    teamName: string;
    playerName: string;
    year: string;
    teamId: number;
    playerId: number;
    role: string;
    avgKills: number;
    avgDeaths: number;
    avgAssists: number;
    avgDamageToChampions: number;
    avgWardsPlaced: number;
    avgWardsDestroyed: number;
    avgControlWards: number,
    avgVisionScore: number;
    avgTotalGold: number;
    avgGoldSpent: number;
    avgCreepScore: number;
    avgAt15Kills: number;
    avgAt15Deaths: number;
    avgAt15Assists: number;
    avgAt15TotalGold: number;
}

export interface TeamStats {
    id: number;
    team: string;
    year: number;
    blueSideStats: TeamSideStats;
    redSideStats: TeamSideStats;
    playerStats: PlayerStats[];
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