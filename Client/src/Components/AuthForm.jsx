import React from 'react'
// This is the form for somebody logging in and being able to sign up
export default function AuthForm(props) {
  const{
    handleChange, 
    handleSubmit, 
    btnText, 
    inputs: {
      username, 
      password,
    },
    errMsg
  } = props
  
  return (
    <div >
        <form onSubmit={handleSubmit} className="form">
          <input 
            type="text" 
            value={username} 
            name="username" 
            onChange={handleChange} 
            placeholder="Username"/>
          <input 
            type="text" 
            value={password} 
            name="password" 
            onChange={handleChange} 
            placeholder="Password"/>
          <button>{ btnText }</button>
        </form>
          <p>{errMsg}</p>
    </div>
  )
}
