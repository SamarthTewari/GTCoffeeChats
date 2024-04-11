// @ts-ignore
import React, { useState } from "react";
// @ts-ignore
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import AssignGroupInput from "./AssignGroupInput";
// @ts-ignore
import AdminUserDisplay from "./AdminUserDisplay";

function AdminPartnerPairingDisplay(props) {
    const [curentlyInGroup, setCurrentlyInGroup] = useState(false)
    const [assignGroup, setAssignGroup] = useState(false)

    function handleAddPartnerPairing(){ // actual calling of add to group handled by GroupInputTag
        setAssignGroup(true)
    }

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

    return(
        <div className="border-2 border-black bg-blue-300 rounded-lg m-20 flex flex-col justify-center items-center p-5"> 
            <h2 className= "text-yellow-400 text-2xl font-serif bg-gradient-to-r from-amber-200 to-yellow-400 inline-block text-transparent bg-clip-text"> pairing </h2>
            {props.pair.map((member, index) => (
                            <AdminUserDisplay key={index} inPairing = {props.inPairing} member={member} numberOfGroups = {props.numberOfGroups}/>
                        ))}

            {(!curentlyInGroup && assignGroup) ?  <AssignGroupInput pair = {props.pair} addToGroup = {props.addToGroup} numberOfGroups = {props.numberOfGroups} setAssignGroup = {setAssignGroup}/> 
            : props.pair[0].isAssignedToGroupThisWeek ? <button onClick={handleRemoveFromGroup} className="mt-2 px-10 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"> remove</button> 
            : <button onClick={handleAddPartnerPairing} className="mt-2 px-10 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"> add to group </button>}
        </div>
    )
}

export default AdminPartnerPairingDisplay