SELECT * FROM league_of_legends_esports.champion;

insert into league_of_legends_esports.champion (champion_name, champion_true_name, champion_id, champion_title)
VALUES ('Not Found', 'Not Found', -1, 'N/A'); 

UPDATE league_of_legends_esports.champion
SET champion_name = 'Aurelion Sol'
WHERE champion_name = 'AurelionSol'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Bel'Veth"
WHERE champion_name = 'Belveth'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Cho'Gath"
WHERE champion_name = 'Chogath'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Dr. Mundo"
WHERE champion_name = 'DrMundo'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Jarvan IV"
WHERE champion_name = 'JarvanIV'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "K'Sante"
WHERE champion_name = 'KSante'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Kai'Sa"
WHERE champion_name = 'Kaisa'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Kha'Zix"
WHERE champion_name = 'Khazix'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Kog'Maw"
WHERE champion_name = 'KogMaw'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Lee Sin"
WHERE champion_name = 'LeeSin'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Master Yi"
WHERE champion_name = 'MasterYi'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Miss Fortune"
WHERE champion_name = 'MissFortune'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Nunu & Willump"
WHERE champion_name = 'Nunu'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Rek'Sai"
WHERE champion_name = 'RekSai'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Renata Glasc"
WHERE champion_name = 'Renata'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Tahm Kench"
WHERE champion_name = 'TahmKench'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Twisted Fate"
WHERE champion_name = 'TwistedFate'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Vel'Koz"
WHERE champion_name = 'Velkoz'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Wukong"
WHERE champion_name = 'MonkeyKing'; 

UPDATE league_of_legends_esports.champion
SET champion_name = "Xin Zhao"
WHERE champion_name = 'XinZhao'; 

create view championBluePicked as
SELECT champion, COUNT(*) AS count
FROM (
    SELECT pick1 AS champion FROM pick_bans where side = 'Blue'
    UNION ALL
    SELECT pick2 FROM pick_bans where side = 'Blue'
    UNION ALL
    SELECT pick3 FROM pick_bans where side = 'Blue'
    UNION ALL
    SELECT pick4 FROM pick_bans where side = 'Blue'
    UNION ALL
    SELECT pick5 FROM pick_bans where side = 'Blue'
) AS all_picks
GROUP BY champion;

create view championBlueBanned as
SELECT champion, COUNT(*) AS count
FROM (
    SELECT ban1 AS champion FROM pick_bans where side = 'Blue'
    UNION ALL
    SELECT ban2 FROM pick_bans where side = 'Blue'
    UNION ALL
    SELECT ban3 FROM pick_bans where side = 'Blue'
    UNION ALL
    SELECT ban4 FROM pick_bans where side = 'Blue'
    UNION ALL
    SELECT ban5 FROM pick_bans where side = 'Blue'
) AS all_bans
GROUP BY champion;

create view championRedPicked as
SELECT champion, COUNT(*) AS count
FROM (
    SELECT pick1 AS champion FROM pick_bans where side = 'Red'
    UNION ALL
    SELECT pick2 FROM pick_bans where side = 'Red'
    UNION ALL
    SELECT pick3 FROM pick_bans where side = 'Red'
    UNION ALL
    SELECT pick4 FROM pick_bans where side = 'Red'
    UNION ALL
    SELECT pick5 FROM pick_bans where side = 'Red'
) AS all_picks
GROUP BY champion;

create view championRedBanned as
SELECT champion, COUNT(*) AS count
FROM (
    SELECT ban1 AS champion FROM pick_bans where side = 'Red'
    UNION ALL
    SELECT ban2 FROM pick_bans where side = 'Red'
    UNION ALL
    SELECT ban3 FROM pick_bans where side = 'Red'
    UNION ALL
    SELECT ban4 FROM pick_bans where side = 'Red'
    UNION ALL
    SELECT ban5 FROM pick_bans where side = 'Red'
) AS all_bans
GROUP BY champion;

create view championBlueWins as
select pp.champion, count(*) as count
from player_performances as pp
left join games as g
on pp.game_id  = g.id
where g.blue_win = 1
group by pp.champion;

create view championRedWins as
select pp.champion, count(*) as count
from player_performances as pp
left join games as g
on pp.game_id  = g.id
where g.blue_win = 0
group by pp.champion;

create view championKDA as 
select pp.champion, 
avg(pp.kills) as averageKills, 
avg(pp.deaths) as averageDeaths, 
avg(pp.assists) as averageAssists, 
avg(pp.damage_to_champions) as averageDamageToChampions,
avg(pp.kills_at_15) as averagePre15Kills, 
avg(pp.deaths_at_15) as averagePre15Deaths, 
avg(pp.assists_at_15) as averagePre15Assists
from player_performances as pp
group by pp.champion;

create view championWinRate as 
SELECT 
    pp.champion AS champion,
    COALESCE(COUNT(pp.champion), 0) AS timesPlayed,
	COALESCE(SUM(CASE WHEN g.blue_team = p.team THEN g.blue_win END), 0) AS blueWins,
	COALESCE(SUM(CASE WHEN g.red_team = p.team AND g.blue_win = 0 THEN 1 ELSE 0 END), 0) AS redWins,
    COALESCE(COUNT(CASE WHEN g.blue_team = p.team THEN g.blue_win END), 0) AS blueGames,
	COALESCE(COUNT(CASE WHEN g.red_team = p.team THEN g.blue_win END), 0) AS redGames
FROM player_performances AS pp
LEFT JOIN games AS g
ON g.id = pp.game_id
left join players as p 
on p.id = pp.player_id
GROUP BY pp.champion;

WITH TotalGames AS (
    SELECT COUNT(*) AS totalGames FROM games
)
SELECT 
    c.champion_name AS name,
    c.champion_id AS id,
    c.champion_title AS title,
    COALESCE(cwr.timesPlayed, 0) as timesPlayed,
    COALESCE(cwr.blueWins, 0) as blueWins,
    COALESCE(cwr.redWins, 0) as redWins,
    COALESCE(cwr.blueGames, 0) as blueGames,
    COALESCE(cwr.redGames, 0) as redGames,
    COALESCE(ckda.averageKills, 0) AS averageKills,
    COALESCE(ckda.averageDeaths, 0) AS averageDeaths,
    COALESCE(ckda.averageAssists, 0) AS averageAssists,
    COALESCE(ckda.averagePre15Kills, 0) AS averagePre15Kills,
    COALESCE(ckda.averagePre15Deaths, 0) AS averagePre15Deaths,
    COALESCE(ckda.averagePre15Assists, 0) AS averagePre15Assists,
    COALESCE(tg.totalGames, 0) AS totalGamesPlayed
FROM champion AS c
LEFT JOIN championWinRate as cwr on c.champion_name = cwr.champion
LEFT JOIN championKDA AS ckda ON c.champion_name = ckda.champion
LEFT JOIN TotalGames AS tg ON 1=1;

drop view championWinRate, championKDA;

drop view championBluePicked, championRedPicked, championBlueBanned, championRedBanned, championBlueWins, championRedWins, championKDA;