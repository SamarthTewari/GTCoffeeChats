import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
/* need to come up with a way to reset to default values every week so it resets for each week*/


function UserHomePage(props){
    /* check if this should be all stateful variables or not whats offical*/
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    let hasChatThisWeek = loggedInUser.availabeThisWeek
    let hasGroup = loggedInUser.isAssignedToGroupThisWeek
    let hasPartner = (loggedInUser.partner == null) ? false: true
    let hasMadeDescion = (hasChatThisWeek == null) ? false: true
    let message1 = hasChatThisWeek && hasMadeDescion
    let message2 = hasMadeDescion && !hasChatThisWeek
    let SignUpButtonMessage = hasMadeDescion ? "Change Coffee Chat Status": "Sign Up for a Coffee Chat this week"
    let pickBuddyMessage = hasPartner ? "Change Partner" : "Pick a Partner"
    const navigate = useNavigate();
    const [groupMembers, setGroupMembers] = useState([]);


    useEffect(() => {
        async function getAllMembers() {
            console.log("reached")
            try {
                const response = await axios.get('http://localhost:3001/getAllMembers'); 
                const filteredMembers = response.data.filter(member => {
                    return (member.groupNumberForThisWeek === loggedInUser.groupNumberForThisWeek) && !(member.name == loggedInUser.name) && !(member.groupNumberForThisWeek == null);
                })
                setGroupMembers(filteredMembers)
            } catch (err) {
                console.log(err)
            }
        }
        getAllMembers();
    },[])

    function handleLogOut(){
        localStorage.clear();
        navigate("/")
    }

    return(
        <div className="bg-gradient-to-r from-gray-700 to-black">
            <div className="fixed top-0 flex flex-col justify-center items-center w-full z-50">
                <h1 className="text-yellow-400 text-6xl font-serif bg-gradient-to-r from-amber-200 to-yellow-400 inline-block text-transparent bg-clip-text">{loggedInUser.name} Welcome to GT coffee Chats!</h1>
                {message1 && <h2 className="text-yellow-400 text-2xl font-serif bg-gradient-to-r from-amber-200 to-yellow-400 inline-block text-transparent bg-clip-text">You are currently signed up for a Coffee Chat this week</h2>}
                {message2 && <h2 className="text-yellow-400 text-2xl font-serif bg-gradient-to-r from-amber-200 to-yellow-400 inline-block text-transparent bg-clip-text">You are currently not signed up for a Coffee Chat this week</h2>}
                {hasPartner && <h2 className="text-yellow-400 text-2xl font-serif bg-gradient-to-r from-amber-200 to-yellow-400 inline-block text-transparent bg-clip-text">Your partner is currently {loggedInUser.partner.name}</h2>}
                {(message1 && hasGroup) && groupMembers.map(member => (
                    <h2 key={member._id}>Your Group Members Are: {member.name}</h2>
                ))}
            </div>

            <div className="flex justify-center items-center h-screen w-full">
                <Link to="/UserPickBuddyPage">
                    <button className="bg-gradient-to-r from-amber-200 to-yellow-400 text-black rounded-[0.7rem] p-2 m-4 transition-transform transform hover:scale-110">{pickBuddyMessage}</button>
                </Link>
                <Link to="/UserWeeklySignUp">
                    <button className="bg-gradient-to-r from-amber-200 to-yellow-400 text-black rounded-[0.7rem] p-2 m-4 transition-transform transform hover:scale-110">{SignUpButtonMessage}</button>
                </Link>
                <button onClick={handleLogOut} className="bg-gradient-to-r from-amber-200 to-yellow-400 text-black rounded-[0.7rem] p-2 m-4 transition-transform transform hover:scale-110">Log Out</button>
            </div>
        </div>
        

    )
}

export default UserHomePage