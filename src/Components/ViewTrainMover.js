  
import React, { useEffect, useState } from "react";
import './../Styles/ViewMaintenance.css';
import axios from 'axios';

const ViewTrainMover = () => {
    const axios = require('axios');
    const [trains, setTrains] = useState([]);
    const [stations, setStations] = useState([]);
    const [train, moveTrain] = useState();
    const [error, setError] = useState([]);

    
    useEffect(() => {
        loadAllStations();
        // Load all stations
        axios.get('http://localhost:3001/move/stations/')
        .then(response => setStations(response.data))
        .catch((e) => console.log(e))
    },[]) 


    // TO DO
    // Bonus: Load all info about that one train
    // Bonus: Give feedback about successful change
    // Bonus: Handle multiple requests?
    // Design 

    const loadAllStations = () => {
          // Load all trains and their current station
          axios.get('http://localhost:3001/move/')
          .then(response => setTrains(response.data))
          .catch((e) => console.log(e));
    }

    const loadStation = () => {
        // Load the station where the train is currently standing
        let selectedTrain = document.querySelector('#train-list').value;
        selectedTrain = Number(selectedTrain.slice(0, 2));
        const trainInfo = trains.find(set => set.train_id === selectedTrain);
        moveTrain(trainInfo);
        document.querySelector('#current-station').innerHTML = trainInfo.station;
    }

    const resetInput = () => {
        document.querySelector('#train-list').value = "";
        document.querySelector('#station-list').value = "";
        document.querySelector('#current-station').innerHTML = "";
    }


    const sendTrain = () => {
        // Find Station ID and paste it to the state
        const selectedStation = document.querySelector('#station-list').value;
        const stationId = stations.find(set => set.name === selectedStation).id;
        axios.put(`http://localhost:3001/move/${train.train_id}?station=${stationId}`)
        .then(response => console.log(response))
        .then(loadAllStations())
        .then(resetInput())
        .catch((e) => console.log(e)); 
    }

    return (
        <div className="railway-maintenance">
            <h1>Move a train</h1>
            {trains ? (
                <div> 
                <table>
                    <thead>
                        <tr>
                            <th className="col-id">ID</th>
                            <th className="col-name">Train</th>
                            <th className="col-stationname">Station</th>
                            <th className="col-hasChanges">Changed?</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr>
                            <td>
                            <select id='train-list' onChange={loadStation}>
                                <option disabled selected value> -- select a train -- </option>
                                {trains.map((set, index) => (
                                    <option key={index}>{set.train_id} - {set.train}</option>
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
                        </tr>
                    </tbody>
                </table>
                <button onClick={sendTrain}>Submit</button>
                </div>
                ) : <p>Data currently loading</p>
            }
        </div>
    );
  };
  export default ViewTrainMover;