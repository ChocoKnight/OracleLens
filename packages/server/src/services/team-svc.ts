import { Team } from '../models/team';

import pool from '../mysql';

const TeamService = {
    async getAll(): Promise<Team[]> {
        await pool.query(`create view teamMatchCounts as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join matches as m1
            on t.id = m1.team_one 
            left join matches as m2
            on t.id = m2.team_two
            GROUP BY t.id;`);

        await pool.query(`create view teamBlueGameCounts as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.blue_team 
            GROUP BY t.id;`);

        await pool.query(`create view teamRedGameCounts as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.red_team 
            GROUP BY t.id;`);

        await pool.query(`create view teamBlueGameWins as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.blue_team 
            where g1.blue_win = 1
            GROUP BY t.id;`);

        await pool.query(`create view teamRedGameWins as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.blue_team 
            where g1.blue_win = 0
            GROUP BY t.id;`);

        const [rows] = await pool.query(`SELECT t.*, 
            tmc.count as matches,
            COALESCE(tbgc.count, 0) AS blueGames,
            COALESCE(trgc.count, 0) AS redGames,
            COALESCE(tbgw.count, 0) AS blueWins,
            COALESCE(trgw.count, 0) AS redWins
            FROM teams as t
            left join teamMatchCounts as tmc
            on t.id = tmc.id
            left join teamBlueGameCounts as tbgc
            on t.id = tbgc.id
            left join teamRedGameCounts as trgc
            on t.id = trgc.id
            left join teamBlueGameWins as tbgw
            on t.id = tbgw.id
            left join teamRedGameWins as trgw
            on t.id = trgw.id;`);

        await pool.query(`DROP VIEW teamMatchCounts;`);
        await pool.query(`DROP VIEW teamBlueGameCounts;`);
        await pool.query(`DROP VIEW teamRedGameCounts;`);
        await pool.query(`DROP VIEW teamBlueGameWins;`);
        await pool.query(`DROP VIEW teamRedGameWins;`);

        return rows as Team[];
    },

    async getAllByYear(year: number): Promise<Team[]> {
        await pool.query(`create view teamMatchCounts as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join matches as m1
            on t.id = m1.team_one 
            left join matches as m2
            on t.id = m2.team_two
            GROUP BY t.id;`);

        await pool.query(`create view teamBlueGameCounts as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.blue_team 
            GROUP BY t.id;`);

        await pool.query(`create view teamRedGameCounts as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.red_team 
            GROUP BY t.id;`);

        await pool.query(`create view teamBlueGameWins as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.blue_team 
            where g1.blue_win = 1
            GROUP BY t.id;`);

        await pool.query(`create view teamRedGameWins as 
            select DISTINCT t.id, count(*) as count
            from teams as t
            left join games as g1
            on t.id = g1.blue_team 
            where g1.blue_win = 0
            GROUP BY t.id;`);

        const [rows] = await pool.query(`SELECT t.*, 
            tmc.count as matches,
            COALESCE(tbgc.count, 0) AS blueGames,
            COALESCE(trgc.count, 0) AS redGames,
            COALESCE(tbgw.count, 0) AS blueWins,
            COALESCE(trgw.count, 0) AS redWins
            FROM teams as t
            left join teamMatchCounts as tmc
            on t.id = tmc.id
            left join teamBlueGameCounts as tbgc
            on t.id = tbgc.id
            left join teamRedGameCounts as trgc
            on t.id = trgc.id
            left join teamBlueGameWins as tbgw
            on t.id = tbgw.id
            left join teamRedGameWins as trgw
            on t.id = trgw.id
            where t.year = ?;`, [year]);

        await pool.query(`DROP VIEW teamMatchCounts;`);
        await pool.query(`DROP VIEW teamBlueGameCounts;`);
        await pool.query(`DROP VIEW teamRedGameCounts;`);
        await pool.query(`DROP VIEW teamBlueGameWins;`);
        await pool.query(`DROP VIEW teamRedGameWins;`);

        return rows as Team[];
    },

    async getTeam(teamName: string): Promise<Team[] | null> {
        const [rows] = await pool.execute('SELECT * FROM teams WHERE name = ?', [teamName]);
        return rows as Team[];
    },

    async getOne(teamId: number): Promise<Team | null> {
        const [rows] = await pool.execute('SELECT * FROM teams WHERE id = ?', [teamId]);
        const teams = rows as Team[];
        return teams.length > 0 ? teams[0] : null;
    },

    async create(team: Team): Promise<Team> {
        const { name, year } = team;
        await pool.execute('INSERT INTO teams (name, year) VALUES (?, ?)', [name, year]);
        return team;
    },

    async update(teamId: number, team: Team): Promise<Team | null> {
        const { name, year } = team;
        const [result] = await pool.execute('UPDATE teams SET name = ?, year = ? WHERE id = ?', [name, year, teamId]);

        if ((result as any).affectedRows > 0) return team;
        return null;
    },

    async remove(teamId: number): Promise<boolean> {
        const [result] = await pool.execute('DELETE FROM teams WHERE id = ?', [teamId]);
        return (result as any).affectedRows > 0;
    },
};

export default TeamService;