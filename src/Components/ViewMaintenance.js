  
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './../Styles/ViewMaintenance.css';
import * as APIconfig from "./APIconfig";

const ViewMaintenance = () => {
    const [data, setData] = useState();
 
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
            APIconfig.baseURL+"maintenance/"
        );
   
        setData(result.data);
        //console.log(result.data);
      };
   
      fetchData();
    }, []);
  
    return (
        <div className="railway-maintenance">
            <h1>Railway Maintenance</h1>
            {data ? (
             <table>
                <thead>
                    <tr>
                        <th className="col-maintenance">Maintenance</th>
                        <th className="col-id">ID</th>
                        <th className="col-name">Name</th>
                        <th className="col-company">Company</th>
                        <th className="col-length">Length</th>
                        <th className="col-stationname">Current Station</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                    <tr key={item.id}>
                        <td className="col-maintenance"><input type="checkbox" defaultChecked={item.maintenance}></input></td>
                        <td className="col-id">{item.id}</td>
                        <td className="col-name">{item.name}</td>
                        <td className="col-company">{item.company}</td>
                        <td className="col-length">{item.length}<span className="unit-length">m</span></td>
                        <td className="col-stationname">{item.stationname}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            ):null}



        </div>
    );
  };
  export default ViewMaintenance;