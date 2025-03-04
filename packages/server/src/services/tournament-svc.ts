import { Tournament, TournamentStats, TournamentSummary, Match, TeamName } from '../models/tournament';

import pool from '../mysql';

const TournamentService = {
    async getAll(): Promise<Tournament[]> {
        await pool.query(`CREATE VIEW tournamentMatchCounts AS 
            SELECT DISTINCT t.id, count(*) as count
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

    async getOne(id: number): Promise<TournamentSummary | null> {
        await pool.query(`create view tournamentGameCounts as 
            select DISTINCT t.id, count(*) as count, avg(g.duration) as avgDuration
            from tournaments as t
            left join matches as m
            on t.id = m.tournament_id 
            left join games as g
            on m.id = g.match_id 
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

        const [rows] = await pool.query(`SELECT t.*, tgc.count, tgc.avgDuration, ts.startDate, te.endDate
            FROM tournaments as t
            left join tournamentGameCounts as tgc
            on t.id = tgc.id
            left join tournamentStart as ts
            on t.id = ts.id
            left join tournamentEnd as te
            on t.id = te.id
            where t.id = ?;`, [id]);

        await pool.query(`DROP VIEW tournamentGameCounts, tournamentStart, tournamentEnd;`);

        await pool.query(`create view matchScores as
            SELECT match_id as matchId, team, SUM(wins) AS wins
            FROM (
                SELECT g.match_id, g.blue_team AS team, SUM(g.blue_win) AS wins
                FROM games AS g
                GROUP BY g.blue_team, g.match_id
                UNION ALL
                SELECT g.match_id, g.red_team AS team, SUM(CASE WHEN g.blue_win = 0 THEN 1 ELSE 0 END) AS wins
                FROM games AS g
                GROUP BY g.red_team, g.match_id
            ) AS combined
            GROUP BY team, match_id;`);

        const [matches] = await pool.query(`SELECT 
                m.id AS matchId,
                t.id AS tournamentId,
                m.date AS date,
                t1.id AS teamOneId,
                t1.name AS teamOneName,
                ms1.wins AS teamOneWins,
                t2.id AS teamTwoId,
                t2.name AS teamTwoName,
                ms2.wins AS teamTwoWins,
                m.patch AS patch
            FROM matches AS m
            LEFT JOIN tournaments AS t 
                ON m.tournament_id = t.id 
            LEFT JOIN teams AS t1
                ON m.team_one = t1.id  
            LEFT JOIN teams AS t2
                ON m.team_two = t2.id
            LEFT JOIN matchScores as ms1
                ON t1.id = ms1.team 
            LEFT JOIN matchScores as ms2
                ON t2.id = ms2.team 
            WHERE t.id = ? and ms1.matchId = m.id and ms2.matchId = m.id;`, [id]);

        await pool.query(`DROP VIEW matchScores;`);

        const [teams] = await pool.query(`SELECT DISTINCT
                team.id AS teamId,
                team.name AS teamName,
                team.year AS year,
                SUM(CASE WHEN g.blue_team = team.id THEN g.blue_win ELSE 0 END) AS blueWins,
                SUM(CASE WHEN g.red_team = team.id AND g.blue_win = 0 THEN 1 ELSE 0 END) AS redWins,
                COUNT(CASE WHEN g.blue_team = team.id THEN 1 END) AS blueGames,
                COUNT(CASE WHEN g.red_team = team.id THEN 1 END) AS redGames
            FROM tournaments AS t
            LEFT JOIN matches AS m 
                ON m.tournament_id = t.id 
            LEFT JOIN games AS g
                ON g.match_id = m.id
            LEFT JOIN teams AS team
                ON team.id IN (m.team_one, m.team_two)
            WHERE t.id = ?
            GROUP BY team.id, team.name, team.year;`, [id]);

        const tournaments = rows as TournamentStats[];
        const tournament = tournaments.length > 0 ? tournaments[0] : null;

        if (!tournament) return null
        const tournamentSummary: TournamentSummary = {
            tournament: tournament,
            matchList: matches as Match[],
            teams: teams as TeamName[]
        };

        return tournamentSummary;
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