  
import React, { useEffect, useState } from "react";
import './../Styles/ViewTrainMover.css';
import axios from 'axios';

const ViewTrainMover = () => {
    const axios = require('axios');
    const [data, setData] = useState([]);
    const [error, setError] = useState([]);

    // Load all trains and their current station
    useEffect(() => {
        axios.get('http://localhost:3001/move/')
        .then(response => setData(response.data))
    },[]) 


    // TO DO
    // Load train.id and station.id via backend
    // Display Current Station correctly
    // Generate state: Train.ID, Current Station.ID, Send to Station.ID
    // put request to server
    // Bonus: Handle multiple requests?


    const loadStation = () => {
        const currentStation = document.querySelector('#train-list').value;
        document.querySelector('#current-station').innerHTML = currentStation;
    }

    return (
        <div className="railway-train-mover">
            <h1>Move a train</h1>
            {data ? (
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
                                {data.map((set, index) => (
                                    <option key={index}>{set.train}</option>
                                ))}
                            </select>
                            </td>
                            <td id='current-station'></td>
                            <td>
                            <select id='station-list'>
                                <option disabled selected value> -- select a station -- </option>
                                {data.map((set, index) => (
                                    <option key={index}>{set.station}</option>
                                ))}
                            </select>
                            </td>
                            <td><button>Submit</button></td>
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