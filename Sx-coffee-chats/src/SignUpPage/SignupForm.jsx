
import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { formatWords } from '../utils.js'

function SignupForm(props){
    const [email, setEmail] = useState("") /* set default value to all of them*/ 
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNUmber] = useState("")
    const navigate = useNavigate();


    function reSetStates() {
        setEmail('')
        setName('')
        setPassword('')
        setPhoneNUmber("")
    }

    async function handleSubmit(e){
        e.preventDefault();
        const nullError = handleNullError();                       
        if(!nullError){
            const dupError = await handleDuplicate(); 
            console.log(dupError)                     
            if(!dupError){
                execute();
            }
        }
    }

    async function execute() {
        try{
            let formattedName = formatWords(name)
            let formattedEmail = formatWords(email)
            const result = await axios.post('http://localhost:3001/signUpMember', {name: formattedName , email: formattedEmail, password: password, phoneNumber: phoneNumber})
            reSetStates()
            props.setDuplicateError(false)
            navigate('/login');
        }
            catch(err){
            console.log(err)
        }
    }

    function handleNullError(){
        props.setDuplicateError(false)
        switch (true) {
            case name === "":
                props.handleNull(true,"name")
                return true
                break;
            case email === "":
                props.handleNull(true,"email")
                return true
                break;
            case password === "":
                props.handleNull(true, "password")
                return true
                break;
            case phoneNumber === "":
                props.handleNull(true, "Phone Number")
                return true
                break
            default:
                return false
        }
    }
    async function handleDuplicate(){
        try{
            const formattedEmail = formatWords(email)
            props.handleNull(false,"")
            const exists = await axios.get(`http://localhost:3001/getMember?email=${formattedEmail}`)
            if(exists.data){
                props.setDuplicateError(true)
                return true
            }
            else{
                return false
            }
        }
        catch(err){
            console.log(err)
        } 
    }


    return (
        <div> 
            <form> 
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border border-yellow-500 bg-black text-white px-4 py-2 m-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"/>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-yellow-500 bg-black text-white px-4 py-2 m-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"/>
            <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNUmber(e.target.value)} className="border border-yellow-500 bg-black text-white px-4 py-2 m-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-yellow-500 bg-black text-white px-4 py-2 m-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"/>
            <button type='submit' onClick={handleSubmit} className = "bg-gradient-to-r from-amber-200 to-yellow-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-200 text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"> Sign Up</button>
                
            </form>
        </div>
        
    
    )
}



export default SignupForm