import { Player } from '../models/player';

import pool from '../mysql';

const PlayerService = {
    async getAll(): Promise<Player[]> {
        await pool.query(`CREATE VIEW gamesPlayed AS
            SELECT pp.player_id AS id, COUNT(*) AS count
            FROM player_performances AS pp
            GROUP BY pp.player_id;`);

        await pool.query(`CREATE VIEW playerRoles AS
            SELECT pp.player_id AS id, pp.role, COUNT(*) AS count
            FROM player_performances AS pp
            GROUP BY pp.player_id, pp.role;`);

        await pool.query(`CREATE VIEW mostPlayedChampion AS
            SELECT pp.player_id AS id, pp.champion, COUNT(*) AS count
            FROM player_performances AS pp
            GROUP BY pp.player_id, pp.champion;`);

        const [rows] = await pool.query(`SELECT 
            p.id AS player_id, 
            p.name AS name, 
            t.id AS team_id, 
            t.name AS team, 
            t.year AS year,
            COALESCE(gp.count, 0) AS gamesPlayed,
            COALESCE(pr.role, 'Unknown') AS role,
            COALESCE(pc.champion, 'None') AS mostPlayedChampion
        FROM players AS p
        LEFT JOIN teams AS t 
            ON t.id = p.team
        LEFT JOIN gamesPlayed AS gp
            ON p.id = gp.id
        LEFT JOIN playerRoles AS pr
            ON p.id = pr.id
        LEFT JOIN (
            SELECT id, champion
            FROM mostPlayedChampion
            WHERE (id, count) IN (
                SELECT id, MAX(count)
                FROM mostPlayedChampion
                GROUP BY id
            )
        ) AS pc
            ON p.id = pc.id`);

        await pool.query(`DROP VIEW gamesPlayed, playerRoles, mostPlayedChampion;`);

        return rows as Player[];
    },

    async getAllByYear(year: number): Promise<Player[]> {
        await pool.query(`CREATE VIEW gamesPlayed AS
            SELECT pp.player_id AS id, COUNT(*) AS count
            FROM player_performances AS pp
            GROUP BY pp.player_id;`);

        await pool.query(`CREATE VIEW playerRoles AS
            SELECT pp.player_id AS id, pp.role, COUNT(*) AS count
            FROM player_performances AS pp
            GROUP BY pp.player_id, pp.role;`);

        await pool.query(`CREATE VIEW mostPlayedChampion AS
            SELECT pp.player_id AS id, pp.champion, COUNT(*) AS count
            FROM player_performances AS pp
            GROUP BY pp.player_id, pp.champion;`);

        const [rows] = await pool.query(`SELECT 
            p.id AS player_id, 
            p.name AS name, 
            t.id AS team_id, 
            t.name AS team, 
            t.year AS year,
            COALESCE(gp.count, 0) AS gamesPlayed,
            COALESCE(pr.role, 'Unknown') AS role,
            COALESCE(pc.champion, 'None') AS mostPlayedChampion
        FROM players AS p
        LEFT JOIN teams AS t 
            ON t.id = p.team
        LEFT JOIN gamesPlayed AS gp
            ON p.id = gp.id
        LEFT JOIN playerRoles AS pr
            ON p.id = pr.id
        LEFT JOIN (
            SELECT id, champion
            FROM mostPlayedChampion
            WHERE (id, count) IN (
                SELECT id, MAX(count)
                FROM mostPlayedChampion
                GROUP BY id
            )
        ) AS pc
            ON p.id = pc.id
            where t.year = ?`, [year]);

        await pool.query(`DROP VIEW gamesPlayed, playerRoles, mostPlayedChampion;`);

        return rows as Player[];
    },

    async getPlayer(playerName: string): Promise<Player[] | null> {
        const [rows] = await pool.execute('select p.id as player_id, p.name as name, t.id as team_id, t.name as team_name, t.year as year from players as p left join teams as t on t.id = p.team where p.name = ?', [playerName])
        return rows as Player[];
    },

    async getOne(playerId: number): Promise<Player | null> {
        const [rows] = await pool.execute('select p.id as player_id, p.name as name, t.id as team_id, t.name as team_name, t.year as year from players as p left join teams as t on t.id = p.team where p.id = ?', [playerId]);
        const players = rows as Player[];
        return players.length > 0 ? players[0] : null;
    },

    async create(player: Player): Promise<Player> {
        const { name, team } = player;
        await pool.execute('INSERT INTO players (name, team) VALUES (?, ?)', [name, team]);
        return player;
    },

    async update(playerId: number, player: Player): Promise<Player | null> {
        const { name, team } = player;
        const [result] = await pool.execute('UPDATE teams SET name = ?, year = ? WHERE id = ?', [name, team, playerId]);

        if ((result as any).affectedRows > 0) return player;
        return null;
    },

    async remove(playerId: number): Promise<boolean> {
        const [result] = await pool.execute('DELETE FROM players WHERE id = ?', [playerId]);
        return (result as any).affectedRows > 0;
    },
};

export default PlayerService;