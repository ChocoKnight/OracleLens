import { PlayerPerformance } from '../models/player_performance';

import pool from '../mysql';

const PlayerPerformanceService = {
    async getAll(): Promise<PlayerPerformance[]> {
        const [rows] = await pool.query(`SELECT 
                                        p.name as player_name,
                                        pp.*
                                        FROM player_performances as pp
                                        left join players as p
                                        on pp.player_id = p.id;`)
        return rows as PlayerPerformance[];
    },

    async getByGame(gameId: number): Promise<PlayerPerformance[] | null> {
        const [rows] = await pool.query(`SELECT 
                                        p.name as player_name,
                                        pp.*
                                        FROM player_performances as pp
                                        left join players as p
                                        on pp.player_id = p.id
                                        where pp.game_id = ?`, [gameId])
        return rows as PlayerPerformance[];
    },

    async getByGameSide(gameId: number, side: string): Promise<PlayerPerformance[] | null> {
        if (side === 'Blue') {
            const [rows] = await pool.query(`select pp.*
                from games as g
                inner join players as p on g.blue_team = p.team
                inner join player_performances as pp on p.id = pp.player_id and g.id = pp.game_id
                where g.id = ?;`, [gameId])

            return rows as PlayerPerformance[];
        } else {
            const [rows] = await pool.query(`select pp.*
                from games as g
                inner join players as p on g.red_team = p.team
                inner join player_performances as pp on p.id = pp.player_id and g.id = pp.game_id
                where g.id = ?;`, [gameId])

            return rows as PlayerPerformance[];
        }
    },

    async getByPlayer(playerId: number): Promise<PlayerPerformance[] | null> {
        const [rows] = await pool.query(`SELECT 
                                        p.name as player_name,
                                        pp.*
                                        FROM player_performances as pp
                                        left join players as p
                                        on pp.player_id = p.id
                                        where pp.player_id = ?`, [playerId])
        return rows as PlayerPerformance[];
    },

    async getByGamePlayer(gameId: number, playerId: number): Promise<PlayerPerformance | null> {
        const [rows] = await pool.query(`SELECT 
                                        p.name as player_name,
                                        pp.*
                                        FROM player_performances as pp
                                        left join players as p
                                        on pp.player_id = p.id
                                        where pp.game_id = ?
                                        and pp.player_id = ?`, [gameId, playerId])
        const playerPerformance = rows as PlayerPerformance[];
        return playerPerformance.length > 0 ? playerPerformance[0] : null;
    },

    async create(playerPerformance: PlayerPerformance): Promise<PlayerPerformance> {
        const { game_id, player_id, role, champion, kills, deaths, assists, damage_to_champions,
            wards_placed, wards_destroyed, control_wards_bought, vision_score, total_gold, gold_spent,
            creep_score, kills_at_15, deaths_at_15, assists_at_15, gold_at_15 } = playerPerformance;
        await pool.execute('INSERT INTO player_performances (game_id, player_id, role, champion, kills, deaths, assists, damage_to_champions, wards_placed, wards_destroyed, control_wards_bought, vision_score, total_gold, gold_spent, creep_score, kills_at_15, deaths_at_15, assists_at_15, gold_at_15) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            game_id, player_id, role, champion, kills, deaths, assists, damage_to_champions,
            wards_placed, wards_destroyed, control_wards_bought, vision_score, total_gold, gold_spent,
            creep_score, kills_at_15, deaths_at_15, assists_at_15, gold_at_15
        ]);
        return playerPerformance;
    },

    async update(gameId: number, playerId: number, playerPerformance: PlayerPerformance): Promise<PlayerPerformance | null> {
        const { role, champion, kills, deaths, assists, damage_to_champions,
            wards_placed, wards_destroyed, control_wards_bought, vision_score, total_gold, gold_spent,
            creep_score, kills_at_15, deaths_at_15, assists_at_15, gold_at_15 } = playerPerformance;
        const [result] = await pool.execute('UPDATE player_performances SET role = ?, champion = ?, kills = ?, deaths = ?, assists = ?, damage_to_champions = ?, wards_placed = ?, wards_destroyed = ?, control_wards_bought = ?, vision_score = ?, total_gold = ?, gold_spent = ?, creep_score = ?, kills_at_15 = ?, deaths_at_15 = ?, assists_at_15 = ?, gold_at_15 = ? WHERE game_id = ? and player_id = ?', [
            role, champion, kills, deaths, assists, damage_to_champions,
            wards_placed, wards_destroyed, control_wards_bought, vision_score, total_gold, gold_spent,
            creep_score, kills_at_15, deaths_at_15, assists_at_15, gold_at_15, gameId, playerId
        ]);

        if ((result as any).affectedRows > 0) return playerPerformance;
        return null;
    },

    async remove(gameId: number, playerId: number): Promise<boolean> {
        const [result] = await pool.execute('DELETE FROM player_performances WHERE game_id = ? and player_id = ?', [gameId, playerId]);
        return (result as any).affectedRows > 0;
    },
}

export default PlayerPerformanceService;