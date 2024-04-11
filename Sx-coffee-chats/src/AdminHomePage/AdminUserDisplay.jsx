// @ts-ignore
import React, { useState, useEffect } from "react";
// @ts-ignore
import { useNavigate } from 'react-router-dom';
import AssignGroupInput from "./AssignGroupInput";



function AdminUserDisplay(props){
    const navigate = useNavigate();
    const [curentlyInGroup, setCurrentlyInGroup] = useState(false)
    const [assignGroup, setAssignGroup] = useState(false)
    
    const handleViewData = () => {
        const memberDataJSON = JSON.stringify(props.member);
        localStorage.setItem('SelectedMemberData', memberDataJSON);
        navigate("/ViewMemberData")
        
    };

    function handleRemoveFromGroup(){
        if (props.pair !== undefined){
            props.removeFromGroup(props.pair)
            

        }
        else{
            props.removeFromGroup([props.member]);
            
        }
        setCurrentlyInGroup(false) 
        setAssignGroup(false)
    }


    function handleClick(){
        setAssignGroup(true)
    }
/* to view member dataCould store in local storeage*/

    return(
        <div className="bg-gradient-to-r from-amber-200 to-yellow-400 rounded-xl m-2">
            <div className="flex flex-col justify-center items-center rounded-lg m-5"> 
                {props.member ? <h3 className="font-bold text-2xl text-white"> {props.member.name}</h3> : <h3> bob </h3>}
                {curentlyInGroup && <button>Remove From Group</button>}
                {!props.inPairing && ((!curentlyInGroup && assignGroup) ? 
                <AssignGroupInput member = {props.member} addToGroup = {props.addToGroup} numberOfGroups = {props.numberOfGroups} setAssignGroup = {setAssignGroup}/> 
                : props.member.isAssignedToGroupThisWeek ? <button onClick={handleRemoveFromGroup} className="mt-2 px-10 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"> Remove </button> 
                : <button onClick={handleClick} className="mt-2 px-10 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"> Add to Group </button>)}
                <button onClick={handleViewData} className="mt-2 px-4 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"> View Data </button>
            </div>
        </div>
    )
}

export default AdminUserDisplay