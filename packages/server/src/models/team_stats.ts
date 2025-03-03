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