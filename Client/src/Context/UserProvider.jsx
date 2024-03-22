import React, {useState, createContext} from 'react'
import axios from 'axios'

const UserContext = createContext() //allows for for the use of Context

const userAxios = axios.create() //this "userAxios" has the abilities of all axios features

userAxios.interceptors.request.use(config =>{
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})


export default function UserProvider(props) {

  const initState = {
    user: JSON.parse(localStorage.getItem("user"))|| {}, 
    token: localStorage.getItem('token') || "", 
    wishers: [],
    errMsg: ""
  }
  const [userIDs, setUserIDs] = useState([])
  const [userState, setUserState] = useState(initState)
  function signup(credentials){
    axios.post('/api/auth/signup', credentials)
    // console.log(credentials)
    .then(res => {
      console.log('the res', res)
      const {user, token} = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      setUserState(prevUserState => ({
        ...prevUserState,
        user, 
        token,
      }))})
      .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
      axios.post('/api/auth/login', credentials)
        .then(res => {
          // console.log(res.data)
          const {user, token} = res.data
          localStorage.setItem("token", token)
          localStorage.setItem("user", JSON.stringify(user))
          // console.log('the res data',res.data)
          // console.log(user)
          // console.log(token)
          // console.log("user:",user._id)
          getAll()
          setUserState(prevUserState => ({
            ...prevUserState,
            user, 
            token
          }))
          console.log(userState)
        })
  
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout(){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUserState({
        user: {},
        token: "",
        wishers: []
      })
    }

      // Displaying the message of a taken username
  function handleAuthErr(errMsg){
    setUserState(prevState =>({
      ...prevState, 
      errMsg
    }))
  }

  function resetAuthErr(){
    setUserState(prevState =>({
      ...prevState,
      errMsg: ""
    }))
  }

  function getAll(){
    userAxios.get("/api/main/wishers/")
      .then(res => {
        console.log(res.data)
        setUserState(prevState =>({
          ...prevState,
          wishers: res.data
      }))
      })
      .catch(err => console.log(err))
  }

  function addWisher(newWisher){
    userAxios.post('/api/main/wishers/', newWisher)
      .then(res => {
        console.log(res)
        setUserState(prevState =>({
          ...prevState, 
          wishers: [...prevState.wishers, res.data]
        }) )
      })
      .catch(err => console.log(err.response.data.errMsg))
  }
  console.log('userState',userState)
  function deleteWishers(wData){
    userAxios.delete(`/api/main/wishers/${wData}`)
      .then(res => setUserState( prevState => ({
          ...prevState,
          wishers: prevState.wishers.filter(post => post._id !== wData)
        } ) ) )
      .catch(err => console.log(err.message))
  }

  function editWisher(Id, update){
    userAxios.put(`/api/main/wishers/${Id}`, update)
      .then(res =>{
        console.log(res.data)
        setUserState( prevState=> ({
          ...prevState,
          wishers: prevState.wishers.map(post=> post._id === Id ? res.data: post)
        }))
      })
  }
  const [gifts, setGifts] = useState([])
  function getAllGifts(){
    userAxios.get(`/api/main/items`)
      .then(res =>{
        setGifts(res.data)
      })
      .catch(err => console.log(err))
  }

  function addGift(Id, inputs){
    userAxios.post(`/api/main/items/${Id}`,inputs)
      .then(res => setGifts(prevGifts => [...prevGifts, res.data]))
      .catch(err => console.log(err))
  }

  function removeGift(Id){
    userAxios.delete(`/api/main/items/${Id}`)
      .then(res => {
        console.log(res)
        console.log(prevGifts)
      setGifts(prevGifts => prevGifts.filter(gift => gift._id !==Id))
      .catch(err => console.log(err))
  })

  return (
    <UserContext.Provider value ={{...userState, signup, login, logout, resetAuthErr, addWisher, getAll, deleteWishers, editWisher, gifts, getAllGifts, addGift, removeGift}}>
      {props.children}
    </UserContext.Provider>
  )
}}


export  {UserProvider, UserContext }