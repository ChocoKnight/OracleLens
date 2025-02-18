import { Champion } from '../models/champion';

import pool from '../mysql';

const ChampionService = {
    async getAll(): Promise<Champion[]> {
        const [rows] = await pool.query("SELECT * FROM champion");
        return rows as Champion[];
    },

    async getOne(championName: string): Promise<Champion | null> {
        const [rows] = await pool.query("SELECT * FROM champion WHERE champion_name = ?", [championName]);
        const champions = rows as Champion[];
        return champions.length > 0 ? champions[0] : null;
    },

    async create(champion: Champion): Promise<Champion> {
        const { champion_name, champion_id, champion_title } = champion;
        await pool.query(
            "INSERT INTO champion (champion_name, champion_id, champion_title) VALUES (?, ?, ?)",
            [champion_name, champion_id, champion_title]
        );
        return champion;
    },

    async update(championId: number, champion: Champion): Promise<Champion | null> {
        const { champion_name, champion_id, champion_title } = champion;
        const [result] = await pool.query(
            "UPDATE champion SET champion_name = ?, champion_id = ?, champion_title = ? WHERE champion_id = ?",
            [champion_name, champion_id, champion_title, championId]
        );

        if ((result as any).affectedRows > 0) return champion;
        return null;
    },

    async remove(championName: string): Promise<boolean> {
        const [result] = await pool.query("DELETE FROM champion WHERE champion_name = ?", [
            championName,
        ]);
        return (result as any).affectedRows > 0;
    },
};

export default ChampionService;