import math

class Team():
    def __init__(self, name: str, year: int):
        self.name = name;
        self.year = year;
    
    def fix_name(self):
        if type(self.name) is not str:
            self.name = "Unknown Team"
    
    def __eq__(self, value: object) -> bool:
        return self.name == value.name and self.year == value.year
    
    def __str__(self):
        return f"{self.name} - {self.year}"
    
    def __repr__(self):
        return self.__str__()

    def __hash__(self):
        return hash(self.name) + hash(self.year)

class Player():
    def __init__(self, name: str, team: Team):
        self.name = name
        self.team = team

    def fix_name(self):
        if type(self.name) is not str:
            self.name = "Unknown Player"

    def __eq__(self, value: object) -> bool:
        return self.name == value.name and self.team == value.team
    
    def __str__(self):
        return f"{self.name} {self.team}"

    def __hash__(self):
        return hash(self.name) + hash(self.team)

class Tournament():
    def __init__(self, league: str, year: int, split: str = None):
        self.league = league;
        self.year = year;
        if split is not None:
            self.split = split;
        else:
            self.split = ""
        self.matches = []

    def fix_split(self):
        if type(self.split) is not str:
            self.split = "N/A"

    def __eq__(self, value: object) -> bool:
        return self.league == value.league and self.year == value.year and self.split == value.split

    def __str__(self):
        return f"{self.league} {self.year} - {self.split}"
    
    def __hash__(self):
        return hash(self.league) + hash(self.year) + hash(self.split)

class PickBan():
    def __init__(self, ban1, ban2, ban3, ban4, ban5, pick1, pick2, pick3, pick4, pick5):
        self.ban1 = ban1;
        self.ban2 = ban2;
        self.ban3 = ban3;
        self.ban4 = ban4;
        self.ban5 = ban5;
        self.pick1 = pick1;
        self.pick2 = pick2;
        self.pick3 = pick3;
        self.pick4 = pick4;
        self.pick5 = pick5;

        self.check_existing_champions()
    
        self.bans = [self.ban1, self.ban2, self.ban3, self.ban4, self.ban5]
        self.picks = [self.pick1, self.pick2, self.pick3, self.pick4, self.pick5]
    
    def __eq__(self, value: object) -> bool:
        return self.ban1 == value.ban1 and self.ban2 == value.ban2 and self.ban3 == value.ban3 and self.ban4 == value.ban4 and self.ban5 == value.ban5 and self.pick1 == value.pick1 and self.pick2 == value.pick2 and self.pick3 == value.pick3 and self.pick4 == value.pick4 and self.pick5 == value.pick5

    def __str__(self):
        return f"Bans - {self.ban1} {self.ban2} {self.ban3} {self.ban4} {self.ban5} \nPicks - {self.pick1} {self.pick2} {self.pick3} {self.pick4} {self.pick5}"

    def check_existing_champions(self):
        if type(self.ban1) is not str:
            self.ban1 = "Not Found"
        if type(self.ban2) is not str:
            self.ban2 = "Not Found"
        if type(self.ban3) is not str:
            self.ban3 = "Not Found"
        if type(self.ban4) is not str:
            self.ban4 = "Not Found"
        if type(self.ban5) is not str:
            self.ban5 = "Not Found"
        if type(self.pick1) is not str:
            self.pick1 = "Not Found"
        if type(self.pick2) is not str:
            self.pick2 = "Not Found"
        if type(self.pick3) is not str:
            self.pick3 = "Not Found"
        if type(self.pick4) is not str:
            self.pick4 = "Not Found"
        if type(self.pick5) is not str:
            self.pick5 = "Not Found"

class Objectives():
    def __init__(self, firstBlood, firstTower, towers, plates, voidGrubs, riftHeralds, baronNashtors, 
                 infernalDragons, mountainDragons, cloudDragons, oceanDragons, 
                 hextechDragons, chemtechDragons, elderDragons, featsOfStrength,
                 ruinousAtakhan, voraciousAtakan):
        self.firstBlood = firstBlood;
        self.firstTower = firstTower;
        self.towers = towers;
        self.plates = plates;
        self.voidGrubs = voidGrubs;
        self.riftHeralds = riftHeralds;
        self.baronNashtors = baronNashtors;
        self.infernalDragons = infernalDragons;
        self.mountainDragons = mountainDragons;
        self.cloudDragons = cloudDragons;
        self.oceanDragons = oceanDragons;
        self.hextechDragons = hextechDragons;
        self.chemtechDragons = chemtechDragons;
        self.elderDragons = elderDragons;
        self.featsOfStrength = featsOfStrength;
        self.ruinousAtakhan = ruinousAtakhan;
        self.voraciousAtakan = voraciousAtakan;
    
    def fix_objectives(self):
        if math.isnan(self.firstBlood):
            self.firstBlood = False

        if math.isnan(self.firstTower):
            self.firstTower = False

        if math.isnan(self.towers):
            self.towers = 0

        if math.isnan(self.plates):
            self.plates = 0

        if math.isnan(self.voidGrubs):
            self.voidGrubs = 0

        if math.isnan(self.riftHeralds):
            self.riftHeralds = 0

        if math.isnan(self.baronNashtors):
            self.baronNashtors = 0

        if math.isnan(self.infernalDragons):
            self.infernalDragons = 0

        if math.isnan(self.mountainDragons):
            self.mountainDragons = 0

        if math.isnan(self.cloudDragons):
            self.cloudDragons = 0

        if math.isnan(self.oceanDragons):
            self.oceanDragons = 0

        if math.isnan(self.hextechDragons):
            self.hextechDragons = 0
        
        if math.isnan(self.chemtechDragons):
            self.chemtechDragons = 0

        if math.isnan(self.elderDragons):
            self.elderDragons = 0

        if math.isnan(self.featsOfStrength):
            self.featsOfStrength = 0

        if math.isnan(self.ruinousAtakhan):
            self.ruinousAtakhan = 0

        if math.isnan(self.voraciousAtakan):
            self.voraciousAtakan = 0

    def __eq__(self, value: object) -> bool:
        return self.firstBlood == value.firstBlood and self.firstTower == value.firstTower and self.towers == value.towers and self.plates == value.plates and self.voidGrubs == value.voidGrubs and self.riftHeralds == value.riftHeralds and self.baronNashtors == value.baronNashtors and self.infernalDragons == value.infernalDragons and self.mountainDragons == value.mountainDragons and self.cloudDragons == value.cloudDragons and self.oceanDragons == value.oceanDragons and self.hextechDragons == value.hextechDragons and self.chemtechDragons == value.chemtechDragons and self.elderDragons == value.elderDragons and self.featsOfStrength == value.featsOfStrength and self.ruinousAtakhan == value.ruinousAtakhan and self.voraciousAtakan == value.voraciousAtakan

