import React, {useState, useEffect} from "react";
import {useQuery } from 'react-query'
import { useHistory } from 'react-router-dom';

import { fetchUserClubs, getSingleClubById } from '../api'
import './dashboard.css'
import ClubCard from '../card/ClubCard';
import InviteCard from '../card/InviteCard';
import Modal from '../modal/modal'
import MemberList from '../members/MemberList'
import authHelper from "../../utils/authToken";
import InviteForm from "../InviteForm";
import Chart from '../Chart'

const Dashboard = () => {
  const [club_id, setClub_id]= useState(0);
  const [isAdmin, setIsAdmin] = useState(false)

  const history = useHistory()

  const token = localStorage.getItem("token");
  if (!token) {
    history.push("/")
  }

  
  const checker = authHelper.validateToken(token);

  const {data} = useQuery("clubs", fetchUserClubs)

  const {data: singleClub} =  useQuery(["club", {club_id}], getSingleClubById)

  const handleFetchClub = async(id)=>{
    setClub_id(id)
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    history.push("/")

  };

  const user_id = checker?.id
  const club_admin_id = singleClub?.data.admin_id

  useEffect(()=>{
    if (user_id === club_admin_id) {
      setIsAdmin(true)
    }else{
      setIsAdmin(false)
    }
  },[club_admin_id])

  return(
      <div className="container">
      <div className="row wrapper">


        <div className="col-3">
          <div className="left-frame">
          <button type="button" className="btn btn-danger btn-sm" onClick={logoutHandler}>Logout</button>
          <hr/>
          <button type="button" className="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal"> + Create New Club</button>
          <Modal/>
          <hr/>
          <div className="card-wrapper">
            <h5>My Clubs</h5>
            <hr/>
            <ClubCard data={data} handleFetchClub={handleFetchClub}/>
          </div>
          </div>
        </div>


        <div className="col-6">
          <div className="middle-frame">
            <h2> { singleClub?.data.name.toUpperCase()}</h2>
            {club_id > 0 && (

              <InviteForm club_id={club_id}/>
            )
             }
            <hr/>
            <h5>Members of {singleClub?.data.name} club</h5>
            <ul className="list-group">
              <MemberList id={club_id} isAdmin={isAdmin} />
            </ul>

            <hr/>
            <h2>Daily Report Chart</h2>
            {isAdmin ?  <Chart club_id={club_id}/> : "Report is for admin only."}
           
          </div>
        </div>



        <div className="col-3">
          <div className="right-frame">
            <h2>Invitatons</h2>
            <hr/>
            <InviteCard email={checker?.email}/>
          </div>
        </div>
      </div>
    </div>

  )
}

;

export default Dashboard;
