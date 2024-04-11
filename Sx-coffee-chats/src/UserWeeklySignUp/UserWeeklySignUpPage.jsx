import React from "react";
import WeeklySignUpForm from "./UserWeeklySignUpForm";


function UserWeeklySignUpPage(props) {

    return(
        <div className="bg-gradient-to-r from-gray-700 to-black min-h-screen flex justify-center items-center"> 
        <WeeklySignUpForm setisCoffeeChatThisWeek={props.setisCoffeeChatThisWeek} setuserMadeDescions = {props.setuserMadeDescions}/>
        </div>
    )
}

export default UserWeeklySignUpPage