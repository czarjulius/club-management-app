import React, {useState} from 'react';
import {useMutation, useQueryClient} from 'react-query'

import {createClub} from '../api'
import './modal.css'


const ModalComponent = () => {
const [name, setName] = useState('');

const queryClient = useQueryClient()


  const {mutateAsync, data, error} = useMutation(createClub);

  const handleCreateClub = async()=>{
    mutateAsync(name, {
      onSuccess: (data)=>{
        console.log('success');
      }
    })
    queryClient.invalidateQueries('clubs')
    setName('')

  }

  return(
    <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
    <div className="modal-header">
        <h5 className="modal-title">Create Club</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    <form className="form-wrapper">
    {data && (
          <div className="alert alert-success" role="alert">
            {data.message}
          </div>

        )}
    {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>

        )}

      <input 
      required
      className="form-control me-2 mb-2"  
      value={name}
      placeholder="Club Name" 
      onChange={({ target: { value } }) => setName(value)}
      />
      <button className="btn btn-primary" onClick={handleCreateClub} type="submit">Create</button>
    </form>
    </div>
  </div>
</div>

  )
}

export default ModalComponent