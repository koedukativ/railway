  
import React, { useEffect, useState } from "react";
import './../Styles/ViewTrainByStation.css';
import axios from 'axios';

const ViewTrainByStation = (props) => {
    // const {stationid} = props.match.params;
    const [station, setStation] = useState({});

   useEffect(() => {
    axios.get('http://localhost:3000/stations').then(data => setStation(data)).catch(err=>console.log(err));

   }, []);
  console.log(station);
    return (
        <div className="railway-station">
            <h1>Train by Station</h1>
   
            {station.data ? station.data.map((element,index) => {
                return(
                    <div key={index}>
                        
                <table className="railway-station-table">
                    <thead className="railway-station-table-head">
                    <tr className="railway-station-table-column-head">
                        <th>Name</th>
                        <th>City</th>
                        <th>Company</th>
                        <th>Country</th>
                        <th>Length</th>
                        <th>Maintenance/Condition</th>
                    </tr>
                    </thead>

                    <tbody className="railway-station-table-body">
                    <tr className= "railway-station-table-column-head">
                        <td>{element.name}</td>
                        <td>{element.city}</td>
                        <td>{element.company}</td>
                        <td>{element.country}</td>
                        <td>{element.length}</td>
                        {element.maintenance === true ?<td>Good</td> : <td>Repair required</td> }
                    </tr>
                    </tbody>
                </table>
               </div> )
            }):null}

        </div>
    );
  };
  export default ViewTrainByStation;