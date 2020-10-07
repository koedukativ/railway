import React, { useEffect, useState } from "react";
import "./../Styles/AllTrains.css";

const AllTrains = (props) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/trains")
      .then((rawData) => rawData.json())
      .then((data) => setTrains(data))
      .catch((e) => console.log("error message", e.message));
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
                <td className="col-length">{train.length}m</td>
                <th className="col-maintenance">{train.maintenance}</th>
                <th className="col-current_station">{train.stationname}</th>
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
