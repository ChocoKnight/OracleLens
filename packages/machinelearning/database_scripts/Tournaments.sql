SELECT count(*) FROM league_of_legends_esports.games;
SELECT count(*) FROM league_of_legends_esports.matches;

create view tournamentGameCounts as 
select DISTINCT t.id, count(*) as count, avg(g.duration) as avgDuration
from tournaments as t
left join matches as m
on t.id = m.tournament_id 
left join games as g
on m.id = g.match_id 
GROUP BY t.id, t.league, t.year, t.split;

create view tournamentStart as 
select DISTINCT t.id, MIN(m.date) as startDate
from tournaments as t
left join matches as m
on t.id = m.tournament_id 
GROUP BY t.id;

create view tournamentEnd as 
select DISTINCT t.id, Max(m.date) as endDate
from tournaments as t
left join matches as m
on t.id = m.tournament_id 
GROUP BY t.id;

SELECT t.*, tgc.count, ts.startDate, te.endDate
FROM tournaments as t
left join tournamentGameCounts as tgc
on t.id = tgc.id
left join tournamentStart as ts
on t.id = ts.id
left join tournamentEnd as te
on t.id = te.id
where t.id = 61;

drop view tournamentGameCounts, tournamentStart, tournamentEnd;

create view matchScores as
SELECT match_id as matchId, team, SUM(wins) AS wins
FROM (
	SELECT g.match_id, g.blue_team AS team, SUM(g.blue_win) AS wins
	FROM games AS g
	GROUP BY g.blue_team, g.match_id
	UNION ALL
	SELECT g.match_id, g.red_team AS team, SUM(CASE WHEN g.blue_win = 0 THEN 1 ELSE 0 END) AS wins
	FROM games AS g
	GROUP BY g.red_team, g.match_id
) AS combined
GROUP BY team, match_id;

SELECT 
    m.id AS matchId,
    t.id AS tournamentId,
    m.date AS date,
    t1.id AS teamOneId,
    t1.name AS teamOneName,
    ms1.wins AS teamOneWins,
    t2.id AS teamTwoId,
    t2.name AS teamTwoName,
    ms2.wins AS teamTwoWins,
    m.patch AS patch
FROM matches AS m
LEFT JOIN tournaments AS t 
    ON m.tournament_id = t.id 
LEFT JOIN teams AS t1
    ON m.team_one = t1.id  
LEFT JOIN teams AS t2
    ON m.team_two = t2.id
LEFT JOIN matchScores as ms1
	ON t1.id = ms1.team 
LEFT JOIN matchScores as ms2
	ON t2.id = ms2.team 
WHERE t.id = 61 and ms1.matchId = m.id and ms2.matchId = m.id;

drop view matchScores;

SELECT DISTINCT
    team.id AS teamId,
    team.name AS teamName,
    team.year AS year,
    SUM(CASE WHEN g.blue_team = team.id THEN g.blue_win ELSE 0 END) AS blueWins,
    SUM(CASE WHEN g.red_team = team.id AND g.blue_win = 0 THEN 1 ELSE 0 END) AS redWins,
    COUNT(CASE WHEN g.blue_team = team.id THEN 1 END) AS blueGames,
    COUNT(CASE WHEN g.red_team = team.id THEN 1 END) AS redGames
FROM tournaments AS t
LEFT JOIN matches AS m 
    ON m.tournament_id = t.id 
LEFT JOIN games AS g
    ON g.match_id = m.id
LEFT JOIN teams AS team
    ON team.id IN (m.team_one, m.team_two)
WHERE t.id = 61
GROUP BY team.id, team.name, team.year;
