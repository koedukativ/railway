  
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './../Styles/ViewMaintenance.css';
import * as APIconfig from "./APIconfig";

const ViewMaintenance = () => {
    const [data, setData] = useState();
    const [changeCounter, setChangeCounter] = useState(0);
 
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
            APIconfig.baseURL+"maintenance/"
        );
        // add new fields (hasChanges and index) to data
        const newData=result.data.map((item, index) => ({...item, hasChanges: false, index:index }));
        setData(newData);

        //console.log(result.data);
      };
   
      fetchData();
    }, []);

    const handleCheckbox=(e)=>{
        const checkbox=e.target;
        const clickedRow=checkbox.parentNode.parentNode;
        const clickedId=checkbox.dataset.id;
        const clickedIndex=checkbox.dataset.index;
        // convert states from string to boolean
        const initialstate=(checkbox.dataset.initialstate==="true");
        let state=(checkbox.dataset.checkstate==="true");
        // toggle state
        state=!state;
        checkbox.dataset.checkstate=state;

        //console.log(data);
        //console.log("checkbox clicked!",state,initialstate,id);

        const newData = [...data];

        // compare to initial state (from db fetching) to see whether row needs update
        // set class for visual marking and hasChanges value if it differs from initial
        // state
        if (state!==initialstate){
            clickedRow.classList="changed-row";
            newData[clickedIndex].hasChanges=true;
            console.log("has changed data",clickedRow.classList);
            setChangeCounter(changeCounter+1);
        }else{
            clickedRow.classList="";
            newData[clickedIndex].hasChanges=false;
            console.log("original data!",clickedRow.classList)
            setChangeCounter(changeCounter-1);
        }
               
        setData(newData);


    }
    
  
    return (
        <div className="railway-maintenance">
            <h1>Railway Maintenance</h1>
            {data ? (
             <>
             <table>
                <thead>
                    <tr>
                        <th className="col-maintenance">Maintenance</th>
                        <th className="col-id">ID</th>
                        <th className="col-name">Name</th>
                        <th className="col-company">Company</th>
                        <th className="col-length">Length</th>
                        <th className="col-stationname">Current Station</th>
                        <th className="col-hasChanges">changed?</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                    <tr key={item.id}>
                        <td className="col-maintenance"><input type="checkbox" data-index={item.index} data-id={item.id} data-initialstate={item.maintenance} data-checkstate={item.maintenance} onChange={(e) => handleCheckbox(e)} defaultChecked={item.maintenance}></input></td>
                        <td className="col-id">{item.id}</td>
                        <td className="col-name">{item.name}</td>
                        <td className="col-company">{item.company}</td>
                        <td className="col-length">{item.length}<span className="unit-length">m</span></td>
                        <td className="col-stationname">{item.stationname}</td>
                        <td className="col-hasChanges">{item.hasChanges?"y":"n"}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className="change-counter">{changeCounter} rows have been changed.</div>
            </>
            ):<h2>Loading...</h2>}



        </div>
    );
  };
  export default ViewMaintenance;