import React from 'react';
import './card.css'

const ClubCard = ({data, handleFetchClub}) => {


  return(
    <>
      { data?.data.length 
      ? data?.data.map(({name, id}) =>(
      <div className="card-wrapper" key={id}>
        <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">{name.toUpperCase()}</h5>
          <button className="btn btn-success btn-sm" onClick={()=>{handleFetchClub(id)}} >View Club</button>
        </div>
      </div>
    </div>
    )) 
    : <div><h6>You are yet to join any club</h6></div>
    }
  </>

  )
}

export default ClubCard