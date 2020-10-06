import React, { useEffect, useState } from "react";
import "./../Styles/AllStations.css";

const AllStations = (props) => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/stations")
      .then((rawData) => rawData.json())
      .then((data) => setStations(data))
      .catch((e) => console.log("error message", e.message));
  }, []);

  return (
    <div className="all-stations">
      <h1>All Stations</h1>
      {stations ? (
        <table>
          <thead>
            <tr>
              <th className="col-id">ID</th>
              <th className="col-name">Name</th>
              <th className="col-city">City</th>
              <th className="col-country">Country</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station, index) => (
              <tr key={station.id}>
                <td className="col-id">{station.id}</td>
                <td className="col-name">{station.name}</td>
                <td className="col-city">{station.city}</td>
                <td className="col-country">{station.country}</td>
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

export default AllStations;
