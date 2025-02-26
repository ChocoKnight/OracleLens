import { Match } from '../models/match';

import pool from '../mysql';

const MatchService = {
    async getAll(): Promise<Match[]> {
        const [rows] = await pool.execute(`
            select m.id as id,
            t.id as tournament_id,
            t.league as tournament,
            t.split as split,
            m.date as date,
            t1.id as team_one_id,
            t1.name as team_one_name,
            t2.id as team_two_id,
            t2.name as team_two_name,
            m.playoffs as playoffs,
            m.patch as patch
            from matches as m
            left join tournaments as t
            on t.id = m.tournament_id 
            left join teams as t1
            on t1.id = m.team_one
            left join teams as t2
            on t2.id = m.team_two`)
        return rows as Match[];
    },

    async getByTournament(tournamentId: number): Promise<Match[] | null> {
        const [rows] = await pool.execute(`
            select m.id as id,
            t.id as tournament_id,
            t.league as tournament,
            t.split as split,
            m.date as date,
            t1.id as team_one_id,
            t1.name as team_one_name,
            t2.id as team_two_id,
            t2.name as team_two_name,
            m.playoffs as playoffs,
            m.patch as patch
            from matches as m
            left join tournaments as t
            on t.id = m.tournament_id 
            left join teams as t1
            on t1.id = m.team_one
            left join teams as t2
            on t2.id = m.team_two 
            where m.tournamentId = ?`, [tournamentId])
        return rows as Match[];
    },

    async getOne(matchId: number): Promise<Match | null> {
        const [rows] = await pool.execute(`
            select m.id as id,
            t.id as tournament_id,
            t.league as tournament,
            t.split as split,
            m.date as date,
            t1.id as team_one_id,
            t1.name as team_one_name,
            t2.id as team_two_id,
            t2.name as team_two_name,
            m.playoffs as playoffs,
            m.patch as patch
            from matches as m
            left join tournaments as t
            on t.id = m.tournament_id 
            left join teams as t1
            on t1.id = m.team_one
            left join teams as t2
            on t2.id = m.team_two 
            where m.id = ?`, [matchId]);
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

    async remove(matchId: number): Promise<boolean> {
        const [result] = await pool.execute('DELETE FROM matches WHERE id = ?', [matchId]);
        return (result as any).affectedRows > 0;
    },
}

export default MatchService;