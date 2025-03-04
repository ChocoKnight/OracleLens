import { Player, PlayerStats, PlayerChampionPlayed, PlayerSummary } from '../models/player';

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
            p.id AS id, 
            p.name AS name, 
            t.id AS teamId, 
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

    async getOne(id: number): Promise<PlayerSummary | null> {
        const [rows] = await pool.query(`select 
            t.id as teamId, 
            t.name as teamName,
            t.year as year,
            p.id as playerId, 
            p.name as playerName,
            COALESCE(pp.role, 'Unknown') as role,
            ROUND(COALESCE(avg(pp.kills), 0), 2) AS avgKills,
            ROUND(COALESCE(avg(pp.deaths), 0), 2) AS avgDeaths,
            ROUND(COALESCE(avg(pp.assists), 0), 2) AS avgAssists,
            ROUND(COALESCE(avg(pp.damage_to_champions), 0), 2) AS avgDamageToChampions,
            ROUND(COALESCE(avg(pp.wards_placed), 0), 2) AS avgWardsPlaced,
            ROUND(COALESCE(avg(pp.wards_destroyed), 0), 2) AS avgWardsDestroyed,
            ROUND(COALESCE(avg(pp.control_wards_bought), 0), 2) AS avgControlWards,
            ROUND(COALESCE(avg(pp.vision_score), 0), 2) AS avgVisionScore,
            ROUND(COALESCE(avg(pp.total_gold), 0), 2) AS avgTotalGold,
            ROUND(COALESCE(avg(pp.gold_spent), 0), 2) AS avgGoldSpent,
            ROUND(COALESCE(avg(pp.creep_score), 0), 2) AS avgCreepScore,
            ROUND(COALESCE(avg(pp.kills_at_15), 0), 2) AS avgAt15Kills,
            ROUND(COALESCE(avg(pp.deaths_at_15), 0), 2) AS avgAt15Deaths,
            ROUND(COALESCE(avg(pp.assists_at_15), 0), 2) AS avgAt15Assists,
            ROUND(COALESCE(avg(pp.gold_at_15), 0), 2) AS avgAt15TotalGold
            from teams as t
            left join players as p
            on t.id = p.team
            left join player_performances as pp 
            on p.id = pp.player_id
            where p.id = ?
            group by t.id, p.id, pp.role`, [id]);

        const [champsPlayed] = await pool.query(`SELECT 
                p.id AS playerId,
                p.name AS playerName,
                pp.champion AS championName,
                COALESCE(COUNT(pp.champion), 0) AS timesPlayed,
                COALESCE(SUM(CASE WHEN g.blue_team = p.team THEN g.blue_win END), 0) AS blueWins,
                COALESCE(SUM(CASE WHEN g.red_team = p.team AND g.blue_win = 0 THEN 1 ELSE 0 END), 0) AS redWins,
                COALESCE(COUNT(CASE WHEN g.blue_team = p.team THEN g.blue_win END), 0) AS blueGames,
                COALESCE(COUNT(CASE WHEN g.red_team = p.team THEN g.blue_win END), 0) AS redGames
            FROM players AS p
            LEFT JOIN player_performances AS pp
            ON p.id = pp.player_id
            LEFT JOIN games AS g
            ON g.id = pp.game_id
            WHERE p.id = ?
            GROUP BY p.id, p.name, pp.champion
            ORDER BY timesPlayed DESC;`, [id]);

        const players = rows as PlayerStats[];
        const player = players.length > 0 ? players[0] : null;

        if (!player) return null

        const playerSummary: PlayerSummary = {
            playerStats: player,
            mostPlayedChampions: champsPlayed as PlayerChampionPlayed[]
        }

        return playerSummary
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