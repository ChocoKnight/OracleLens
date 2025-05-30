SELECT * FROM league_of_legends_esports.matches;

select * from games;

select count(*) from teams;

select m.*
from matches as m
where m.team_one = 67 or m.team_two = 67;

select
                                            g.*,
                                            o.*
                                            from games as g
                                            inner join objectives as o on o.game_id = g.id
                                            where g.id = 1 and o.side = "Blue";
                                            
select *
from teams
where teams.name = "T1";

select *
from teams
where teams.name = "Gen.G";

select *
from teams
where teams.name = "OKSavingsBank BRION";

SELECT m.*
FROM matches AS m
WHERE m.team_one = 3493 OR m.team_two = 3493
ORDER BY m.date DESC
LIMIT 10;