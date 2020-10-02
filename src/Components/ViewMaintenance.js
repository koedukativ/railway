  
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './../Styles/ViewMaintenance.css';
import * as APIconfig from "./APIconfig";

const ViewMaintenance = () => {
    const [data, setData] = useState();
    const [changeCounter, setChangeCounter] = useState(0);
    const customHeader = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      };
 
    const getMaintenanceData = () => {
        // resets states because this is reused for reloading
        setData();
        setChangeCounter(0);
        const fetchData = async () => {
            const result = await axios.get(
                APIconfig.baseURL+"maintenance/"
            );
            // add new fields (initialState, hasChanges and index) to data
            const newData=result.data.map((item, index) => ({...item, initialState:item.maintenance, hasChanges: false, index:index }));
            setData(newData);
        };
        fetchData();
    }

    // updates maintenance data with 2 given arrays (of train ids)
    // trains that have been selected to go to maintenance: sendToMaintenance
    // trains that have been selected to return from maintenance: returnFromMaintenance
    const updateMaintenanceData = (sendToMaintenance, returnFromMaintenance) =>{
        const updateData = async (transferString) => {
            axios.put(APIconfig.baseURL+"maintenance", {
                    transferData: transferString
                    }, customHeader)
                    .then(function (response) {
                        console.log(response);
                        getMaintenanceData();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        };

        // create a new object to hold both arrays
        const transferObject={inMaintenance:sendToMaintenance, offMaintenance:returnFromMaintenance};
        
        // convert into a string that can be send in a query
        const transferString=JSON.stringify(transferObject);

        // call to update data
        updateData(transferString);
        
    }


    useEffect(() => {
      getMaintenanceData();
    }, []);

    const handleCheckbox=(e)=>{
        const checkbox=e.target;
        const clickedRow=checkbox.parentNode.parentNode;
        //const clickedId=checkbox.dataset.id;
        const clickedIndex=checkbox.dataset.index;
        // convert states from string to boolean
        const initialState=(checkbox.dataset.initialstate==="true");
        let state=(checkbox.dataset.checkstate==="true");
        // toggle state
        state=!state;
        checkbox.dataset.checkstate=state;

        const newData = [...data];

        // compare to initial state (from db fetching) to see whether row needs update
        // set class for visual marking and hasChanges value if it differs from initial
        // state
        if (state!==initialState){
            // data has been changed
            clickedRow.classList="changed-row";
            newData[clickedIndex].hasChanges=true;
            newData[clickedIndex].maintenance=state;
            setChangeCounter(changeCounter+1);
        }else{
            // data is unchanged (or returned to initial state), so it needs no update
            clickedRow.classList="";
            newData[clickedIndex].hasChanges=false;
            newData[clickedIndex].maintenance=state;
            setChangeCounter(changeCounter-1);
        }
               
        setData(newData);


    }



    const updateHandler = () => {
        const sendToMaintenance=[]
        const returnFromMaintenance=[]
        
        // push all pending changes (and only those)
        // into 2 different arrays
        data.map((item, i)=>{
            if (item.hasChanges) {
                if (item.maintenance){
                    sendToMaintenance.push(item.id);
                }else{
                    returnFromMaintenance.push(item.id);
                }
            }
            return null
        })

        updateMaintenanceData(sendToMaintenance, returnFromMaintenance);
        
    }
  
    return (
        <div className="railway-maintenance">
            <h1>Railway Maintenance</h1>
            <p>Change the maintenance status and click update. Changes are marked.</p>
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
                        <td className="col-maintenance"><input type="checkbox" data-index={item.index} data-id={item.id} data-initialstate={item.initialState} data-checkstate={item.maintenance} onChange={(e) => handleCheckbox(e)} defaultChecked={item.maintenance}></input></td>
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
            <div className="change-counter">{changeCounter} rows have pending changes.</div>
            <button className="btn-update" onClick={updateHandler} disabled={changeCounter===0}>Update Database</button>
            </>
            ):<h2>Loading...</h2>}



        </div>
    );
  };
  export default ViewMaintenance;