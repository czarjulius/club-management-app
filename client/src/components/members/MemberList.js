import React, {useState, useEffect} from 'react';
import {useQuery, useMutation, useQueryClient} from 'react-query'
import clsx from "clsx";

import { fetchClubMembers, deleteMemberById } from '../api'

const MemberList = ({id, isAdmin}) => {
  
  const {data } = useQuery(["members", {id}], fetchClubMembers)

  const queryClient = useQueryClient()


  const {mutateAsync} = useMutation(deleteMemberById, {
    onSuccess: ()=>{
      console.log('success');
    }
  });

  const handleDeleteMember = async(user_club_id)=>{
    mutateAsync({user_club_id, club_id:id})
    queryClient.invalidateQueries('members')
  }

  return(
    <>
    {data?.data.map(({name, id , user_club_id}) =>(
      <li className="list-group-item d-flex justify-content-between align-items-center" key={id}>
      {name}

      <button type="button" className={clsx("btn btn-danger btn-sm", !isAdmin && "disabled")} onClick={() =>handleDeleteMember(user_club_id)}> 
      Remove
      </button>

    </li>
    ))}
  </>

  )
}

export default MemberList