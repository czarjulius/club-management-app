import React, {useState} from 'react';
import { useMutation, useQueryClient} from 'react-query'
import { createInvite } from './api'


const InviteForm = ({club_id}) => {
  const [email, setEmail] = useState('');

  const queryClient = useQueryClient()


  const {mutateAsync, data, error} = useMutation(createInvite);

  const handleInvitation = async(e)=>{
    e.preventDefault()
    await mutateAsync({club_id, email}, {
      onSuccess: (data)=>{
        console.log(data, 'datadatadata');
      }
    })
    queryClient.invalidateQueries('clubs')
    setEmail('')
  }


  return(
    <>
    {data && (
          <div className="alert alert-success" role="alert">
            {data.message}
          </div>

        )}
    {error && (
          <div className="alert alert-danger" role="alert">
            Cross check your input 
          </div>

        )}
    <form className="d-flex">
      <input 
      className="form-control me-2"
      required
        type="email" 
        value={email}
        placeholder="Friend's Email"
        onChange={({ target: { value } }) => setEmail(value)}
        />
      <button className="btn btn-success" type="submit" onClick={handleInvitation}>Invite</button>

    </form>
    </>
  )
}

export default InviteForm