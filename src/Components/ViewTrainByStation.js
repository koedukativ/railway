  
import React, { useEffect, useState } from "react";
import './../Styles/ViewTrainByStation.css';
import axios from 'axios';
import * as APIconfig from "./APIconfig";

const ViewTrainByStation = () => {
    const [train, setTrain] = useState([]);
    const [dropdown, setDropdown] = useState([]);
  
//Stations for SELECT - dropwdown 
useEffect(() => {
   const fetchStations = async () => {
    const stationDropdown = await axios.get(APIconfig.baseURL + "stations");
    
    setDropdown(
      stationDropdown.data.map(({id, dropdownlabel}) => {
        return {label:dropdownlabel,value:id}})
        );
  }
  fetchStations();

},[])

//Select train by specific station - onChange handler
const optionHandler = (value) => {
dropdown.map((elem) => {
  
  if (elem.label === value) {
  return(  
     axios.get(`${APIconfig.baseURL}stations/${elem.value}`)
    .then(data => setTrain(data))
    .catch(err=>console.log(err))
   )
   }
 })
}

//Show all trains handler
const showAllTrains = () => {
  axios.get(APIconfig.baseURL + "stations/allTrains")
  .then(data => setTrain(data))
  .catch(err => console.log(err));
   }


return (
 <div className = "railway-station">
   <div className = "train-description-centering">
   <p >Select train by station</p>

{/* Station dropdown menu */}

    <select className = "train-description-centering select-by-station" onChange={(e) => optionHandler(e.target.value)} >
      <option>Select train by station</option>
      {dropdown.map((item, index)=>{
         return <option className="hidden" key={index} value={item.id}> {item.label} </option>})}
    </select>   

<button className="train-description-centering show-all-button" onClick={showAllTrains}>Show all trains</button>

</div>
{/* Train component rendering */}
   {train.data ? train.data.map((elem) => {
      return(
        <div key={elem.id} className="train-option-picker">
                        
        <table className = "railway-station-table">
            <thead className = "railway-station-table-head">
            <tr className="railway-station-table-column-head">
                <th>Name</th>
                <th>Company</th>
                <th>Current Station</th>
                <th>Length</th>
            </tr>
            </thead>

            <tbody className = "railway-station-table-body">
            <tr className= "railway-station-table-column-head">
                <td>{elem.name}</td>
                <td>{elem.company}</td>
                <td>{elem.current_station}</td>
                <td>{elem.length}</td>
              
            </tr>
            </tbody>
        </table>
       </div> ) 
       }):null}

  </div>
    );
  };
  export default ViewTrainByStation;