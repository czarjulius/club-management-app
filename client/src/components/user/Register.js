import React, {useState} from 'react';
import {useMutation } from 'react-query'
import {Link, useHistory} from 'react-router-dom';

import {register} from '../api'
import './user.css'


const Register = () => {
  const [user, setUser] = useState({email:'', password:'', name:''});
  const history = useHistory()

  const {mutateAsync} = useMutation(register, {
    onSuccess: () => history.push("/")
  });

  const handleOnChange = async({ target: { name, value } })=>{
    setUser({...user, [name]: value})
  }

  const handleLogin = async(e)=>{
    e.preventDefault()

    mutateAsync(user)
    setUser({email:'', password:'', name:''})

  }

  return(
    <div className="user-form-wrapper">
      <form>
      <h3>Register</h3>
        <hr/>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Name:</label>
            <div className="col-sm-9">
              <input 
              required 
              type="text" 
              className="form-control" 
              id="inputEmail3" 
              name="name"
              onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Email:</label>
            <div className="col-sm-9">
              <input 
              required 
              type="email" 
              className="form-control" 
              id="inputEmail3" 
              name="email"
              onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Password:</label>
            <div className="col-sm-9">
              <input 
              required 
              type="password" 
              className="form-control" 
              id="inputPassword3" 
              name="password"
              onChange={handleOnChange}
              />
            </div>
          </div>
          
          <button className="btn btn-success" onClick={handleLogin}>Sign Up</button>
          <p>Already have account:  <Link to="/">Sign In</Link> </p>
      </form>

    </div>

  )
}

export default Register