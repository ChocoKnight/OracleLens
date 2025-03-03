import { TeamSideStats, PlayerStats, TeamStats } from '../models/team_stats';
import { Team } from '../models/team';

import pool from '../mysql';

const TeamStatService = {
    async getTeamStats(teamId: number): Promise<TeamStats | null> {
        const [blueSideStats] = await pool.query(`select
            t.id as id,
            SUM(g.blue_win) as wins,
            COUNT(g.blue_win) as games,
            ROUND(COALESCE(avg(g.duration), 0), 2) as avgDuration,
            ROUND(COALESCE(avg(o.first_blood), 0), 2) as firstBloodRate,
            ROUND(COALESCE(avg(o.first_tower), 0), 2) as firstTowerRate,
            ROUND(COALESCE(avg(o.towers), 0), 2) as avgTowers,
            ROUND(COALESCE(avg(o.tower_plates), 0), 2) as avgTowerPlates,
            ROUND(COALESCE(avg(o.void_grubs), 0), 2) as avgVoidGrubs,
            ROUND(COALESCE(avg(o.rift_heralds), 0), 2) as avgRiftHeralds,
            ROUND(COALESCE(avg(o.baron_nashors), 0), 2) as avgBaronNashors,
            ROUND(COALESCE(avg(o.infernals), 0), 2) as avgInfernals,
            ROUND(COALESCE(avg(o.mountains), 0), 2) as avgMountains,
            ROUND(COALESCE(avg(o.clouds), 0), 2) as avgClouds,
            ROUND(COALESCE(avg(o.oceans), 0), 2) as avgOceans,
            ROUND(COALESCE(avg(o.hextechs), 0), 2) as avgHextechs,
            ROUND(COALESCE(avg(o.chemtechs), 0), 2) as avgChemtechs,
            ROUND(COALESCE(avg(o.elders), 0), 2) as avgElders,
            ROUND(COALESCE(avg(o.feats_of_strength), 0), 2) as featOfStrengthRate,
            ROUND(COALESCE(avg(o.ruinous_atakhan), 0), 2) as avgRuinousAtakahn,
            ROUND(COALESCE(avg(o.voracious_atakhan), 0), 2) as avgVoraciousAtakahn
            from teams as t
            left join games as g
            on t.id = g.blue_team
            left join objectives as o
            on g.id = o.game_id
            where t.id = ? and o.side = 'Blue'
            group by t.id;`, [teamId]);

        const [redSideStats] = await pool.query(`select
            t.id as id,
            SUM(CASE WHEN g.blue_win = 0 THEN 1 ELSE 0 END) AS wins,
            COUNT(g.blue_win) as games,
            ROUND(COALESCE(avg(g.duration), 0), 2) as avgDuration,
            ROUND(COALESCE(avg(o.first_blood), 0), 2) as firstBloodRate,
            ROUND(COALESCE(avg(o.first_tower), 0), 2) as firstTowerRate,
            ROUND(COALESCE(avg(o.towers), 0), 2) as avgTowers,
            ROUND(COALESCE(avg(o.tower_plates), 0), 2) as avgTowerPlates,
            ROUND(COALESCE(avg(o.void_grubs), 0), 2) as avgVoidGrubs,
            ROUND(COALESCE(avg(o.rift_heralds), 0), 2) as avgRiftHeralds,
            ROUND(COALESCE(avg(o.baron_nashors), 0), 2) as avgBaronNashors,
            ROUND(COALESCE(avg(o.infernals), 0), 2) as avgInfernals,
            ROUND(COALESCE(avg(o.mountains), 0), 2) as avgMountains,
            ROUND(COALESCE(avg(o.clouds), 0), 2) as avgClouds,
            ROUND(COALESCE(avg(o.oceans), 0), 2) as avgOceans,
            ROUND(COALESCE(avg(o.hextechs), 0), 2) as avgHextechs,
            ROUND(COALESCE(avg(o.chemtechs), 0), 2) as avgChemtechs,
            ROUND(COALESCE(avg(o.elders), 0), 2) as avgElders,
            ROUND(COALESCE(avg(o.feats_of_strength), 0), 2) as featOfStrengthRate,
            ROUND(COALESCE(avg(o.ruinous_atakhan), 0), 2) as avgRuinousAtakahn,
            ROUND(COALESCE(avg(o.voracious_atakhan), 0), 2) as avgVoraciousAtakahn
            from teams as t
            left join games as g
            on t.id = g.red_team
            left join objectives as o
            on g.id = o.game_id
            where t.id = ? and o.side = 'Red'
            group by t.id;`, [teamId]);

        await pool.query(`create view teamPlayerStats as 
            select 
            t.id as teamId, 
            p.id as playerId, 
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
            where t.id = ?
            group by t.id, p.id, pp.role;`, [teamId]);

        const [playerStats] = await pool.query(`select 
            t.name as teamName,
            p.name as playerName, 
            t.year as year,
            tps.*
            from players as p
            left join teams as t
            on p.team = t.id
            left join teamPlayerStats as tps
            on p.id = tps.playerId
            where t.id = ?;`, [teamId]);

        const [team] = await pool.query(`select * from teams where id = ?;`, [teamId]);

        const blueSideStatsResult = (blueSideStats as TeamSideStats[])[0] as TeamSideStats;
        const redSideStatsResult = (redSideStats as TeamSideStats[])[0] as TeamSideStats;
        const playerStatsResult = playerStats as PlayerStats[];
        const teamResult = (team as Team[])[0];

        const teamStats: TeamStats = {
            id: teamResult.id,
            team: teamResult.name,
            year: teamResult.year,
            blueSideStats: blueSideStatsResult,
            redSideStats: redSideStatsResult,
            playerStats: playerStatsResult
        };

        await pool.query(`DROP VIEW teamPlayerStats;`);

        return teamStats
    }
}

export default TeamStatService;