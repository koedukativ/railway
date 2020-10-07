import React, { useEffect, useState } from "react";
import axios from "axios";
import * as APIconfig from "./APIconfig";
import "./../Styles/AllTrains.css";

const AllTrains = (props) => {
  const [trains, setTrains] = useState([]);

  /* useEffect(() => {
    fetch(APIconfig.baseURL + "trains/")
      .then((rawData) => rawData.json())
      .then((data) => setTrains(data))
      .catch((e) => console.log("error message", e.message));
  }, []); */

  useEffect(async () => {
    const getTrains = await axios.get(APIconfig.baseURL + "trains/");
    setTrains(getTrains.data);
  }, []);

  return (
    <div className="all-trains">
      <h1>All Trains</h1>
      {trains ? (
        <table>
          <thead>
            <tr>
              <th className="col-id">ID</th>
              <th className="col-name">Name</th>
              <th className="col-company">Company</th>
              <th className="col-length">Length</th>
              <th className="col-maintenance">Maintenance</th>
              <th className="col-current_station">Current Station</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train, index) => (
              <tr key={train.id}>
                <td className="col-id">{train.id}</td>
                <td className="col-name">{train.name}</td>
                <td className="col-company">{train.company}</td>
                <td className="col-length">{train.length} m</td>
                <td className="col-maintenance2">
                  <input type="checkbox" checked={train.maintenance} readOnly />
                </td>
                <td className="col-current_station2">{train.stationname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default AllTrains;
