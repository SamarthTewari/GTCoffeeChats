import React, { useState } from "react";
import LogInForm from "./AdminLogInForm";
import AdminLogInForm from "./AdminLogInForm";

function AdminLogInPage(props) {
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
            <h1 className="text-5xl bg-gradient-to-r from-amber-200 to-yellow-400 p-2 inline-block text-transparent bg-clip-text"> Admin Log In! </h1>
            {props.userDirectedFromSignUpPage && <h1>You Have Succesfully Signed up! Now Log in From here</h1>}
            <AdminLogInForm changeNullErr = {changeNullErr} setEmailNotFound = {setEmailNotFound} setMessage = {setMessage}/>
            {emailNotFound && <h1> {message} </h1>}
            {nullErr && <h1> {nullField} cannot be Null </h1>}
        </div>
    )
}

export default AdminLogInPage