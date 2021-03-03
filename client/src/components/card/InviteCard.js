import React from 'react';
import {useQuery, useMutation, useQueryClient} from 'react-query'

import './card.css'

import { fetchUserPendingInvitations, acceptRejectClub } from '../api'

const InviteCard = ({email}) => {
  const queryClient = useQueryClient()

  const {data} = useQuery(["pending_invites", {user_email:email}], fetchUserPendingInvitations)

  const {mutateAsync} = useMutation(acceptRejectClub, {
    onSuccess: ()=>{
      console.log('success');
    }
  });

  const handleDecission = async(id, decission, club_id)=>{
    await mutateAsync({decission, id, club_id})
    queryClient.invalidateQueries('pending_invites')
  }

  return(
    <>
    {data?.data.map(({id, sender, club, club_id})=>(
        <div className="card-wrapper" key={id}>
          <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">{club}</h5>
            <p className="card-text"><i>{sender}</i> is inviting you to join <i>{club}</i></p>
            <button className="btn btn-success btn-sm" onClick={() => handleDecission(id,'accepted', club_id)}>Accept</button>
            
            <button className="btn btn-danger btn-sm" onClick={() => handleDecission(id,'rejected', club_id)}>Decline</button> 
          </div>
        </div>
      </div>
    ))}
    </>

  )
}

export default InviteCard