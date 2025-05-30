from fastapi import FastAPI
from pydantic import BaseModel
import torch
import numpy as np
import pandas as pd 
import time
from model import LSTMForecaster
import requests

# uvicorn app:app --reload --host 0.0.0.0 --port 8000

class NNData(BaseModel):
    sequence: list[float]

class LSTMData(BaseModel):
    sequence: list[list[float]]

app = FastAPI()

input_size = 237
output_size = 237

lstm_model = LSTMForecaster(input_size=input_size, hidden_size=128, num_layers=5, output_size=output_size)
lstm_model.load_state_dict(torch.load("models/lstm_rnn_model_128_5.pth", map_location=torch.device("cpu")))
lstm_model.eval()

nn_model = torch.nn.Sequential(
    torch.nn.Linear(236, 128),
    torch.nn.ReLU(),
    torch.nn.Linear(128, 128),
    torch.nn.ReLU(),
    torch.nn.Linear(128, 64),
    torch.nn.ReLU(),
    torch.nn.Linear(64, 64),
    torch.nn.ReLU(),
    torch.nn.Linear(64, 1)
)

nn_model.load_state_dict(torch.load("models/final_nn_model.pth", map_location=torch.device("cpu")))
nn_model.eval()

def team_game_vector(gameId, teamId):
    objectives = "http://localhost:3000/api/games"
    player_stats = "http://localhost:3000/api/playerperformances"

    blue_params = {'gameId': gameId, 'side': 'Blue'}
    red_params = {'gameId': gameId, 'side': 'Red'}
    blue_objectives = requests.get(objectives, params=blue_params)
    red_objectives = requests.get(objectives, params=red_params)
    blue_player_stats = requests.get(player_stats, params=blue_params)
    red_player_stats = requests.get(player_stats, params=red_params)

    blue_objectives_df = pd.DataFrame(blue_objectives.json())

    teamBlueSide = (blue_objectives_df['blue_team'].iloc[0] == teamId)

    blue_objectives_df = blue_objectives_df[['blue_win', 'game_number', 'duration', 'first_blood', 'first_tower', 'towers', 'tower_plates', 'void_grubs', 'rift_heralds',
    'baron_nashors', 'infernals', 'mountains', 'clouds', 'oceans', 'hextechs', 'chemtechs', 'elders', 'feats_of_strength',
    'ruinous_atakhan', 'voracious_atakhan']]
    blue_objectives_df = blue_objectives_df.astype({col: int for col in blue_objectives_df.columns if blue_objectives_df[col].dtype == 'bool'})
    blue_objectives_df_values = blue_objectives_df.values.flatten().tolist()

    blue_player_stats_df = pd.DataFrame(blue_player_stats.json())
    blue_player_stats_df = blue_player_stats_df[['role', 'kills', 'deaths', 'assists', 'damage_to_champions', 'wards_placed', 'wards_destroyed',
        'control_wards_bought', 'vision_score', 'total_gold', 'gold_spent', 'creep_score', 
        'kills_at_15', 'deaths_at_15', 'assists_at_15', 'gold_at_15']].sort_values(by='role')
    blue_player_stats_df = blue_player_stats_df.astype({col: int for col in blue_player_stats_df.columns if blue_player_stats_df[col].dtype == 'bool'})
    blue_player_stats_df_encoded = pd.get_dummies(blue_player_stats_df, columns=['role'], drop_first=False)

    blue_player_stats_df_encoded_values = blue_player_stats_df_encoded.values.flatten().tolist()

    red_objectives_df = pd.DataFrame(red_objectives.json())
    red_objectives_df = red_objectives_df[['first_blood', 'first_tower', 'towers', 'tower_plates', 'void_grubs', 'rift_heralds',
    'baron_nashors', 'infernals', 'mountains', 'clouds', 'oceans', 'hextechs', 'chemtechs', 'elders', 'feats_of_strength',
    'ruinous_atakhan', 'voracious_atakhan']]
    red_objectives_df = red_objectives_df.astype({col: int for col in red_objectives_df.columns if red_objectives_df[col].dtype == 'bool'})
    red_objectives_df_values =  red_objectives_df.values.flatten().tolist()

    red_player_stats_df = pd.DataFrame(red_player_stats.json())
    red_player_stats_df = red_player_stats_df[['role', 'kills', 'deaths', 'assists', 'damage_to_champions', 'wards_placed', 'wards_destroyed',
        'control_wards_bought', 'vision_score', 'total_gold', 'gold_spent', 'creep_score', 
        'kills_at_15', 'deaths_at_15', 'assists_at_15', 'gold_at_15']].sort_values(by='role')
    red_player_stats_df = red_player_stats_df.astype({col: int for col in red_player_stats_df.columns if red_player_stats_df[col].dtype == 'bool'})
    red_player_stats_df_encoded = pd.get_dummies(red_player_stats_df, columns=['role'], drop_first=False)

    red_player_stats_df_encoded_values = red_player_stats_df_encoded.values.flatten().tolist()

    if teamBlueSide:
        vector = blue_objectives_df_values + blue_player_stats_df_encoded_values + red_objectives_df_values + red_player_stats_df_encoded_values
    else:
        vector = red_objectives_df_values + red_player_stats_df_encoded_values + blue_objectives_df_values + blue_player_stats_df_encoded_values

    return vector

