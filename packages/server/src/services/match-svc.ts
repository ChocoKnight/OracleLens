import {
    Match, MatchInfo, TeamScore, PickBan, Objectives,
    PlayerPerformance, GameScore, Games, MatchSummary
} from '../models/match';

import pool from '../mysql';

const MatchService = {
    async getTeamMatchesPlayed(teamId: number): Promise<Match[]> {

        const [rows] = await pool.execute(`
            select m.*
            from matches as m
            where m.team_one = ? or m.team_two = ?`, [teamId, teamId]);

        return rows as Match[];
    },

    async getTeamMostRecentTenMatchesPlayed(teamId: number, gamesPlayed: number): Promise<Match[]> {

        const [rows] = await pool.execute(`
            SELECT m.*
            FROM matches AS m
            WHERE m.team_one = ? OR m.team_two = ?
            ORDER BY m.date DESC
            LIMIT 10;`, [teamId, teamId]);

        return rows as Match[];
    },

    async getAll(): Promise<Match[]> {
        const [rows] = await pool.execute(`
            select m.id as id,
            t.id as tournament_id,
            t.league as tournament,
            t.split as split,
            m.date as date,
            t1.id as team_one_id,
            t1.name as team_one_name,
            t2.id as team_two_id,
            t2.name as team_two_name,
            m.playoffs as playoffs,
            m.patch as patch
            from matches as m
            left join tournaments as t
            on t.id = m.tournament_id 
            left join teams as t1
            on t1.id = m.team_one
            left join teams as t2
            on t2.id = m.team_two`)
        return rows as Match[];
    },

    async getByTournament(tournamentId: number): Promise<Match[] | null> {
        const [rows] = await pool.execute(`
            select m.id as id,
            t.id as tournament_id,
            t.league as tournament,
            t.split as split,
            m.date as date,
            t1.id as team_one_id,
            t1.name as team_one_name,
            t2.id as team_two_id,
            t2.name as team_two_name,
            m.playoffs as playoffs,
            m.patch as patch
            from matches as m
            left join tournaments as t
            on t.id = m.tournament_id 
            left join teams as t1
            on t1.id = m.team_one
            left join teams as t2
            on t2.id = m.team_two 
            where m.tournamentId = ?`, [tournamentId])
        return rows as Match[];
    },

    async getOne(id: number): Promise<MatchSummary | null> {
        const [rows] = await pool.query(`select 
            m.id as matchId,
            t.id as tournamentId,
            t.league as league,
            t.split as split,
            t.year as year,
            m.date as date,
            m.patch as patch
            from matches as m
            left join tournaments as t
                on t.id = m.tournament_id
            where m.id = ?;`, [id]);

        const [teamScores] = await pool.query(`SELECT DISTINCT
                team.id AS teamId,
                team.name AS teamName,
                team.year AS year,
                SUM(CASE WHEN g.blue_team = team.id THEN g.blue_win ELSE 0 END) AS blueWins,
                SUM(CASE WHEN g.red_team = team.id AND g.blue_win = 0 THEN 1 ELSE 0 END) AS redWins
            from matches AS m 
            LEFT JOIN games AS g
                ON g.match_id = m.id
            LEFT JOIN teams AS team
                ON team.id IN (m.team_one, m.team_two)
            WHERE m.id = ?
            GROUP BY team.id, team.name, team.year;`, [id]);

        const [objectives] = await pool.query(`select 
            g.id as gameId,
            g.match_id as matchId,
            g.game_number as gameNumber,
            tb.name as blueTeamName,
            tr.name as redTeamName, 
            o.side as side,
            o.first_blood as firstBlood,
            o.first_tower as firstTower,
            o.towers as towers,
            o.tower_plates as towerPlates,
            o.void_grubs as voidGrubs,
            o.rift_heralds as riftHeralds,
            o.baron_nashors as baronNashors,
            o.infernals,
            o.mountains,
            o.clouds, 
            o.oceans, 
            o.hextechs,
            o.chemtechs,
            o.elders,
            o.feats_of_strength as featsOfStrength,
            o.ruinous_atakhan as ruinousAtakhan,
            o.voracious_atakhan as voraciousAtakhan
            from games as g
            left join objectives as o
                on o.game_id = g.id
            left join teams as tb
                on tb.id = g.blue_team
            left join teams as tr
                on tr.id = g.red_team
            where g.match_id = ?;`, [id]);

        const [pickBans] = await pool.query(`select
            g.id as gameId,
            g.match_id as matchId,
            g.game_number as gameNumber,
            tb.name as blueTeamName,
            tr.name as redTeamName, 
            pb.side,
            pb.ban1,
            pb.ban2,
            pb.ban3,
            pb.ban4,
            pb.ban5,
            pb.pick1,
            pb.pick2,
            pb.pick3,
            pb.pick4,
            pb.pick5
            from games as g
            left join pick_bans as pb
            on pb.game_id = g.id
            left join teams as tb
            on tb.id = g.blue_team
            left join teams as tr
            on tr.id = g.red_team
            where g.match_id = ?;`, [id]);

        const [playerPerformances] = await pool.query(`select
            g.id as gameId,
            g.match_id as matchId,
            g.game_number as gameNumber,
            tb.id as blueTeamId,
            tb.name as blueTeamName,
            tr.id as redTeamId,
            tr.name as redTeamName,
            p.id as playerId,
            p.name as playerName,
            p.team as playerTeam,
            pp.role,
            pp.champion,
            pp.kills,
            pp.deaths,
            pp.assists,
            pp.damage_to_champions as damageToChampions,
            pp.wards_placed as wardsPlaced,
            pp.wards_destroyed as wardsDestroyed,
            pp.control_wards_bought as controlWardsBought,
            pp.vision_score as visionScore,
            pp.total_gold as totalGold,
            pp.gold_spent as goldSpent,
            pp.creep_score as creepScore,
            pp.kills_at_15 as killsAt15,
            pp.deaths_at_15 as deathsAt15,
            pp.assists_at_15 as assistsAt15,
            pp.gold_at_15 as goldAt15
            from games as g
            left join player_performances as pp
            on pp.game_id = g.id
            left join teams as tb
            on tb.id = g.blue_team
            left join teams as tr
            on tr.id = g.red_team
            left join players as p
            on p.id = pp.player_id
            where g.match_id = ?;`, [id]);

        const [gameScores] = await pool.query(`select
            g.id as gameId,
            g.match_id as matchId,
            g.game_number as gameNumber,
            tb.id as blueTeamId,
            tb.name as blueTeamName,
            tr.id as redTeamId,
            tr.name as redTeamName,
            g.blue_win as blueWin
            from games as g
            left join teams as tb
            on tb.id = g.blue_team
            left join teams as tr
            on tr.id = g.red_team
            where g.match_id = ?;`, [id]);

        const MatchSummaries = rows as MatchInfo[];
        const match = MatchSummaries.length > 0 ? MatchSummaries[0] : null;

        const game: Games = {
            gameScores: gameScores as GameScore[],
            pickBans: pickBans as PickBan[],
            objectives: objectives as Objectives[],
            playerPerformances: playerPerformances as PlayerPerformance[]
        }

        if (!match) return null
        const matchSummary: MatchSummary = {
            matchInfo: match,
            teamScores: teamScores as TeamScore[],
            games: game
        }

        return matchSummary
    },

    async create(match: Match): Promise<Match> {
        const { tournament_id, date, team_one, team_two, playoffs, patch } = match;
        await pool.execute('INSERT INTO matches (tournament_id, date, team_one, team_two, playoffs, patch) VALUES (?, ?, ?, ?, ?, ?)', [
            tournament_id, date, team_one, team_two, playoffs, patch
        ]);
        return match;
    },

    async update(matchId: number, match: Match): Promise<Match | null> {
        const { tournament_id, date, team_one, team_two, playoffs, patch } = match;
        const [result] = await pool.execute('UPDATE matches SET tournament_id = ?, date = ?, team_one = ?, team_two = ?, playoffs = ?, patch = ? WHERE id = ?', [
            tournament_id, date, team_one, team_two, playoffs, patch, matchId
        ]);
        if ((result as any).affectedRows > 0) return match;
        return null;
    },

    async remove(matchId: number): Promise<boolean> {
        const [result] = await pool.execute('DELETE FROM matches WHERE id = ?', [matchId]);
        return (result as any).affectedRows > 0;
    },
}

export default MatchService;