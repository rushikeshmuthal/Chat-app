import { useState } from "react"
import { useAuth } from "../utils/AuthContext"
import { Link } from "react-router-dom"



const Register = () => {
  const { handleUserRegister}= useAuth()

    const [credentials,setCredentials]= useState({
        name:'',
        email:'',
        password1:'',
        password2:''
      })
    
      const handleInputChange=(e)=> {
        const name = e.target.name
        const value = e.target.value
        setCredentials({...credentials,[name]:value})
      }
  return (
    <div className="auth--container">
    <div className="form--wrapper">
      <form autoComplete="off" onSubmit={(e) => {handleUserRegister(e, credentials)}}>
          <div className="field--wrapper">
            <label>Name:</label>
            <input 
            required
            type="text"
            name="name"
            placeholder="Enter your name..."
            value={credentials.name}
            onChange={(e) => {handleInputChange(e)}}
            />
          </div>
          <div className="field--wrapper">
            <label>Email:</label>
            <input 
            required
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={credentials.email}
            onChange={(e) => {handleInputChange(e)}}
            />
          </div>

          <div  className="field--wrapper">
            <label>Password:</label>
            <input 
            required
            type="password"
            name="password1"
            placeholder="Enter password..."
            value={credentials.password1}
            onChange={(e) => {handleInputChange(e)}}
            />
          </div>
          <div  className="field--wrapper">
            <label>Confirm Password:</label>
            <input 
            autoComplete="off"
            required
            type="password"
            name="password2"
            placeholder="confirm your password..."
            value={credentials.password2}
            onChange={(e) => {handleInputChange(e)}}
            />
          </div>

          <div className="field--wrapper">

            <input 
            type="submit"
            value="Register"
            className="btn btn--lg btn--main"
            />

          </div>
      </form>

      <p>Already have an account? Login <Link to="/login">here</Link></p>
    </div>
</div>
  )
}

export default Register