export interface PlayerPerformance {
    game_id: number,
    player_id: number,
    role: string, 
    champion: string, 
    kills: number,
    deaths: number,
    assists: number, 
    damage_to_champions: number,
    wards_placed: number, 
    wards_destroyed: number,
    control_wards_bought: number, 
    vision_score: number, 
    total_gold: number,
    gold_spent: number,
    creep_score: number,
    kills_at_15: number,
    deaths_at_15: number,
    assists_at_15: number,
    gold_at_15: number
}