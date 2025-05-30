SELECT * FROM league_of_legends_esports.games where id = 21738 ;

SELECT g.*,
tb.name as blue_team_name,
tr.name as red_team_name
FROM games as g
left join teams as tb
on tb.id = g.blue_team
left join teams as tr
on tr.id = g.red_team;

SELECT * FROM league_of_legends_esports.games where id = 21738;

SELECT * FROM league_of_legends_esports.player_performances where game_id = 21738;

select count(*) from games;

select
g.*,
o.*
-- pp.*
from games as g
inner join objectives as o on o.game_id = g.id
-- inner join players as p on g.blue_team = p.team
-- inner join player_performances as pp on p.id = pp.player_id and g.id = pp.game_id
where g.id = 21738 and o.side = 'Blue';

select pp.*
from games as g
inner join players as p on g.blue_team = p.team
inner join player_performances as pp on p.id = pp.player_id and g.id = pp.game_id
where g.id = 21738;
