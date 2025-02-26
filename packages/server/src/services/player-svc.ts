import { Player } from '../models/player';

import pool from '../mysql';

const PlayerService = {
    async getAll(): Promise<Player[]> {
        const [rows] = await pool.query("select p.id as player_id, p.name as name, t.id as team_id, t.name as team_name, t.year as year from players as p left join teams as t on t.id = p.team;")
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