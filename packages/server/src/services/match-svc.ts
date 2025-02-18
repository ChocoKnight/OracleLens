import { Match } from '../models/match';

import pool from '../mysql';

const MatchService = {
    async getAll(): Promise<Match[]> {
        const [rows] = await pool.execute('SELECT * FROM matches')
        return rows as Match[];
    },

    async getByTournament(tournamentId: number): Promise<Match[] | null> {
        const [rows] = await pool.execute('SELECT * FROM matches where tournamentId = ?', [tournamentId])
        return rows as Match[];
    },

    async getOne(matchId: number): Promise<Match | null> {
        const [rows] = await pool.execute('SELECT * FROM matches WHERE id = ?', [matchId]);
        const matches = rows as Match[];
        return matches.length > 0 ? matches[0] : null;
    },

    async create(match: Match): Promise<Match> {
        const { tournament_id, date, team_one, team_two, playoffs, patch } = match;
        await pool.execute('INSERT INTO matches (tournament_id, date, team_one, team_two, playoffs, patch) VALUES (?, ?, ?, ?, ?, ?)', [
            tournament_id, date, team_one, team_two, playoffs, patch
        ]);
        return match;
    },

    async update(matchId: number, match: Match): Promise<Match | null> {
        const { tournament_id, date, team_one, team_two, playoffs, patch } = match;
        const [result] = await pool.execute('UPDATE matches SET tournament_id = ?, date = ?, team_one = ?, team_two = ?, playoffs = ?, patch = ? WHERE id = ?', [
            tournament_id, date, team_one, team_two, playoffs, patch, matchId
        ]);
        if ((result as any).affectedRows > 0) return match;
        return null;
    },

    async remove(playerId: number): Promise<boolean> {
        const [result] = await pool.execute('DELETE FROM matches WHERE id = ?', [playerId]);
        return (result as any).affectedRows > 0;
    },
}

export default MatchService;