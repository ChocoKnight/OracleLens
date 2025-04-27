import { Game } from '../models/game';

import pool from '../mysql';

const GameService = {
    async getAll(): Promise<Game[]> {
        const [rows] = await pool.execute(`SELECT g.*,
                                            tb.name as blue_team_name,
                                            tr.name as red_team_name
                                            FROM games as g
                                            left join teams as tb
                                            on tb.id = g.blue_team
                                            left join teams as tr
                                            on tr.id = g.red_team;`)
        return rows as Game[];
    },

    async getByMatch(matchId: number): Promise<Game[] | null> {
        const [rows] = await pool.execute(`SELECT g.*,
                                            tb.name as blue_team_name,
                                            tr.name as red_team_name
                                            FROM games as g
                                            left join teams as tb
                                            on tb.id = g.blue_team
                                            left join teams as tr
                                            on tr.id = g.red_team
                                            where g.match_id = ?`, [matchId])
        return rows as Game[];
    },

    async getByMatchGameNumber(matchId: number, gameNumber: number): Promise<Game | null> {
        const [rows] = await pool.execute(`SELECT g.*,
                                            tb.name as blue_team_name,
                                            tr.name as red_team_name
                                            FROM games as g
                                            left join teams as tb
                                            on tb.id = g.blue_team
                                            left join teams as tr
                                            on tr.id = g.red_team
                                            where g.match_id = ? and g.game_number = ?`, [matchId, gameNumber]);
        const games = rows as Game[];
        return games.length > 0 ? games[0] : null;
    },

    async getByGameIDSide(gameId: number, side: string): Promise<Game[] | null> {
        const [rows] = await pool.execute(`select
                                            g.*,
                                            o.*,
                                            pp.*
                                            from games as g
                                            inner join objectives as o on o.game_id = g.id
                                            inner join players as p on g.blue_team = p.team
                                            inner join player_performances as pp on p.id = pp.player_id and g.id = pp.game_id
                                            where g.id = ? and o.side = ?`, [gameId, side]);
        return rows as Game[];
    },

    async getOne(gameId: number): Promise<Game | null> {
        const [rows] = await pool.execute(`SELECT g.*,
                                            tb.name as blue_team_name,
                                            tr.name as red_team_name
                                            FROM games as g
                                            left join teams as tb
                                            on tb.id = g.blue_team
                                            left join teams as tr
                                            on tr.id = g.red_team
                                            where g.id = ?`, [gameId]);
        const games = rows as Game[];
        return games.length > 0 ? games[0] : null;
    },

    async create(game: Game): Promise<Game> {
        const { match_id, game_number, blue_team, red_team, blue_win, duration } = game;
        await pool.execute('INSERT INTO games (match_id, game_number, blue_team, red_team, blue_win, duration) VALUES (?, ?, ?, ?, ?, ?)', [
            match_id, game_number, blue_team, red_team, blue_win, duration
        ]);
        return game;
    },

    async update(gameId: number, game: Game): Promise<Game | null> {
        const { match_id, game_number, blue_team, red_team, blue_win, duration } = game;
        const [result] = await pool.execute('UPDATE games SET match_id = ?, game_number = ?, blue_team = ?, red_team = ?, blue_win = ?, duration = ? WHERE id = ?', [
            match_id, game_number, blue_team, red_team, blue_win, duration, gameId
        ]);
        if ((result as any).affectedRows > 0) return game;
        return null;
    },

    async remove(gameId: number): Promise<boolean> {
        const [result] = await pool.execute('DELETE FROM games WHERE id = ?', [gameId]);
        return (result as any).affectedRows > 0;
    },
}

export default GameService;