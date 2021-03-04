import React, {useState} from 'react';
import {useMutation } from 'react-query'
import {Link, useHistory} from 'react-router-dom';

import {login} from '../api'
import './user.css'


const Login = () => {
  const [user, setUser] = useState({email:'', password:''});

  const history = useHistory()

  const {mutateAsync, error} = useMutation(login);

  const handleOnChange = async({ target: { name, value } })=>{
    setUser({...user, [name]: value})
  }

  const handleLogin = async(e)=>{
    e.preventDefault()
    mutateAsync(user, {
      onSuccess: (data) => {
        localStorage.setItem('token', data?.data.token)
        history.push("/dashboard")
      },
    })
  }

  return(
    <div className="user-form-wrapper">
      <form>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>

        )}
        <h3>Login</h3>
        <hr/>
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
          
          <button className="btn btn-success" onClick={handleLogin}>Sign In</button>
          <p>Don't have account:  <Link to="/signup">Sign Up</Link> </p>
      </form>

    </div>

  )
}

export default Login