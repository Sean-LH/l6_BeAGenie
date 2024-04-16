
import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router'
import {UserContext} from '../Context/UserProvider'
import moment from 'moment'


export default function Wisher(props) {
  console.log('in wisher', props)
  const{deleteWishers, editWisher} = useContext(UserContext)
  const {name, occasion, needBy, _id, userId} = props
const navigate = useNavigate()
  const [startEdit, setStartEdit] = useState(false)
  // const filteredNames = arrWishers.filter(comment => comment.issue === _id)
const [inputs, setInputs] = useState({
  name,
  occasion,
  needBy
})
function handleTogge(){
  setStartEdit(prev => !prev)
}
function handleChange(e){
  const{name, value} = e.target
  setInputs(prevInputs =>{
    return {
      ...prevInputs,
      [name]: value
    }
  })
}

function handleSubmit(e){
  e.preventDefault()
  editWisher(_id, inputs)
  handleTogge()
}
function handleNav(){
  navigate(`/gifts/${_id}`)
}

  return (
    <div className='person'>
      <>
      <h2>The person: {name}</h2>
      <h3>Needed by: {moment(needBy).format("MMM Do YY")}</h3>
      <h4>The reason is: {occasion}</h4>
      <button onClick={handleNav}>Gifts</button>
      <button onClick={handleTogge} className="updater">{startEdit?'Cancel':'Edit'}</button>
      <button onClick={()=> deleteWishers(_id)} className="deleter">Delete</button>
      </>
      {startEdit && <>
      <form onSubmit={handleSubmit}>
        <input 
          name = 'name'
          value = {inputs.name}
          onChange={handleChange}
        />
        <input
        name = 'needBy'
        value = {inputs.needBy}
        onChange={handleChange}
        type = 'date'
        />
        <input
        name = 'occasion'
        value = {inputs.occasion}
        onChange={handleChange}
        />
        <button className='updater'>Update</button>
      </form>
      </>}
    </div>
  )
}
