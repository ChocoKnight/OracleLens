import { Team } from '../models/team';

import pool from '../mysql';

const TeamService = {
    async getAll(): Promise<Team[]> {
        const [rows] = await pool.execute('SELECT * FROM teams');
        return rows as Team[];
    },

    async getOneName(teamName: string): Promise<Team | null> {
        const [rows] = await pool.execute('SELECT * FROM teams WHERE name = ?', [teamName]);
        const teams = rows as Team[];
        return teams.length > 0 ? teams[0] : null;
    },

    async getOneId(teamId: number): Promise<Team | null> {
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