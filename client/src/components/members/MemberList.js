import React from 'react';
import {useQuery} from 'react-query'
import clsx from "clsx";

import { fetchClubMembers } from '../api'

const MemberList = ({id}) => {

  const {data, error, isLoading, isError } = useQuery(["members", {id}], fetchClubMembers)

  return(
    <>
    {data?.data.map(({name, id}) =>(
      <li className="list-group-item d-flex justify-content-between align-items-center" key={id}>
      {name}
      <button type="button" className="btn btn-danger btn-sm"> Remove </button>
    </li>
    ))}
  </>

  )
}

export default MemberList