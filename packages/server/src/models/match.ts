export interface Match {
    id: number,
    tournament_id: number,
    date: Date,
    team_one: number,
    team_two: number, 
    playoffs: boolean,
    patch: string
}