def match_vector(teamId, matchId):
    games = "http://localhost:3000/api/games"

    game_params = {'matchId': matchId}

    game_response = requests.get(games, params=game_params)
    game_response_df = pd.DataFrame(game_response.json())

    # print(game_response_df)

    game_ids = game_response_df['id'].tolist()
    vectors = []
    for gameId in game_ids:
        vector = team_game_vector(gameId, teamId)

        if len(vector) == 237:
            vectors.append(vector)
        time.sleep(0.05)

    vectors_array = np.array(vectors)

    # print(vectors_array.shape)

    if len(vectors) > 0:
        vectors_array = np.array(vectors)
        average_vector = vectors_array.mean(axis=0)
        average_vector[0] = round(average_vector[0])
        return average_vector
    else:
        print(f"No valid vectors for matchId {matchId}") 
        return []  

def getTeamLastTenMatches(teamId: int, date: str = None) -> LSTMData:
    matches = "http://localhost:3000/api/matches"
    if date is None:
        team_params = {'teamId': teamId, 'gamesPlayed': 10}
    else:
        team_params = {'teamId': teamId, 'gamesPlayed': 10, 'date': date}

    team_matches = requests.get(matches, params=team_params)
    team_matches_df = pd.DataFrame(team_matches.json())

    if team_matches_df.empty:
        return AttributeError("No matches found for the team.")

    team_matches_ids = team_matches_df['id'].tolist() 

    if len(team_matches_ids) < 10:
        return TypeError("Not enough matches found for the team.")

    # print(team_matches_ids)
    team_match_vectors = [match_vector(teamId, matchId) for matchId in team_matches_ids]
    team_match_vectors = [vec for vec in team_match_vectors if len(vec) > 0]
    if len(team_match_vectors) < 10:
        return NameError("Not enough valid matches found for the team.")

    return team_match_vectors

@app.get("/predict")
def predict(teamOne: int, teamTwo: int, date: str = None):

    teamOneData = getTeamLastTenMatches(teamOne, date)
    teamTwoData = getTeamLastTenMatches(teamTwo, date)

    teamOneTensor = torch.tensor(np.array(teamOneData), dtype=torch.float32).unsqueeze(0)
    teamTwoTensor = torch.tensor(np.array(teamTwoData), dtype=torch.float32).unsqueeze(0)
    with torch.no_grad():
        teamOnePrediction = lstm_model(teamOneTensor).numpy().tolist()[0]
        teamTwoPrediction = lstm_model(teamTwoTensor).numpy().tolist()[0]

    # average game number and duration between the two predictions
    avgGameNumber = [(teamOnePrediction[1] + teamTwoPrediction[1]) / 2]
    avgDuration = [(teamOnePrediction[2] + teamTwoPrediction[2]) / 2 ]
    teamOneStats = teamOnePrediction[3:120]
    teamTwoStats = teamTwoPrediction[3:120]

    matchVector = torch.tensor(np.array(avgGameNumber + avgDuration + teamOneStats + teamTwoStats), dtype=torch.float32).unsqueeze(0)

    with torch.no_grad():
        teamResult = nn_model(matchVector)
        probability = torch.sigmoid(teamResult)     # shape still [batch_size, 1]
        blueWin = (probability >= 0.5).int()

    return {
            # "predictedResult": teamResult.numpy().tolist()[0], 
            "probability": probability.tolist()[0][0], 
            "blueWin": blueWin.tolist()[0][0],
            # "teamOneStats": teamOneStats,
            # "teamTwoStats": teamTwoStats,
            }