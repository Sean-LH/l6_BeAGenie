import { useParams } from "react-router";

import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import { UserContext } from "../Context/UserProvider";
import Gift from "./Gift";

export default function Gifts() {
const {gifts, getAllGifts, addGift, removeGift} = useContext(UserContext)

useEffect( ()=> {
  getAllGifts()
},[])
const {wisherId} = useParams()
const filteredGifts = gifts.filter(gift => gift.wisher=== wisherId)
  console.log(filteredGifts)
  const [inputs, setInputs] = useState({
    name: "",
    type: "",
    cost: ''
  })

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs =>({
      ...prevInputs,
      [name]: value
    }))
  }
  function handleSubmit(e){
    e.preventDefault()
    addGift(wisherId, inputs)
    setInputs({
      name: "",
      type: "",
      cost: ''
    })
  }

  const giftList = filteredGifts.map(gift=> <Gift {...gift} key={gift._id} removeGift={removeGift}/>)
  return (
    <div className="items_page">
      <form onSubmit={handleSubmit} className="form">
        <input
          name='name'
          value={inputs.name}
          onChange={handleChange}
          placeholder="What gift?"
        />
        <input
          name='type'
          value={inputs.type}
          onChange={handleChange}
          placeholder="clothes, electronics?"
        />
        <input
          name='cost'
          type='number'
          value={inputs.cost}
          onChange={handleChange}
          placeholder="How much is it?"
        />
        <button className="adder">Add Gift</button>
      </form>
      <h2>You've decided to get:</h2>
      {giftList}
    </div>
  )
}
