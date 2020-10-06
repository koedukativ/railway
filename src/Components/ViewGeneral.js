import React from "react";
import "./../Styles/ViewGeneral.css";
import AllStations from "./AllStations";
import AllTrains from "./AllTrains";

const ViewGeneral = () => {
  return (
    <div className="railway-general">
      <AllStations />
      <AllTrains />
    </div>
  );
};
export default ViewGeneral;
