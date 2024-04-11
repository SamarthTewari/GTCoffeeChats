// @ts-ignore
import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

// @ts-ignore
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import axios from "axios";
// @ts-ignore
import AdminUserDisplay from './AdminUserDisplay'
// @ts-ignore
import AdminGroupDisplay from "./AdminGroupDisplay";
// @ts-ignore
import AdminPartnerPairingDisplay from "./AdminPartnerPairingDisplay";


function AdminHomePage(){
    const [participatingMembersNotInGroupYet, setParticpatingMembersNotInGroupYet] = useState([[]]) //is an array of arrays, wehre each array represents a group (can be lenght 1 or 2 based on paring)
    const [noMemberError, setNoMemberError] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState(Array(0).fill().map(() => Array(0).fill().map(() => Array(0).fill(null)))); //enitre object is each element. Array of groups, where each group is array of pairs (pairs can be lenght 1 or 2)
    const [changeNeeded, setChangeNeeded] = useState(true)
    const [itIsTimeToAssignIfGroupsMet,setItIsTimeToAssignIfGroupsMet] = useState(false)
    const navigate = useNavigate();
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInAdmin'));

    function returnPartnerGroupings(arr){
        const hashmap = {}
        let partnerGroupedArr = []
        for(let i = 0; i < arr.length; i++){
            let pair = []
            if(arr[i]._id in hashmap){
                continue
            }
            if(arr[i].partner == null){
                hashmap[arr[i]._id] = true
                pair.push(arr[i])
            }
            else {
                const partnerId = arr[i].partner._id
                let partner = null
                for(let j = 0; j < arr.length; j++){
                    if(arr[j]._id == partnerId){
                        partner = arr[j]
                        break
                    }
                }
                hashmap[arr[i]._id] = true
                pair.push(arr[i])
                if(!(partner == null)){/* if partner == null that means they arnt in array meaning they not aviable this week then this condition goes only if avaibale */
                    hashmap[partnerId] = true
                    pair.push(partner)
            }

            }
            partnerGroupedArr.push(pair)  
        }
        return partnerGroupedArr
    }
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    useEffect(() => {
        function refreshPage() {
            window.location.reload(true);
        }
    
        function scheduleRefresh() {
            const now = new Date();
            const sunday = new Date(now);
            sunday.setDate(now.getDate() + (7 - now.getDay()) % 7); // Get next Sunday
            sunday.setHours(23, 59, 0, 0);
            const delay = sunday.getTime() - now.getTime();
            setTimeout(refreshPage, delay);
        }
        scheduleRefresh();
    }, []);
    
    
    useEffect(() => { // storing group number for each member within them.
        async function fetchParticpatingMembers() {
            try {
                const response = await axios.get('http://localhost:3001/getAllMembers');
                const allMembers = response.data; // This will be an array of all members
                const allParticpatingMembers = allMembers.filter(member => (member.availabeThisWeek === true))
                let partnerGroupedArray = returnPartnerGroupings(allParticpatingMembers)
                if(allParticpatingMembers.length == 0){
                    setNoMemberError(true)
                }
                const numberOfGroups = Math.ceil(allParticpatingMembers.length/4) + 1;
                const groupsArr = Array.from({ length: numberOfGroups }, () => []); // check this to make sure there arnt default values inside by mistake
                const pairsOfMembersNotInGroup = []        
                /* assiging Pairs to correct Arryas*/
                for(let i = 0; i < partnerGroupedArray.length; i++){
                const groupNumber = partnerGroupedArray[i][0].groupNumberForThisWeek
                    if(partnerGroupedArray[i][0].isAssignedToGroupThisWeek == false || groupNumber - 1 >= numberOfGroups){
                    pairsOfMembersNotInGroup.push(partnerGroupedArray[i])
                    }
                    else{
                    groupsArr[groupNumber - 1].push(partnerGroupedArray[i])
                    }
                }
                setParticpatingMembersNotInGroupYet(pairsOfMembersNotInGroup)
                setGroups(groupsArr)
            } 
            catch (error) {
                console.error('Error fetching members:', error);
                return []
            }
            setIsLoading(false)
        }
        fetchParticpatingMembers()
    }, [changeNeeded])


    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }
    

    async function addToGroup(groupNum, pairToAssign){ // Should function so that it is an array of groups, then each groups has pairs, which containt one or 2 elements
        //patch requests to update the groups of the arr
        try{
            const firstElementId = pairToAssign[0]._id
            const response = await axios.patch(`http://localhost:3001/updateData/${firstElementId}`, { isAssignedToGroupThisWeek: true, groupNumberForThisWeek: groupNum});
            const upDatedFirstElement = response.data
            const updatedPairToAssign = []
            updatedPairToAssign.push(upDatedFirstElement)
            // 2nd element if it exists
            if(pairToAssign.length > 1){
                const secondElementId = pairToAssign[1]._id
                const response2 = await axios.patch(`http://localhost:3001/updateData/${secondElementId}`, { isAssignedToGroupThisWeek: true, groupNumberForThisWeek: groupNum});
                const upDatedSecondElement = response2.data
                updatedPairToAssign.push(upDatedSecondElement)
            }
            setChangeNeeded(!changeNeeded) // trigger useEffect function and re-assign everytime we reload.
        }
        catch(err){
            console.log(err)
        }     
    }

    async function removeFromGroup(pairToRemove){
        try{
            const firstElementId = pairToRemove[0]._id
            const response = await axios.patch(`http://localhost:3001/updateData/${firstElementId}`, { isAssignedToGroupThisWeek: false, groupNumberForThisWeek: null});
            const upDatedFirstElement = response.data
            const updatedPairToAssign = []
             // 2nd element if it exists
            updatedPairToAssign.push(upDatedFirstElement)
            if(pairToRemove.length > 1){
                const secondElementId = pairToRemove[1]._id
                const response2 = await axios.patch(`http://localhost:3001/updateData/${secondElementId}`, { isAssignedToGroupThisWeek: false, groupNumberForThisWeek: null});
                const upDatedSecondElement = response2.data
                updatedPairToAssign.push(upDatedSecondElement)
            }
            setChangeNeeded(!changeNeeded)
        }
        catch(err){
            console.log(err)
        }
    }

    
    
    function handleLogOut() {
        localStorage.clear()
        navigate("/")

    }
    async function handleAutoAssignGroups(){
        const response = await axios.get('http://localhost:3001/getAllMembers');
        const allMembers = response.data; // This will be an array of all members
        const allParticpatingMembers = allMembers.filter(member => (member.availabeThisWeek === true));
        const partnerGroupedArray = returnPartnerGroupings(allParticpatingMembers);
        const randomizedPartnerGroupedArray = shuffleArray(partnerGroupedArray)
        const alreadyAddedToGroup = new Set();
        /*
        for every value in randomized group arr:
            add to next group and fill set. (make extra groups to account for errors)
            - For rest of values (all values before this already added to a set):
                - find one with greatest comparability score
                
        */

        /*
        better way to actually do it, is to sort by people who have the least number of options for new people that are currently signed up
        then we assign them first to the next available value (because its sorted it would also be the next available value w the lowest
        number of potential new people they could meet) that is new. Match all pairs together first then add singles to each group, 
        based on which group they have met the least number of people. Can do one by one idc
        */






    }
        

    return(
        <div className="bg-gradient-to-r from-gray-700 to-black w-full min-h-screen">
            <div className="flex flex-col justify-center items-center"> 
                <h1 className="mb-4 text-yellow-400 text-7xl font-serif bg-gradient-to-r from-amber-200 to-yellow-400 inline-block text-transparent bg-clip-text"> Admin HomePage</h1>
                <h1 className="mb-4 text-yellow-400 text-4xl font-serif bg-gradient-to-r from-amber-200 to-yellow-400 inline-block text-transparent bg-clip-text"> Welcome Opps team!</h1>
                <div className="flex flex-row justify-center items-center"> 
                    <button onClick={handleLogOut} className="bg-gradient-to-r from-amber-200 to-yellow-400 text-black rounded-[0.7rem] py-2 px-4 m-3 transition-transform transform hover:scale-110"> Log out </button>
                    {!itIsTimeToAssignIfGroupsMet ? <button onClick={() => { setItIsTimeToAssignIfGroupsMet(true)}} className="bg-gradient-to-r from-amber-200 to-yellow-400 text-black rounded-[0.7rem] py-2 px-4 m-3 transition-transform transform hover:scale-110"> Set if Groups met</button>: <button onClick={() => { setItIsTimeToAssignIfGroupsMet(false)}} className="bg-gradient-to-r from-amber-200 to-yellow-400 text-black rounded-[0.7rem] py-2 px-4 m-3 transition-transform transform hover:scale-110"> Cancel </button>}
                    {!noMemberError && <button className="bg-gradient-to-r from-amber-200 to-yellow-400 text-black rounded-[0.7rem] py-2 px-4 m-3 transition-transform transform hover:scale-110"> Auto Assign</button>}
                    <Link to='/MeetingHistory'> <button className="bg-gradient-to-r from-amber-200 to-yellow-400 text-black rounded-[0.7rem] py-2 px-4 m-3 transition-transform transform hover:scale-110"> View Meeting History </button> </Link>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                {!noMemberError && <h2 className="mb-4 text-yellow-400 text-2xl font-serif bg-gradient-to-r from-amber-200 to-yellow-400 inline-block text-transparent bg-clip-text"> Members Signed Up for Coffee Chats this week:</h2>}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                    {noMemberError && <h1>No members signed up</h1>}
                    {(!noMemberError && !isLoading) && participatingMembersNotInGroupYet.map((pair, index) => (
                        pair.length === 1 ? (
                            <AdminUserDisplay key={index} inPairing = {false} member={pair[0]} numberOfGroups={groups.length} addToGroup = {addToGroup} removeFromGroup = {removeFromGroup} />
                        ) : (
                            <AdminPartnerPairingDisplay key={index} inPairing = {true} pair={pair} numberOfGroups={groups.length} addToGroup = {addToGroup} removeFromGroup = {removeFromGroup}/>
                        )
                    ))}
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {!noMemberError && groups.map((group, index) => (
                        <AdminGroupDisplay key={index} number={index + 1} itIsTimeToAssignIfGroupsMet = {itIsTimeToAssignIfGroupsMet} setItIsTimeToAssignIfGroupsMet = {setItIsTimeToAssignIfGroupsMet} group={group} removeFromGroup = {removeFromGroup} changeNeeded = {changeNeeded} setChangeNeeded = {setChangeNeeded}/>
                    ))}
            </div>
        </div>
    )
}

export default AdminHomePage