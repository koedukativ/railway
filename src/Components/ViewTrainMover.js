  
import React, { useEffect, useState } from "react";
import './../Styles/ViewTrainMover.css';
import axios from 'axios';

const ViewTrainMover = () => {
    const axios = require('axios');
    const [trains, setTrains] = useState([]);
    const [stations, setStations] = useState([]);
    const [train, moveTrain] = useState();
    const [error, setError] = useState([]);

    
    useEffect(() => {
        // Load all trains and their current station
        axios.get('http://localhost:3001/move/')
        .then(response => setTrains(response.data))
        .catch((e) => console.log(e));

        // Load all stations
        axios.get('http://localhost:3001/move/stations/')
        .then(response => setStations(response.data))
        .catch((e) => console.log(e))
    },[]) 


    // TO DO
    // send request to server
    // Update view
    // Bonus: Load all info about that one train
    // Bonus: Handle multiple requests?


    const loadStation = () => {
        // Load the station where the train is currently standing
        const selectedTrain = document.querySelector('#train-list').value;
        const trainInfo = trains.find(set => set.train === selectedTrain);
        moveTrain(trainInfo);
        document.querySelector('#current-station').innerHTML = trainInfo.station;
    }

    const sendTrain = () => {
        // Find Station ID and paste it to the state
        const selectedStation = document.querySelector('#station-list').value;
        const stationId = stations.find(set => set.name === selectedStation).id;
        console.log(stationId);
        axios.put(`http://localhost:3001/move/${train.train_id}?station=${stationId}`)
        .then(response => console.log(response))
        .catch((e) => console.log(e)); 
        loadStation();
    }

    return (
        <div className="railway-train-mover">
            <h1>Move a train</h1>
            {trains ? (
                <div> 
                <table>
                    <thead>
                        <tr>
                            <th>Train</th>
                            <th>Current Station</th>
                            <th>Send to</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                            <select id='train-list' onChange={loadStation}>
                                <option disabled selected value> -- select a train -- </option>
                                {trains.map((set, index) => (
                                    <option key={index}>{set.train}</option>
                                ))}
                            </select>
                            </td>
                            <td id='current-station'></td>
                            <td>
                            <select id='station-list'>
                                <option disabled selected value> -- select a station -- </option>
                                {stations.map((set, index) => (
                                    <option key={index}>{set.name}</option>
                                ))}
                            </select>
                            </td>
                            <td><button onClick={sendTrain}>Submit</button></td>
                        </tr>
                    </tbody>
                </table>
                </div>
                ) : <p>Data currently loading</p>
            }
        </div>
    );
  };
  export default ViewTrainMover;