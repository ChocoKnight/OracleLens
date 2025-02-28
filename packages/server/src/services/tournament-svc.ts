import { Tournament } from '../models/tournament';

import pool from '../mysql';

const TournamentService = {
    async getAll(): Promise<Tournament[]> {
        await pool.query(`CREATE VIEW tournamentMatchCounts AS 
            SELECT DISTINCT t.id, COUNT(*) AS count
            FROM tournaments AS t
            LEFT JOIN matches AS m ON t.id = m.tournament_id
            GROUP BY t.id, t.league, t.year, t.split;`);
    
        await pool.query(`CREATE VIEW tournamentStart AS 
            SELECT DISTINCT t.id, MIN(m.date) AS startDate
            FROM tournaments AS t
            LEFT JOIN matches AS m ON t.id = m.tournament_id
            GROUP BY t.id;`);
    
        await pool.query(`CREATE VIEW tournamentEnd AS 
            SELECT DISTINCT t.id, MAX(m.date) AS endDate
            FROM tournaments AS t
            LEFT JOIN matches AS m ON t.id = m.tournament_id
            GROUP BY t.id;`);
    
        const [rows] = await pool.query(`SELECT t.*, tmc.count, ts.startDate, te.endDate
            FROM tournaments AS t
            LEFT JOIN tournamentMatchCounts AS tmc ON t.id = tmc.id
            LEFT JOIN tournamentStart AS ts ON t.id = ts.id
            LEFT JOIN tournamentEnd AS te ON t.id = te.id;`);
    
        await pool.query(`DROP VIEW tournamentMatchCounts;`);
        await pool.query(`DROP VIEW tournamentStart;`);
        await pool.query(`DROP VIEW tournamentEnd;`);
    
        return rows as Tournament[];
    },

    async getAllForYear(year: number): Promise<Tournament[]> {
        await pool.query(`CREATE VIEW tournamentMatchCounts AS 
            SELECT DISTINCT t.id, COUNT(*) AS count
            FROM tournaments AS t
            LEFT JOIN matches AS m ON t.id = m.tournament_id
            GROUP BY t.id, t.league, t.year, t.split;`);
    
        await pool.query(`CREATE VIEW tournamentStart AS 
            SELECT DISTINCT t.id, MIN(m.date) AS startDate
            FROM tournaments AS t
            LEFT JOIN matches AS m ON t.id = m.tournament_id
            GROUP BY t.id;`);
    
        await pool.query(`CREATE VIEW tournamentEnd AS 
            SELECT DISTINCT t.id, MAX(m.date) AS endDate
            FROM tournaments AS t
            LEFT JOIN matches AS m ON t.id = m.tournament_id
            GROUP BY t.id;`);
    
        const [rows] = await pool.query(`SELECT t.*, tmc.count, ts.startDate, te.endDate
            FROM tournaments AS t
            LEFT JOIN tournamentMatchCounts AS tmc ON t.id = tmc.id
            LEFT JOIN tournamentStart AS ts ON t.id = ts.id
            LEFT JOIN tournamentEnd AS te ON t.id = te.id
            WHERE t.year = ?;`, [year]);
    
        await pool.query(`DROP VIEW tournamentMatchCounts;`);
        await pool.query(`DROP VIEW tournamentStart;`);
        await pool.query(`DROP VIEW tournamentEnd;`);
    
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