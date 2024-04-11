import { useState } from 'react'
import SignupUpPage from './SignUpPage/SignUpPage'
import HomePage from './HomePage/HomePage'
import WebRoutes from './Routes'


function App() {
  const [userDirectedFromSignUpPage, setuserDirectedFromSignUpPage] = useState(false)
  

  function setTrue() {
    setuserDirectedFromSignUpPage(true)
  }


  return ( 
      <WebRoutes userDirectedFromSignUpPage = {userDirectedFromSignUpPage} setuserDirectedFromSignUpPage = {setTrue}/>
  
  )
}

export default App
