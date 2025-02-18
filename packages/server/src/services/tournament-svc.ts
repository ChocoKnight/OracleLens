import { Tournament } from '../models/tournament';

import pool from '../mysql';

const TournamentService = {
    async getAll(): Promise<Tournament[]> {
        const [rows] = await pool.query("SELECT * FROM tournaments")
        return rows as Tournament[];
    },

    async getTournament(league: string): Promise<Tournament[] | null> {
        const [rows] = await pool.execute('SELECT * FROM tournaments where league = ?', [league])
        return rows as Tournament[];
    }, 

    async getOne(tournamentId: number): Promise<Tournament | null> {
        const [rows] = await pool.execute('SELECT * FROM tournaments WHERE id = ?', [tournamentId]);
        const tournaments = rows as Tournament[];
        return tournaments.length > 0 ? tournaments[0] : null;
    },

    async create(tournament: Tournament): Promise<Tournament> {
        const { league, year, split } = tournament;
        await pool.execute('INSERT INTO tournaments (league, year, split) VALUES (?, ?, ?)', [league, year, split]);
        return tournament;
    },

    async update(tournamentId: number, tournament: Tournament): Promise<Tournament | null> {
        const { league, year, split } = tournament;
        const [result] = await pool.execute('UPDATE tournaments SET league = ?, year = ?, split = ? WHERE id = ?', [league, year, split, tournamentId]);

        if ((result as any).affectedRows > 0) return tournament;
        return null;
    },

    async remove(tournamentId: number): Promise<boolean> {
        const [result] = await pool.execute('DELETE FROM tournaments WHERE id = ?', [tournamentId]);
        return (result as any).affectedRows > 0;
    },
}

export default TournamentService;