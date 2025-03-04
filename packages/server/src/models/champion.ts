export interface Champion {
    id: number;
    name: string;
    title: string;
    timesPlayed: number;
    bluePicked: number;
    redPicked: number;
    blueGames: number;
    redGames: number;
    blueBanned: number;
    redBanned: number;
    blueWins: number;
    redWins: number;
    averageKills: number;
    averageDeaths: number;
    averageAssists: number;
    averageDamageToChampions: number;
    averagePre15Kills: number;
    averagePre15Deaths: number;
    averagePre15Assists: number;
    totalGamesPlayed: number;
}