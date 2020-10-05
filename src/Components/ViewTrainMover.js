  
import React, { useEffect, useState } from "react";
import './../Styles/ViewMaintenance.css';
import axios from 'axios';
import * as APIconfig from "./APIconfig";

const ViewTrainMover = () => {
    const axios = require('axios');
    const [trains, setTrains] = useState([]);
    const [stations, setStations] = useState([]);
    const [movement, setMovement] = useState([]);
    const [changeCounter, setChangeCounter] = useState(0);

    
    useEffect(() => {
        loadAllTrains();
        // Load all stations
        axios.get(APIconfig.baseURL+'move/stations/')
        .then(response => setStations(response.data))
        .catch((e) => console.log(e))
    },[]) 


    // TO DO
    // Bonus: Give feedback about successful change
    // Reset Form & Data reload
    // Bonus: Additional check

    const loadAllTrains = () => {
          // Load all trains and their current station
        setChangeCounter(0);
        axios.get(APIconfig.baseURL+'move/')
          .then(response => setTrains(response.data))
          .then(addChangeCounter())
          .catch((e) => console.log(e));
    }

    const addChangeCounter = () => {
        const newData = trains.map((set) => ({...set, changes: false}));
        setTrains(newData); 
    }

    const sendTrains = () => {
        // Contruct correct axios request from array
        let moveTrains = "", moveStations = "";
        movement.map((element) => {
            moveTrains += `${element[0]},`;
            moveStations += `${element[1]},`;
        })
        moveTrains = moveTrains.slice(0, -1);
        moveStations = moveStations.slice(0, -1);
        console.log(moveStations);
        axios.put(APIconfig.baseURL+`move?trains=${moveTrains}&stations=${moveStations}`)
            .then(response => {
                console.log(response);
                loadAllTrains();
            })
            .catch((e) => console.log(e)); 
    }

    const handleStationChange = (train) => {
        let selectedStation = document.querySelector(`#station-${train}`).value;
        let movementCopy = movement;
        let trainCopy = [...trains];
        // Add desired movement to Movement array
        selectedStation = Number(selectedStation.slice(0,2));
        movementCopy.push([train, selectedStation]);
        setMovement(movementCopy);
        // Set row to changed
        // !!! Additional Check needed here: did a change really take place?
        trainCopy[train-1].changes = true;
        setTrains(trainCopy);
        setChangeCounter(changeCounter + 1);
    }

    return (
        <div className="railway-maintenance">
            <h1>Move a train</h1>
            <p>Move a train to another station using the drop-down menu. Submit all changes with the button below.</p>
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
                        {trains.map((set, index) => (
                        <tr key={index}>
                            <td className="col-id">{set.train_id}</td>
                            <td className="col-name">{set.train}</td>
                            <td className="col-stationname">
                                <select id={`station-${set.train_id}`} onChange={() => handleStationChange(set.train_id)}>
                                    <option>{set.station}</option>
                                        {stations.map((set, index) => (
                                    <option key={index}>{set.id} - {set.name}</option>
                                ))}
                                </select>
                            </td>
                            <td className="col-hasChanges">{set.changes ? 'y':'n'}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div className="change-counter">{changeCounter} rows have pending changes.</div>
                <button className="btn-update" onClick={sendTrains}>Submit changes</button>
                </div>
                ) : <p>Data currently loading</p>
            }
        </div>
    );
  };
  export default ViewTrainMover;