
// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import axios from 'axios';
// @ts-ignore
import { useNavigate } from 'react-router-dom';
import { formatWords } from '../utils';
/* also encrpyt passwords very important*/
function AdminLogInForm(props){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    
    async function handleSubmit(e) {
        e.preventDefault();
        const isNullError = handleNullError()
        if(!isNullError){
            await handleEmailOrPassWordNotFound() /* dont rly needd null error dont think*/
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
            const exists = await axios.get(`http://localhost:3001/getAdmin?email=${email}`)
            console.log(exists)
            if(exists.data){
                if(!(password === exists.data.password)){
                    props.setEmailNotFound(true)
                    props.setMessage("Password is incorect")
                    return true
                }
                else{
                    localStorage.setItem('loggedInAdmin', JSON.stringify(exists.data));
                    navigate('/AdminHomePage')
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



    return (
        <div> 
            
            <form> 
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} class="border border-yellow-500 bg-black text-white px-4 py-2 m-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-yellow-500 bg-black text-white px-4 py-2 m-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"/>
                <button type="submit" onClick={handleSubmit} class = "bg-gradient-to-r from-amber-200 to-yellow-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-200 text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"> Log in</button>
            </form>
        </div>
    
    )
}


export default AdminLogInForm