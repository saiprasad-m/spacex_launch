import React from 'react'

export default function MissionKey() {
  return (
    <div className="my-1">
    <div className="row">
        <div className="col-md-2">
         <p>
              <span className="px-3 mr-2 bg-success" /> = Success
          </p>
      </div>
      <div className="col-md-2">
          <p>
              <span className="px-3 mr-2 bg-danger" /> = Fail
          </p>  
      </div>
      <div className="col-md-2">
          <p>
              <span className="px-3 mr-2 bg-warning" /> = TBD
          </p>  
      </div>
    </div>
    </div>
  )
}
