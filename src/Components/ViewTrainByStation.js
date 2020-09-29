  
import React, { useEffect, useState } from "react";
import './../Styles/ViewTrainByStation.css';

const ViewTrainByStation = (props) => {
    const {stationid} = props.match.params;
    const {history} = props;
    /* const [data, setData] = useState([]);
    const [error, setError] = useState(""); */
  
    return (
        <div className="railway-station">View Template</div>
    );
  };
  export default ViewTrainByStation;