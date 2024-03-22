import React, {useState} from 'react'

export default function WisherForm(props) {

  const initInputs = {
    name: "",
    occasion: "",
    needBy: ''
  }

  const {addWisher} = props
  const [inputs, setInputs] = useState(initInputs)


  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addWisher(inputs)
    setInputs(initInputs)
  }

  const { name, occasion, needBy} = inputs


  return (
    <div>
          <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="name" 
        value={name} 
        onChange={handleChange} 
        placeholder="name"/>
      <input 
        type="text" 
        name="occasion" 
        value={occasion} 
        onChange={handleChange} 
        placeholder="occasion"/>
      <input 
        type="date" 
        name="needBy" 
        value={needBy} 
        onChange={handleChange} 
        placeholder="Needed by?"/>
      <button>Add Post</button>
    </form>
    </div>
  )
}
