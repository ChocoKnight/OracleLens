CREATE TABLE champion (
	champion_name varchar(255) primary key,
    champion_true_name varchar(255),
    champion_id int unique,
    champion_title varchar(255)
);

CREATE TABLE teams (
	id int primary key auto_increment,
	name varchar(255),
    year int,
    unique (name, year)
);

CREATE TABLE players (
	id int primary key auto_increment,
	name varchar(255),
    team int,
    unique (name, team),
    foreign key (team) references teams(id)
);

CREATE TABLE tournaments (
	id int primary key auto_increment,
    league varchar(225),
    year int,
    split varchar(225),
    unique (league, year, split)
);

CREATE TABLE matches (
	id int primary key auto_increment,
    tournament_id int,
    date date,
    team_one int,
    team_two int,
    playoffs boolean,
    patch varchar(10),
    foreign key (tournament_id) References tournaments(id),
    foreign key (team_one) References teams(id),
    foreign key (team_two) References teams(id)
);

Create Table games (
	id int primary key auto_increment,
    match_id int,
    game_number int,
    blue_team int,
    red_team int,
    blue_win boolean,
    duration int,
    foreign key (match_id) References matches(id),
    foreign key (blue_team) References teams(id),
    foreign key (red_team) References teams(id)
);

create table objectives (
	game_id int,
    side varchar(4),
    first_blood int,
    first_tower int,
    towers int,
    tower_plates int,
    void_grubs int,
    rift_heralds int,
    baron_nashors int,
    infernals int,
    mountains int,
    clouds int,
    oceans int,
    hextechs int,
    chemtechs int,
    elders int,
    feats_of_strength int,
    ruinous_atakhan int,
    voracious_atakhan int,
    primary key (game_id, side),
    foreign key (game_id) References games(id)
);

create table pick_bans(
	game_id int,
    side varchar(4),
    pick_ban varchar(4),
    order_number int,
    champion varchar(255),
    primary key(game_id, side, pick_ban, order_number),
    foreign key (game_id) References games(id),
    foreign key(champion) references champion(champion_name)
);

-- create table pick_bans(
-- 	game_id int,
--     side varchar(4),
--     ban1 varchar(255),
--     ban2 varchar(255),
--     ban3 varchar(255),
--     ban4 varchar(255),
--     ban5 varchar(255),
--     pick1 varchar(255),
--     pick2 varchar(255),
--     pick3 varchar(255),
--     pick4 varchar(255),
--     pick5 varchar(255),
--     primary key(game_id, side),
--     foreign key (game_id) References games(id),
--     foreign key(ban1) references champion(champion_name),
--     foreign key(ban2) references champion(champion_name),
--     foreign key(ban3) references champion(champion_name),
--     foreign key(ban4) references champion(champion_name),
--     foreign key(ban5) references champion(champion_name),
--     foreign key(pick1) references champion(champion_name),
--     foreign key(pick2) references champion(champion_name),
--     foreign key(pick3) references champion(champion_name),
--     foreign key(pick4) references champion(champion_name),
--     foreign key(pick5) references champion(champion_name)
-- );

create table player_performances(
	game_id int,
    player_id int,
    role varchar(10),
    champion varchar(225),
    kills int,
    deaths int,
    assists int,
    damage_to_champions int,
    wards_placed int,
    wards_destroyed int,
    control_wards_bought int,
    vision_score int,
    total_gold int,
    gold_spent int,
    creep_score int,
    kills_at_15 int,
    deaths_at_15 int,
    assists_at_15 int,
    gold_at_15 int,
    primary key(game_id, player_id, role, champion),
    foreign key(game_id) references games(id),
    foreign key(player_id) references players(id),
	foreign key(champion) references champion(champion_name)
);

drop table player_performances;
drop table pick_bans;
drop table objectives;
drop table games;
drop table matches;
DROP TABLE tournaments;

drop table players;
drop table teams;

DROP TABLE champion;