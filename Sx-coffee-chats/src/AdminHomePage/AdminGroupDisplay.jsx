import React, { useEffect, useState } from "react";
import AdminUserDisplay from "./AdminUserDisplay";
import AdminPartnerPairingDisplay from "./AdminPartnerPairingDisplay";
import axios from "axios"


function AdminGroupDisplay(props) {
    /* props.group is a singular group so its a 2-d array, or arrya of pairings*/
    /* dont need number of groups*/
    const [numberOfPeopleInGroup, setNumberOfPeopleInGroup] = useState(0)
    const [hasGivenAnswerAboutGroupMeetingThisWeek, sethasGivenAnswerAboutGroupMeetingThisWeek] = useState(false)
    const [areYouSureAboutAnswer, setAreYouSureAboutAnswer] = useState(false)
    const [saidGroupMet, setSaidGroupMet] = useState (false)

    function handleAreYouSureYes(){
        setSaidGroupMet(true)
        setAreYouSureAboutAnswer(true)

    }
    function handleAreYouSureNo(){
        setSaidGroupMet(false)
        setAreYouSureAboutAnswer(true)

    }
    async function handleDidNotMeet() {
        const arrOfPeopleInGroup = []
        for(let i = 0; i < props.group.length; i++){ // pushing each person in group into Array of arr Of People in group, so that they are no longer grouped by pair
            arrOfPeopleInGroup.push(props.group[i][0])
            if(props.group[i].length > 1){
                arrOfPeopleInGroup.push(props.group[i][1])
            }
        }  
        const formattedArrOfPeopleInGroup = arrOfPeopleInGroup.map(person => ({
            _id: person._id,
            name: person.name
        }));
        for (let j = 0; j < formattedArrOfPeopleInGroup.length; j++) { 
            let id = formattedArrOfPeopleInGroup[j]._id;
            const updatedPerson = await axios.patch(`http://localhost:3001/updateData/${id}`, { isAssignedToGroupThisWeek: false, groupNumberForThisWeek: null, availabeThisWeek: null });
        }
        sethasGivenAnswerAboutGroupMeetingThisWeek(true)
        props.setChangeNeeded(!props.changeNeeded)
    }


    async function handleMet() {
        const arrOfPeopleInGroup = []
        for(let i = 0; i < props.group.length; i++){ // pushing each person in group into Array of arr Of People in group, so that they are no longer grouped by pair
            arrOfPeopleInGroup.push(props.group[i][0])
            if(props.group[i].length > 1){
                arrOfPeopleInGroup.push(props.group[i][1])
            }
        }  
        const formattedArrOfPeopleInGroup = arrOfPeopleInGroup.map(person => ({
            _id: person._id,
            name: person.name
        }));
        try{
            const response = await axios.post('http://localhost:3001/addGroupMeeting', {groupMembers: formattedArrOfPeopleInGroup});
            console.log("made request to database")
        }
        catch(err){
            console.log(err)
        }
        for (let j = 0; j < formattedArrOfPeopleInGroup.length; j++) { // updating the people already met for each person in the formatted Arr of people in group
            let id = formattedArrOfPeopleInGroup[j]._id;
            const response = await axios.get(`http://localhost:3001/getMemberById/${id}`);
            const arrOfPeopleAlreadyMet = response.data.peopleAlreadyMet;
            const formattedArrOfPeopleAlreadyMet = arrOfPeopleAlreadyMet.map(person => ({
                _id: person._id,
                name: person.name
            }));
            const listToSendToDataBase = [...formattedArrOfPeopleAlreadyMet, ...formattedArrOfPeopleInGroup];
            const filtredList = listToSendToDataBase.filter(person => person._id !== id);
            const uniqueIds = new Set();
            // Filter out duplicates based on ID
            const filteredList = listToSendToDataBase.filter(person => {
                if (uniqueIds.has(person._id)) {
                    return false; // Duplicate found, filter it out
                } else {
                    uniqueIds.add(person._id);
                    return true; // Not a duplicate, keep it
                }
            });
            const uniqueArray = filteredList.filter(person => person._id != id)
            const updatedListOfPeopleAlreadyMet = await axios.patch(`http://localhost:3001/updateData/${id}`, { peopleAlreadyMet: uniqueArray, isAssignedToGroupThisWeek: false, groupNumberForThisWeek: null, availabeThisWeek: null });
        }
        sethasGivenAnswerAboutGroupMeetingThisWeek(true)
        props.setChangeNeeded(!props.changeNeeded)
    }


    return(
        <div className="flex flex-col items-center border-2 border-yellow-400 m-20">
            
                <h1 className="text-3xl bg-gradient-to-r from-amber-200 to-yellow-400 p-2 inline-block text-transparent bg-clip-text"> Group {props.number}</h1>
                {(props.itIsTimeToAssignIfGroupsMet && !hasGivenAnswerAboutGroupMeetingThisWeek && (props.group.reduce((acc, row) => acc + (row.length > 0 ? row.length : 0), 0)) > 0) && 
                (areYouSureAboutAnswer ? <div className="flex flex-col"> <button onClick={saidGroupMet ? handleMet: handleDidNotMeet} className="mt-2 px-10 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                > Are You Sure?</button> <button onClick={() => setAreYouSureAboutAnswer(false)} className="mt-2 px-10 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"> Cancel </button> </div>:
                    <>
                    <h3> Did this group meet?</h3>
                    <button onClick={handleAreYouSureYes} className="mt-2 px-10 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">Yes</button> 
                    <button onClick={handleAreYouSureNo} className="mt-2 px-10 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">No</button>
                    </>
                )}
                <h2 className="text-3xl bg-gradient-to-r from-amber-200 to-yellow-400 p-2 inline-block text-transparent bg-clip-text"> Group Count: {props.group.reduce((acc, row) => acc + (row.length > 0 ? row.length : 0), 0)}</h2>
                <div>
                {props.group.map((pair, index) => ( // within the group there is a pair, if pair lenght 1
                            (pair.length === 1) ? (
                                <AdminUserDisplay key={index} member={pair[0]} inPairing = {false} removeFromGroup = {props.removeFromGroup}/>
                            ) : (
                                !(pair.length === 0) && <AdminPartnerPairingDisplay key={index} pair={pair} inPairing = {true} removeFromGroup = {props.removeFromGroup}/>
                            )
                        ))}
            </div>
        </div>
    )
}

export default AdminGroupDisplay