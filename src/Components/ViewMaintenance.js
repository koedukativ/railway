  
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './../Styles/ViewMaintenance.css';

const ViewMaintenance = (props) => {
    const {stationid} = props.match.params;
    const {history} = props;
    /* const [data, setData] = useState([]);
    const [error, setError] = useState(""); */
  
    return (
        <div className="railway-maintenance">
            



        </div>
    );
  };
  export default ViewMaintenance;