import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ViewGeneral from "./Components/ViewGeneral";
import ViewTrainMover from "./Components/ViewTrainMover";
import ViewMaintenance from "./Components/ViewMaintenance";
import ViewTrainByStation from "./Components/ViewTrainByStation";
import './App.css';

function App() {
  return (
      <Router>
      <div className="railway">
        
        <header className="railway-header"><h1>Railway Group Exercise</h1></header>
        
        <nav>
          <div className="railway-menu">
            <Link to="/">Overview </Link>
            <Link to="/train-mover/">Move Trains </Link>
            <Link to="/maintenance/">Train Maintenance </Link>
            <Link to="/trains-by-station/">View Trains By Station </Link>
          </div>
        </nav>

        {<div className="railway-content">
           <main>
            <Switch>
              <Route exact path="/" component={ViewGeneral} />
              <Route exact path="/train-mover/" component={ViewTrainMover} />
              <Route exact path="/maintenance/" component={ViewMaintenance} />
              <Route exact path="/trains-by-station/" component={ViewTrainByStation} />
            </Switch>
            </main>
          </div>
        }
      </div>
    </Router>
  );
}
/* views
- Thomas: General view (1) & Fetch all trains and stops (1/2)
- Zee: Train by Station (2) & Fetch by specific station (5)
- Jan: Train Maintenance (3) & Send to Maintenance (3)
- Josh:  Train Mover (2) & Sent to specific station (4)
*/


export default App;
