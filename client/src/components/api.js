
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

  if (!response.ok) {
    throw new Error(response.json().message)
  }
  return response.json()
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

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
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

  if (!response.ok) {
    throw new Error(response.json().message)
  }
  return response.json()
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