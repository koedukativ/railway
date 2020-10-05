  
import React, { useEffect, useState } from "react";
import './../Styles/ViewTrainByStation.css';
import axios from 'axios';
import Train from './Train';

const ViewTrainByStation = (props) => {
    const [train, setTrain] = useState([]);
    const [dropdown, setDropdown] = useState([]);
    const [station, setStation] = useState([]);
  
  

//passing stations into dropdown 
useEffect(async() => {
  const stationDropdown = await axios.get("http://localhost:3001/stations");
  console.log(stationDropdown);
  setDropdown(stationDropdown.data.map(({id, dropdownlabel})=>{return {label:dropdownlabel,value:id}}));
}, []);


//Select train by specific station - onChange handler
const optionHandler = (value) => {
dropdown.map((elem) => {
  
  if (elem.label === value) {
  return(  
     axios.get(`http://localhost:3001/stations/${elem.value}`)
    .then(data => setTrain(data))
    .catch(err=>console.log(err))
   )
  }
})
    
     
   }

   //Show all trains
   const showAllTrains = () => {
    axios.get(`http://localhost:3001/stations/allTrains`)
    .then(data => setTrain(data))
    .catch(err=>console.log(err));
   }


return (
 <div className="railway-station">
   <div className="train-description-centering">
     
   
   <p >Select train by station</p>

{/* Station dropdown menu */}

    <select className="train-description-centering select-by-station" onChange={(e) => optionHandler(e.target.value)} >
      <option>Select train by station</option>
      {dropdown.map((item, index)=>{
         return <option key={index} value={item.id}> {item.label} </option>})}
    
    </select>         
<button className="train-description-centering show-all-button" onClick={showAllTrains}>Show all trains</button>
</div>
{/* Train component */}
   {train.data ? train.data.map((elem,index) => {
      return(
      <Train key={index} className=""

       name={elem.name}
       city={elem.company} 
       station={elem.current_station}
       length={elem.length}
       /> ) 
       }):null}

  </div>
    );
  };
  export default ViewTrainByStation;