import { PickBan } from '../models/pick_ban';

import pool from '../mysql';

const PickBanService = {
    async getAll(): Promise<PickBan[]> {
        const [rows] = await pool.query("SELECT * FROM pick_bans")
        return rows as PickBan[];
    },

    async getByGame(gameId: number): Promise<PickBan[] | null> {
        const [rows] = await pool.query("SELECT * FROM pick_bans where game_id = ?", [gameId])
        return rows as PickBan[];
    },

    async getByGameSide(gameId:number, side: string): Promise<PickBan | null> {
        const [rows] = await pool.query("SELECT * FROM pick_ban where game_id = ? and side = ?", [gameId, side])
        const pickBans = rows as PickBan[];
        return pickBans.length > 0 ? pickBans[0] : null;
    }, 

    async create(pickBan: PickBan): Promise<PickBan> {
        const { game_id, side, ban1, ban2, ban3, ban4, ban5, pick1, pick2, pick3, pick4, pick5 } = pickBan;
        await pool.execute('INSERT INTO pick_ban (game_id, side, ban1, ban2, ban3, ban4, ban5, pick1, pick2, pick3, pick4, pick5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            game_id, side, ban1, ban2, ban3, ban4, ban5, pick1, pick2, pick3, pick4, pick5
        ]);
        return pickBan;
    },

    async update(gameId: number, side: string, pickBan: PickBan): Promise<PickBan | null> {
        const { ban1, ban2, ban3, ban4, ban5, pick1, pick2, pick3, pick4, pick5 } = pickBan;
        const [result] = await pool.execute('UPDATE pick_ban SET ban1 = ?, ban2 = ?, ban3 = ?, ban4 = ?, ban5 = ?, pick1 = ?, pick2 = ?, pick3 = ?, pick4 = ?, pick5 = ? WHERE game_id = ? and side = ?', [
            ban1, ban2, ban3, ban4, ban5, pick1, pick2, pick3, pick4, pick5, gameId, side
        ]);

        if ((result as any).affectedRows > 0) return pickBan;
        return null;
    },

    async remove(gameId: number, side: string): Promise<boolean> {
        const [result] = await pool.execute('DELETE FROM pick_ban WHERE game_id = ? and side = ?', [gameId, side]);
        return (result as any).affectedRows > 0;
    },
}

export default PickBanService;