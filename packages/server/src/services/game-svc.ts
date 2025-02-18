import { Game } from '../models/game';

import pool from '../mysql';

const GameService = {
    async getAll(): Promise<Game[]> {
        const [rows] = await pool.execute('SELECT * FROM games')
        return rows as Game[];
    },

    async getByMatch(matchId: number): Promise<Game[] | null> {
        const [rows] = await pool.execute('SELECT * FROM games where match_id = ?', [matchId])
        return rows as Game[];
    },

    async getByMatchGameNumber(matchId: number, gameNumber: number): Promise<Game | null> {
        const [rows] = await pool.execute('SELECT * FROM games WHERE match_id = ? and game_number = ?', [matchId, gameNumber]);
        const games = rows as Game[];
        return games.length > 0 ? games[0] : null;
    },

    async getOne(gameId: number): Promise<Game | null> {
        const [rows] = await pool.execute('SELECT * FROM games WHERE id = ?', [gameId]);
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