// This page has the user's log in, and sign up form before accessing the main app

import React,{useState, useContext} from 'react'
import { UserContext } from '../Context/UserProvider'
import AuthForm from './AuthForm'

// import AuthForm from './AuthForm'

const initInputs = {username: '', password: ''}


export default function AuthPage() {

  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  const {signup, login, errMsg, resetAuthErr} = useContext(UserContext)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
    // console.log(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  function toggleForm(){
    setToggle(prev => !prev)
    resetAuthErr()
  }
  return (
    <div>
      <h1>Welcome to your Be a Genie App</h1>
      <h3>Here, you can be a genie for those you care about</h3>
      <h3>Login and start making your lists</h3>
    { !toggle ?
      <>
        <AuthForm 
          handleChange={handleChange}
          handleSubmit={handleSignup}
          inputs={inputs}
          btnText="Sign up"
          errMsg = {errMsg}
          class="authorize"
        />
        <p onClick={toggleForm}>Already a member?</p>
      </>
    :
      <>
        <AuthForm 
          handleChange={handleChange}
          handleSubmit={handleLogin}
          inputs={inputs}
          btnText="Login"
          errMsg = {errMsg}
          class="authorize"
        />
        <p onClick={toggleForm}>Not a member?</p>
      </>
    }
    </div>
  )
}
