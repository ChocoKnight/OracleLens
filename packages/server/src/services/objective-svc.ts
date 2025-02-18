import { run } from 'node:test';
import { Objective } from '../models/objective';

import pool from '../mysql';

const ObjectiveService = {
    async getAll(): Promise<Objective[]> {
        const [rows] = await pool.query("SELECT * FROM objectives")
        return rows as Objective[];
    },

    async getByGame(gameId: number): Promise<Objective[] | null> {
        const [rows] = await pool.query("SELECT * FROM objectives where game_id = ?", [gameId])
        return rows as Objective[];
    },

    async getByGameSide(gameId:number, side: string): Promise<Objective | null> {
        const [rows] = await pool.query("SELECT * FROM objectives where game_id = ? and side = ?", [gameId, side])
        const objectives = rows as Objective[];
        return objectives.length > 0 ? objectives[0] : null;
    }, 

    async create(objective: Objective): Promise<Objective> {
        const { game_id, side, first_blood, first_tower, towers, tower_plates, void_grubs, rift_heralds, 
            baron_nashors, infernals, mountains, clouds, oceans, hextechs, chemtechs, elders, 
            feats_of_strength, ruinous_atakhan, voracious_atakhan } = objective;
        await pool.execute('INSERT INTO objectives (game_id, side, first_blood, first_tower, towers, tower_plates, void_grubs, rift_heralds, baron_nashors, infernals, mountains, clouds, oceans, hextechs, chemtechs, elders, feats_of_strength, ruinous_atakhan, voracious_atakhan) VALUES (?, ?, ? , ?, ?, ?, ? , ?, ?, ?, ? , ?, ?, ?, ? , ?, ?, ?, ?)', [
            game_id, side, first_blood, first_tower, towers, tower_plates, void_grubs, rift_heralds, 
            baron_nashors, infernals, mountains, clouds, oceans, hextechs, chemtechs, elders,
            feats_of_strength, ruinous_atakhan, voracious_atakhan
        ]);
        return objective;
    },

    async update(gameId: number, side: string, objective: Objective): Promise<Objective | null> {
        const {first_blood, first_tower, towers, tower_plates, void_grubs, rift_heralds, 
            baron_nashors, infernals, mountains, clouds, oceans, hextechs, chemtechs, elders, 
            feats_of_strength, ruinous_atakhan, voracious_atakhan } = objective;
        const [result] = await pool.execute('UPDATE objectives SET first_blood = ?, first_tower = ?, towers = ?, tower_plates = ?, void_grubs = ?, rift_heralds = ?, baron_nashors = ?, infernals = ?, mountains = ?, clouds = ?, oceans = ?, hextechs = ?, chemtechs = ?, elders = ?, feats_of_strength = ?, ruinous_atakhan = ?, voracious_atakhan = ? WHERE game_id = ? and side = ?', [
            first_blood, first_tower, towers, tower_plates, void_grubs, rift_heralds, 
            baron_nashors, infernals, mountains, clouds, oceans, hextechs, chemtechs, elders,
            feats_of_strength, ruinous_atakhan, voracious_atakhan, gameId, side
        ]);

        if ((result as any).affectedRows > 0) return objective;
        return null;
    },

    async remove(gameId: number, side: string): Promise<boolean> {
        const [result] = await pool.execute('DELETE FROM objectives WHERE game_id = ? and side = ?', [gameId, side]);
        return (result as any).affectedRows > 0;
    },
}

export default ObjectiveService;