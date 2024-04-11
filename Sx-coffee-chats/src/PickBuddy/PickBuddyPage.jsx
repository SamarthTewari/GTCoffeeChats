import React, {useState, useEffect, useRef}  from "react";
import PickBuddyForm from "./PickBuddyForm"


function PickBuddyPage() {
    const [noUsersFoundError, setNoUsersFoundError] = useState(false)
    const [selectedAlreadyHasPartnerError, setselectedAlreadyHasPartnerError] = useState(false)
    const [selectecUserIsAlreadyYourPartnerError, setselectecUserIsAlreadyYourPartnerError] = useState(false)

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-gray-700 to-black">
                
                <div className="flex flex-col justify-center items-center"> 
                    <h1 className="text-5xl bg-gradient-to-r from-amber-200 to-yellow-400 p-2 inline-block text-transparent bg-clip-text"> Choose Your Buddy! </h1>   
                    <PickBuddyForm noUsersFoundError = {noUsersFoundError} setNoUsersFoundError = {setNoUsersFoundError} selectedAlreadyHasPartnerError = {selectedAlreadyHasPartnerError} 
                        setselectedAlreadyHasPartnerError = {setselectedAlreadyHasPartnerError} selectecUserIsAlreadyYourPartnerError = {selectecUserIsAlreadyYourPartnerError}
                        setselectecUserIsAlreadyYourPartnerError = {setselectecUserIsAlreadyYourPartnerError}
                    /> 
                </div>
                {selectedAlreadyHasPartnerError && <h2 className= "absolute bottom-24 text-red-500 text-2xl"> Selected user already has a partner!</h2>}
                {noUsersFoundError && <h2 className= "absolute bottom-24 text-red-500 text-2xl">No users found!</h2>}
                {selectecUserIsAlreadyYourPartnerError && <h1 className= "absolute bottom-24 text-red-500 text-2xl"> Selected User is already your partner</h1>}
        </div>
        

        )
}

export default PickBuddyPage