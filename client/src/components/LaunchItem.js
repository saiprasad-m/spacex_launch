import React from 'react'
import classNames from 'classnames'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'

export default function LaunchItem({
    launch: {
        flight_number, 
        mission_name, 
        launch_date_local, 
        launch_success
    }}) {

  return (
  
        <div className="card card-body mb-1 mx-1">
         <div className="row">
            <div className="col-md-9">
            <h6>Mission: <span className={classNames({
                'text-success': launch_success,
                'text-danger': !launch_success && launch_success !== null,
                'text-warning': launch_success === null && !launch_success
            })}>{mission_name}</span></h6>
            <p> Date: <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment></p>
            </div>
            <div className="col-md-3">
                <Link to={`/launch/${flight_number}`} className="btn btn-secondary">Launch Details</Link> 
            </div>
         </div>
        </div>

  )
}
 