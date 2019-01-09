import React from 'react'

export default function MissionKey() {
  return (
    <div>
    <div className="row">
        <div className="col-md-2">
         <p>
              <span className="px-2 mr-1 bg-success" /> = Success
          </p>
      </div>
      <div className="col-md-2">
          <p>
              <span className="px-2 mr-1 bg-danger" /> = Fail
          </p>  
      </div>
      <div className="col-md-2">
          <p>
              <span className="px-2 mr-1 bg-warning" /> = TBD
          </p>  
      </div>
    </div>
    </div>
  )
}
