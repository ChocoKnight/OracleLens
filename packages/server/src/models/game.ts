export interface Game {
    id: number, 
    match_id: number, 
    game_number: number,
    blue_team: number,
    red_team: number,
    blue_win: boolean,
    duration: number,
}