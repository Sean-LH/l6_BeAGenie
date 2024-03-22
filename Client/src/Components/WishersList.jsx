import React,{useEffect} from 'react'
import Wisher from '../Components/Wisher'


export default function WishersList(props) {

  const {wishers, getAll} = props
  console.log('wishers', wishers)
  useEffect(()=> {
    getAll()
  },[])

  return (
    <div className='wishersList'>
      {wishers.map(wisher => <Wisher{...wisher} key={wisher._id}/>)}
    </div>
  )
}
