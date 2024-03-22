// This is the home page that will greet the user and house the form for adding names
import React, {useContext} from 'react'
import {UserContext} from '../Context/UserProvider'
import WisherForm from './WisherForm'
import WishersList from './WishersList'

export default function HomePage() {

  const {user:{username}, addWisher, wishers, getAll} = useContext(UserContext)


  return (
    <div className="profile">
        <h1>Welcome @{username} to your page!</h1>
        <h3>Add Your Post</h3>
        <WisherForm addWisher ={addWisher}/>
        <h3>Who is getting gifts?</h3>
        <WishersList wishers={wishers} getAll ={getAll}/>
      </div>
  )
}