class PlayerPerformance():
    def __init__(self, player, role, champion, kills, deaths, assists, damageToChampions, wardsPlaced, wardsKilled, controlWardsBought, visionScore, totalGold, goldSpent, creepScore, killsAt15, deathsAt15, assistsAt15, goldAt15):
        self.player = player;
        self.role = role;
        self.champion = champion;
        self.kills = kills;
        self.deaths = deaths;
        self.assists = assists; 
        self.damageToChampions = damageToChampions; 
        self.wardsPlaced = wardsPlaced;
        self.wardsKilled = wardsKilled;
        self.controlWardsBought = controlWardsBought;
        self.visionScore = visionScore; 
        self.totalGold = totalGold;
        self.goldSpent = goldSpent;
        self.creepScore = creepScore;
        self.killsAt15 = killsAt15;
        self.deathsAt15 = deathsAt15;
        self.assistsAt15 = assistsAt15;
        self.goldAt15 = goldAt15;
    
    def fix_stats(self):
        if type(self.kills) is not int:
            self.kills = -1
        if type(self.deaths) is not int:
            self.deaths = -1
        if type(self.assists) is not int:
            self.assists = -1
        if type(self.damageToChampions) is not int:
            self.damageToChampions = -1
        if type(self.wardsPlaced) is not int:
            self.wardsPlaced = -1
        if type(self.wardsKilled) is not int:
            self.wardsKilled = -1
        if type(self.controlWardsBought) is not int:
            self.controlWardsBought = -1
        if type(self.visionScore) is not int:
            self.visionScore = -1
        if type(self.totalGold) is not int:
            self.totalGold = -1
        if type(self.goldSpent) is not int:
            self.goldSpent = -1
        if type(self.creepScore) is not int:
            self.creepScore = -1
    
    def __eq__(self, value) -> bool:
        return self.player == value.player and self.role == value.role and self.champion == value.champion and self.kills == value.kills and self.deaths == value

    def __str__(self):
        return f"{self.player} - {self.champion} - {self.kills}/{self.deaths}/{self.assists}" 
    
    def set_15_stats(self):
        if type(self.killsAt15) is not int:
            self.killsAt15 = -1
        if type(self.deathsAt15) is not int:
            self.deathsAt15 = -1
        if type(self.assistsAt15) is not int:
            self.assistsAt15 = -1
        if type(self.goldAt15) is not int:
            self.goldAt15 = -1

class Game():
    def __init__(self, number: int = None, blueTeam: Team = None, redTeam: Team = None, blueWin: bool = None,
                 bluePickBan: PickBan = None, redPickBan: PickBan = None, blueObjectives: Objectives = None, redObjectives: Objectives = None, 
                 bluePlayerPerformances: list[PlayerPerformance] = None, redPlayerPerformances: list[PlayerPerformance] = None, duration: int = None):
        self.number = number;
        self.blueTeam = blueTeam;
        self.redTeam = redTeam;
        self.blueWin = blueWin;
        self.bluePickBan = bluePickBan;
        self.redPickBan = redPickBan;
        self.blueObjectives = blueObjectives;
        self.redObjectives = redObjectives;
        if bluePlayerPerformances is None:
            self.bluePlayerPerformances = []
        else:
            self.bluePlayerPerformances = bluePlayerPerformances
        if redPlayerPerformances is None:
            self.redPlayerPerformances = []
        else:
            self.redPlayerPerformances = redPlayerPerformances
        self.duration = duration;
    
    def __eq__(self, value: object) -> bool:
        return self.number == value.number and self.blueTeam == value.blueTeam and self.redTeam == value.redTeam

    def __str__(self):
        return f"{self.number} - {self.blueTeam} vs {self.redTeam}"

class Match():
    def __init__(self, date: str = None, teamOne: Team = None, teamTwo: Team = None, playoffs: bool = None, patch: str = None, games: list[Game] = None):
        self.date = date;
        self.teamOne = teamOne;
        self.teamTwo = teamTwo;
        self.playoffs = playoffs;
        self.patch = patch;
        if games is None:
            self.games = []
        else:
            self.games = games

    def fix_patch(self):
        if math.isnan(self.patch):
            self.patch = "Unknown"

    def __eq__(self, value: object) -> bool:
        return self.date == value.date and self.teamOne == value.teamOne and self.teanTwo == value.teamTwo and self.patch == value.patch

    def __str__(self):
        return f"{self.date} - {self.teamOne} vs {self.teamTwo} - {self.patch} - {len(self.games)} Games - Playoff {self.playoffs}"
    
    def __hash__(self):
        return hash(self.date) + hash(self.teamOne) + hash(self.teamTwo) + hash(self.playoffs) + hash(self.patch)