// @ts-ignore
import React, { useState } from "react";
import LogInForm from "./LogInForm";

function LogInPage(props) {
    const [emailNotFound, setEmailNotFound] = useState(false);
    const [message, setMessage] = useState("");
    const [nullErr, setnullErr] = useState(false)
    const [nullField, setNullField] = useState("")

    function changeNullErr(value, field) {
        setnullErr(value)
        setNullField(field)

    }


    return (
        <div className="bg-gradient-to-r from-gray-700 to-black min-h-screen">
            <h1 className="text-5xl bg-gradient-to-r from-amber-200 to-yellow-400 p-2 inline-block text-transparent bg-clip-text"> Log In! </h1>
            {props.userDirectedFromSignUpPage && <h1>You Have Succesfully Signed up! Now Log in From here</h1>}
            <LogInForm changeNullErr = {changeNullErr} setEmailNotFound = {setEmailNotFound} setMessage = {setMessage}/>
            {emailNotFound && <h1 className= "absolute bottom-24 text-red-500 text-2xl"> {message} </h1>}
            {nullErr && <h1 className= "absolute bottom-24 text-red-500 text-2xl"> {nullField} cannot be Null </h1>}
        </div>
    )
}

export default LogInPage