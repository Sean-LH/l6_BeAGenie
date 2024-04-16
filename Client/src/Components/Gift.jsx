import React from 'react'

export default function Gift(props) {

const{name, type, cost, receiver, removeGift, _id} = props
  console.log(props)
  return (
    <>
    <div>
      <h2>{name}</h2>
      <h3>${cost}</h3>
      {type&& <h2>{type}</h2>}
    </div>
    <button onClick={()=>removeGift(_id)} className='deleter'>Delete</button>
    </>
  )
}
