import React, { useState } from 'react'
import SignupForm from './SignupForm'



function SignupUpPage(props){
    const [errorOrNot, setErrorOrNot] = useState(false);
    const [duplicateError, setDuplicateError] = useState(false);
    const [message, setMessage] = useState("")

    function handleNull(value,field) {
    
        setMessage(field)
        setErrorOrNot(value)
    
    }

    return (
        <div className="bg-gradient-to-r from-gray-700 to-black min-h-screen"> 
            <h1 className="text-5xl bg-gradient-to-r from-amber-200 to-yellow-400 p-2 inline-block text-transparent bg-clip-text"> Sign Up! </h1>
            <SignupForm errorOrNot = {errorOrNot} duplicateError = {duplicateError} setDuplicateError = {setDuplicateError} setuserDirectedFromSignUpPage = {props.setuserDirectedFromSignUpPage} handleNull = {handleNull}/>
            {errorOrNot && <h1 className= "text-red-500 text-2xl"> Error {message} is null</h1>}
            {duplicateError && <h1> We already have an account with that email</h1>}
        </div>
        
    
    )
}

export default SignupUpPage