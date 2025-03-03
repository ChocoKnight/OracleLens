// import React from 'react';
import TopBar from '../components/Navbars/TopBar'
import TeamInfo from '../components/TeamComparisonInfo'
import TeamSearch from '../components/TeamSearch'
import '../styles/Prediction.css'

function Main() {
    return (
        <div>
            <TopBar></TopBar>
            <h2>
                Predictions
            </h2>
            <div className='prediction-container'>
                <div className='team-info'>
                    <TeamSearch></TeamSearch>
                    Team One
                    <TeamInfo></TeamInfo>
                </div>
                <div className='prediction-info'>
                    Predictions
                </div>
                <div className='team-info'>
                    Team Two
                </div>
            </div>
        </div>
    )
}

export default Main;