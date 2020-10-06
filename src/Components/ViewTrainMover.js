  
import React, { useEffect, useState } from "react";
import "./../Styles/ViewMaintenance.css";
import axios from "axios";
import * as APIconfig from "./APIconfig";

const ViewTrainMover = () => {
    const [trains, setTrains] = useState([]);
    const [stations, setStations] = useState([]);
    const [movement, setMovement] = useState([]);
    const [changeCounter, setChangeCounter] = useState(0);
    
    useEffect(() => {
        loadAllTrains();

        // Load all stations
        axios.get(APIconfig.baseURL+"move/stations/")
        .then(response => setStations(response.data))
        .catch((e) => console.log(e))
    },[]) 

    const loadAllTrains = () => {

        const getTrains = async () => {
            const loadedTrains = await axios.get(APIconfig.baseURL+"move/");
            setTrains(loadedTrains.data);
        }

         // Change Counter is reset to 0 upon loading
        setChangeCounter(0);
        getTrains();
    }

    const sendTrains = () => {
        // Contruct correct axios request from array
        let moveTrains = "", moveStations = "";
        movement.forEach((element) => {
            moveTrains += `${element[0]},`;
            moveStations += `${element[1]},`;
        })
        moveTrains = moveTrains.slice(0, -1);
        moveStations = moveStations.slice(0, -1);
        axios.put(APIconfig.baseURL+`move?trains=${moveTrains}&stations=${moveStations}`)
            .then(response => {
                console.log(response);
                loadAllTrains();
            })
            .catch((e) => console.log(e)); 
    }

    const handleStationChange = (train) => {
        let selectedStation = document.querySelector(`#station-${train}`);
        let movementCopy = movement;
        // Check if the station was changed back to the original station
        if (selectedStation.value === trains[train-1].station) {
            setChangeCounter(changeCounter - 1);
        } else {
            // Add desired movement to Movement array and increment change Counter
            setChangeCounter(changeCounter + 1);
            movementCopy.push([train, selectedStation.selectedIndex]);
            setMovement(movementCopy);
        }

    }

    return (
        <div className="railway-maintenance">
            <h1>Move a train</h1>
            <p>Move a train to another station using the drop-down menu. Submit all changes with the button below.</p>
            {trains.length ? (
                <div> 
                <table>
                    <thead>
                        <tr>
                            <th className="col-id">ID</th>
                            <th className="col-name">Train</th>
                            <th className="col-company">Company</th>
                            <th className="col-stationname">Station</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trains.map((set, index) => (
                        <tr key={index}>
                            <td className="col-id">{set.train_id}</td>
                            <td className="col-name">{set.train}</td>

                            <td className="col-company">{set.company}</td>

                            <td className="col-stationname">
                                <select id={`station-${set.train_id}`} onChange={() => handleStationChange(set.train_id)}>
                                    <option>{set.station}</option>
                                        {stations.map((set, index) => (
                                    <option key={set.id}>{set.name}</option>
                                ))}
                                </select>
                            </td>
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