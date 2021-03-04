
const token = localStorage.getItem("token");

export const fetchUserClubs = async()=>{
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/clubs`,{
    headers: {
      'Authorization': token,
    }
  })
  if (!response.ok) {
    throw new Error("Something went wrong.")
  }

  return response.json()
}

export const createClub = async(name)=>{
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/profileclub`, {
    method: "POST",
    headers: {
      'Authorization': token,
      "content-Type": "application/json"
    },
    body: JSON.stringify({name})
  })

  if (!response.ok) {
    throw new Error("Something went wrong.")
  }
  return response.json()
}

export const createInvite = async({club_id, email})=>{
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/invite/${club_id}`, {
    method: "POST",
    headers: {
      'Authorization': token,
      "content-Type": "application/json"
    },
    body: JSON.stringify({invitee_email: email})
  })

  const result = await response.json()
  if (!response.ok) {
    return Promise.reject(result.error)
  }

  return result
}

export const fetchClubMembers = async({queryKey})=>{
  const [_key, { id }] = queryKey;
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/members/${id}`,{
    headers: {
      'Authorization': token,
    }
  })

  if (!response.ok) {
    throw new Error("Something went wrong.")
  }

  return response.json()
}

export const fetchUserPendingInvitations = async({queryKey})=>{
  const [_key, { user_email }] = queryKey;
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/invite/${user_email}`,{
    headers: {
      'Authorization': token,
    }
  })

  if (!response.ok) {
    throw new Error("Something went wrong.")
  }

  return response.json()
}

export const login = async({email, password})=>{
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Authorization': token,
      "content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })

  const result = await response.json()
  if (!response.ok) {
    return Promise.reject(result.error)
  }

  return result
}
export const register = async({email, password, name})=>{
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Authorization': token,
      "content-Type": "application/json"
    },
    body: JSON.stringify({email, password, name})
  })

  const result = await response.json()
  if (!response.ok) {
    return Promise.reject(result.error)
  }

  return result
}

export const acceptRejectClub = async({decission, id, club_id})=>{
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/joinclub/${club_id}`, {
    method: "POST",
    headers: {
      'Authorization': token,
      "content-Type": "application/json"
    },
    body: JSON.stringify({decission, invite_id: id})
  })

  if (!response.ok) {
    throw new Error(response.json().message)
  }
  return response.json()
}

export const getSingleClubById = async({queryKey})=>{
  const [_key, { club_id }] = queryKey;
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/clubs/${club_id}`,{
    headers: {
      'Authorization': token,
    }
  })

  if (!response.ok) {
    throw new Error("Something went wrong.")
  }

  return response.json()
}

export const deleteMemberById = async({ user_club_id,club_id })=>{
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/remove/${user_club_id}/${club_id}`,{
    method: "DELETE",
    headers: {
      'Authorization': token,
      "content-Type": "application/json"
    },
  })

  if (!response.ok) {
    throw new Error("Something went wrong.")
  }

  return response.json()
}

export const getReport = async({queryKey})=>{
  const [_key, { club_id }] = queryKey;
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/report/${club_id}`,{
    headers: {
      'Authorization': token,
    }
  })

  if (!response.ok) {
    throw new Error("Something went wrong.")
  }

  return response.json()
}