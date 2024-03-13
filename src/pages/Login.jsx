import { useEffect, useState } from "react"
import { useAuth } from "../utils/AuthContext"
import { useNavigate ,Link} from "react-router-dom"


const Login = () => {
  const {user, handleUserLogin}= useAuth()
  const navigate = useNavigate()

  useEffect(()=> {
    if (user) {
      navigate('/')
    }
  })

  const [credentials,setCredentials]= useState({
    email:'',
    password:''
  })

  const handleInputChange=(e)=> {
    const name = e.target.name
    const value = e.target.value
    setCredentials({...credentials,[name]:value})
  }

  
  return (
    <div className="auth--container">
    <div className="form--wrapper">
      <form autoComplete="off"  onSubmit={(e) => {handleUserLogin(e, credentials)}}>
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
            name="password"
            placeholder="Enter password..."
            value={credentials.password}
            onChange={(e) => {handleInputChange(e)}}
            />
          </div>

          <div className="field--wrapper">

            <input 
            type="submit"
            value="Login"
            className="btn btn--lg btn--main"
            />

          </div>
      </form>

      <p>Dont have an account? Register <Link to="/register">here</Link></p>
    </div>
</div>
  )
}

export default Login