import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


function WeeklySignUpForm(props) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const navigate = useNavigate();

    async function handleYes() {
        try{
            props.setisCoffeeChatThisWeek(true)
            props.setuserMadeDescions(true)
            const resourceId = loggedInUser._id;
            const response = await axios.patch(`http://localhost:3001/updateData/${resourceId}`, { availabeThisWeek: true, isAssignedToGroupThisWeek: false, groupNumberForThisWeek: null});
            localStorage.setItem('loggedInUser', JSON.stringify(response.data));
            navigate('/UserHomePage')
        }
        catch(error){
            console.log(error)
        }        
    }

    async function handleNo() {
        try{
            const resourceId = loggedInUser._id;
            const response = await axios.patch(`http://localhost:3001/updateData/${resourceId}`, { availabeThisWeek: false, isAssignedToGroupThisWeek: false, groupNumberForThisWeek: null});
            localStorage.setItem('loggedInUser', JSON.stringify(response.data));
            navigate('/UserHomePage')
        }
        catch(error){
            console.log(error)
        }            

    }


    return(
        <div className="flex flex-col justify-center items-center">
            <div className="absolute top-0">
                <h1 className="text-5xl bg-gradient-to-r from-amber-200 to-yellow-400 p-2 inline-block text-transparent bg-clip-text"> Are you available this week</h1>
                <div className="flex flex-row justify-center items-center"> 
                    <button onClick={handleYes} className="m-4 mr-6 bg-gradient-to-r from-amber-200 to-yellow-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-200 text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"> Yes </button>
                    <button onClick={handleNo} className="m-4 ml-6 bg-gradient-to-r from-amber-200 to-yellow-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-200 text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"> No </button>
                </div>
            </div>
            
        </div>
    )
}

export default WeeklySignUpForm