export interface Player {
    id: number, 
    name: string, 
    team: number
}

export interface PlayerChampionPlayed {
    playerId: number;
    playerName: string;
    championName: string;
    timesPlayed: number;
    blueWins: number;
    redWins: number;
    blueGames: number;
    redGames: number;
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

export interface PlayerSummary {
    playerStats: PlayerStats;
    mostPlayedChampions: PlayerChampionPlayed[];
}