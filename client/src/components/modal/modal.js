import React, {useState} from 'react';
import {useMutation, useQueryClient} from 'react-query'

import {createClub} from '../api'
import './modal.css'


const ModalComponent = () => {
const [name, setName] = useState('');

const queryClient = useQueryClient()


  const {mutateAsync} = useMutation(createClub, {
    onSuccess: ()=>{
      console.log('success');
    }
  });

  const handleCreateClub = async()=>{
    mutateAsync(name)
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
      <input 
      className="form-control me-2 mb-2"  
      value={name}
      placeholder="Club Name" 
      onChange={({ target: { value } }) => setName(value)}
      />
      <button className="btn btn-primary" onClick={handleCreateClub}>Create</button>
    </form>
    </div>
  </div>
</div>

  )
}

export default ModalComponent