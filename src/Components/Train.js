import React from 'react';

const Train = ({name, city, station, length, id }) => {
    return(
        <div key={id} className="train-option-picker">
                        
        <table className="railway-station-table">
            <thead className="railway-station-table-head">
            <tr className="railway-station-table-column-head">
                <th>Name</th>
                <th>Company</th>
                <th>Current Station</th>
                <th>Length</th>
                
            </tr>
            </thead>

            <tbody className="railway-station-table-body">
            <tr className= "railway-station-table-column-head">
                <td>{name}</td>
                <td>{city}</td>
                <td>{station}</td>
                <td>{length}</td>
              
            </tr>
            </tbody>
        </table>
       </div> 
    )
}

export default Train;