  
import React, { useEffect, useState } from "react";
import './../Styles/ViewTrainMover.css';

const ViewTrainMover = (props) => {
    const {stationid} = props.match.params;
    const {history} = props;
    /* const [data, setData] = useState([]);
    const [error, setError] = useState(""); */
  
    return (
        <div className="railway-train-mover">View Template</div>
    );
  };
  export default ViewTrainMover;