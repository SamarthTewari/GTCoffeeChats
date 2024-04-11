// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import axios from 'axios';
// @ts-ignore
import { useNavigate } from 'react-router-dom';
import { formatWords } from '../utils';

/**
 * 
 * @param {*} props 
 * @returns 
 */
function LogInForm(props){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    
    async function handleSubmit(e) {
        e.preventDefault();
        const isNullError = handleNullError()
        if(!isNullError){
            await handleEmailOrPassWordNotFound() /* does not rly need null error don't think*/
        }
    }

    function handleNullError(){
        props.setEmailNotFound(false)
        props.setMessage("")
        switch (true) {
            case email === "":
                props.changeNullErr(true,"email")
                return true
                break;
            case password === "":
                props.changeNullErr(true, "password")
                return true
                break;
            default:
                return false
        }
    }


    async function handleEmailOrPassWordNotFound() {
        props.changeNullErr(false,"")
        try{
            let formattedEmail = formatWords(email)
            const exists = await axios.get(`http://localhost:3001/getMember?email=${formattedEmail}`)
            if(exists.data){
                const passWordMatched = await axios.get(`http://localhost:3001/checkPassword?password=${password}&email=${formattedEmail}`)
                if(!(passWordMatched.data.match)){ // When password does not match
                    props.setEmailNotFound(true)
                    props.setMessage("Password is incorrect")
                    return true
                }
                else{
                    localStorage.setItem('loggedInUser', JSON.stringify(exists.data));
                    navigate('/UserHomePage')
                    return false
                }
            }
            else{
                props.setEmailNotFound(true)
                props.setMessage("Email not found!")
                return true
            }
        }
        catch(err){
            console.log(err)
        } 
    }
    function generateOTP() {
        return Math.floor(1000 + Math.random() * 9000)
    }
    /*
    async function handleForgotPassword() {
        try {
            props.changeNullErr(false, "");
            props.setEmailNotFound(false);
            let formattedEmail = formatWords(email);
            const exists = await axios.get(`http://localhost:3001/getMember?email=${formattedEmail}`);
            if (exists.data) {
                localStorage.setItem('userEmail', formattedEmail);
                const OTP = generateOTP();
                console.log(OTP)
                await axios.post('http://localhost:3001/sendOtpEmail', { email: formattedEmail, OTP: OTP });
                navigate('/EnterOTP');
            } else {
                props.setEmailNotFound(true);
                props.setMessage("Email entered is not valid, cannot reset password.");
            }
        } catch (err) {
            console.error(err);
            // Handle error, e.g., display error message to the user
        }
    }
    */



    return (
        <div> 
            
            <form> 
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} class="border border-yellow-500 bg-black text-white px-4 py-2 m-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-yellow-500 bg-black text-white px-4 py-2 m-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"/>
                <button type="submit" onClick={handleSubmit} class = "bg-gradient-to-r from-amber-200 to-yellow-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-200 text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"> Log in </button>
            </form>
        </div>
    
    )
}


export default LogInForm