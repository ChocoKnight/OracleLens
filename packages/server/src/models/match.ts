export interface Match {
    id: number,
    tournament_id: number,
    date: Date,
    team_one: number,
    team_two: number, 
    playoffs: boolean,
    patch: string
}

export interface MatchInfo {
    matchId: number;
    tournamentId: number;
    league: string;
    split: string;
    year: number;
    date: string;
    patch: string;
}

export interface TeamScore {
    teamId: number;
    teamName: string;
    year: number;
    blueWins: number;
    redWins: number;
}

export interface PickBan {
    gameId: number;
    matchId: number;
    gameNumber: number;
    blueTeamName: string;
    redTeamname: string;
    side: string
    ban1: string;
    ban2: string;
    ban3: string;
    ban4: string;
    ban5: string;
    pick1: string;
    pick2: string;
    pick3: string;
    pick4: string;
    pick5: string;
}

export interface Objectives {
    gameId: number;
    matchId: number;
    gameNumber: number;
    blueTeamName: string;
    redTeamname: string;
    side: string
    firstBlood: boolean;
    firstTower: boolean;
    towers: number;
    towerPlates: number;
    voidGrubs: number;
    riftHeralds: number;
    baronNashors: number;
    infernals: number;
    mountains: number;
    clouds: number;
    oceans: number;
    hextechs: number;
    chemtechs: number;
    elders: number;
    featsOfStrength: boolean;
    ruinousAtakhan: number;
    voraciousAtakhan: number;
}

export interface PlayerPerformance {
    gameId: number;
    matchId: number;
    gameNumber: number;
    blueTeamId: number;
    blueTeamName: string;
    redTeamId: number
    redTeamname: string;
    playerId: number;
    playerName: string;
    playerTeam: number;
    role: string;
    champion: string;
    kills: number;
    deaths: number;
    assists: number;
    damageToChampions: number;
    wardsPlaced: number;
    wardsDestroyed: number;
    controlWardsBought: number;
    visionScore: number;
    totalGold: number;
    goldSpent: number;
    creepScore: number;
    killsAt15: number;
    deathsAt15: number;
    assistsAt15: number;
    goldAt15: number;
}

export interface Games {
    pickBans: PickBan[];
    objectives: Objectives[];
    playerPerformances: PlayerPerformance[];
}

export interface MatchSummary {
    matchInfo: MatchInfo;
    teamScores: TeamScore[];
    games: Games
}