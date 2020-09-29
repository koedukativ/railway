  
import React, { useEffect, useState } from "react";
import './../Styles/ViewGeneral.css';

const ViewGeneral = (props) => {
    const {stationid} = props.match.params;
    const {history} = props;
    /* const [data, setData] = useState([]);
    const [error, setError] = useState(""); */
  
    return (
        <div className="railway-general">View Template</div>
    );
  };
  export default ViewGeneral;