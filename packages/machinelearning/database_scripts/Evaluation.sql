select * from tournaments where year = 2024 or year = 2025;
select * from matches as m where m.date > '2025-01-01';
select count(*) from matches as m where m.date > '2025-01-01';
select count(*) from matches as m where m.date < '2025-01-01';

select * from games where games.match_id = 36446;
select * from player_performances where game_id = 54833;

SELECT m.*
FROM matches AS m
WHERE (m.team_one = 3493 OR m.team_two = 3493)
  AND m.date < '2024-03-07'
ORDER BY m.date DESC
LIMIT 10;

select t1.id, t1.team_one, t1.team_two, t1.date, ROUND(t2.blueWin) AS blueWin
from (select m.id, m.team_one, m.team_two, m.date from matches as m) t1
left join (select g.match_id, avg(g.blue_win) as "blueWin" from games as g group by g.match_id) t2
on (t1.id = t2.match_id)
where t1.date > '2025-01-01';