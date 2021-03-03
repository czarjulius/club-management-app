import React, {useState} from 'react';
import { useMutation, useQueryClient} from 'react-query'
import { createInvite } from './api'


const InviteForm = ({club_id}) => {
  const [email, setEmail] = useState('');

  const queryClient = useQueryClient()


  const {mutateAsync} = useMutation(createInvite, {
    onSuccess: ()=>{
      console.log('success');
    }
  });

  const handleInvitation = async(e)=>{
    e.preventDefault()
    await mutateAsync({club_id, email})
    queryClient.invalidateQueries('clubs')
    setEmail('')
  }


  return(
    <form className="d-flex">
      <input 
      className="form-control me-2"
        type="email" 
        value={email}
        placeholder="Friend's Email"
        onChange={({ target: { value } }) => setEmail(value)}
        />
      <button className="btn btn-success" onClick={handleInvitation}>Invite</button>
    </form>
  )
}

export default InviteForm