import { Player } from '../models/player';

import pool from '../mysql';

const PlayerService = {
    async getAll(): Promise<Player[]> {
        const [rows] = await pool.query("SELECT * FROM players")
        return rows as Player[];
    },

    async getPlayer(playerName: string): Promise<Player[] | null> {
        const [rows] = await pool.execute('SELECT * FROM players where name = ?', [playerName])
        return rows as Player[];
    }, 

    async getOne(playerId: number): Promise<Player | null> {
        const [rows] = await pool.execute('SELECT * FROM players WHERE id = ?', [playerId]);
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