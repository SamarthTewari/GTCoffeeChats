// @ts-ignore
import axios from "axios";
// @ts-ignore
import React, {useState, useEffect, useRef} from "react";
import { formatWords } from '../utils.js';
// @ts-ignore
import { Navigate, useNavigate } from "react-router-dom";



function PickBuddyForm(props) {
    const [buddyNameInput, setBuddyNameInput] = useState("")
    const [listOfValidUsers, setListOfValidUsers] = useState([])
    const [selectecUserIsAlreadyYourPartnerError, setselectecUserIsAlreadyYourPartnerError] = useState(false)
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const navigate = useNavigate();


    async function getValidUsers() {
        try {
            /* parse words to make it upper still appear in values array also
            adjust input so all data is stored in upper case*/
            const formatedString = formatWords(buddyNameInput)
            const values = await axios.get(`http://localhost:3001/getMemberByPrefix?name=${formatedString}`);
            console.log(values.data)
            if(values.data.length == 0){
                props.setNoUsersFoundError(true)
            }
            else{
                setListOfValidUsers(values.data) // sets it to array of valid names base on server call
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    

    useEffect(() => {
        if(buddyNameInput == ""){
            props.setNoUsersFoundError(false)
            setListOfValidUsers([])
        }
        else {
            props.setNoUsersFoundError(false)
            getValidUsers();
        } 
    }, [buddyNameInput]);


    async function handleSubmit(e){ /*put try catch block*/
        /* see if we can simplfy this to make less query calls theres one extra feels like see if possible to check 
        null on query call*/
        e.preventDefault()
        props.setselectedAlreadyHasPartnerError(false)
        props.setselectecUserIsAlreadyYourPartnerError(false)
    
        const selectedUserName = document.getElementById('buddyInput').value;
        const selectedUser = listOfValidUsers.find(user => user.name === selectedUserName);

        const selectedUserId = selectedUser._id
        console.log(selectedUserId)
        
        try{
            /** finding UserIdAbove, make sure to check for same name condition */
            const potentialPartnerResponse = await axios.get(`http://localhost:3001/getMemberById/${selectedUserId}`);
            const potentialPartner = potentialPartnerResponse.data; 
            if((potentialPartner.partner == null)){
                /* setting loggedInUser's old Partner's partner to null, set updating the partner to new partners*/
                if(!(loggedInUser.partner == null)){
                    
                    const previousUserPartnerResponse = await axios.patch(`http://localhost:3001/updateData/${loggedInUser.partner._id}`,{ partner: null});
                }
                /* partner field*/
                const updatedUser = await axios.patch(`http://localhost:3001/updateData/${loggedInUser._id}`, { partner: potentialPartner, isAssignedToGroupThisWeek: false, groupNumberForThisWeek: null});
                const updatedPartner = await axios.patch(`http://localhost:3001/updateData/${selectedUserId}`, { partner: updatedUser.data, isAssignedToGroupThisWeek: false, groupNumberForThisWeek: null});
                localStorage.setItem('loggedInUser', JSON.stringify(updatedUser.data));
                navigate('/UserHomePage')
            }
            else{
                if(!(loggedInUser.partner == null ) && selectedUserId == loggedInUser.partner._id){
                    props.setselectecUserIsAlreadyYourPartnerError(true)
                }
                else{
                    props.setselectedAlreadyHasPartnerError(true)
                }
            }
        }
        catch(err){
            console.log(err)
        }
        
    }

    async function handleRemovePartner() {
        const currentPartnerId = loggedInUser.partner._id
        const updatedUser = await axios.patch(`http://localhost:3001/updateData/${loggedInUser._id}`, { partner: null,isAssignedToGroupThisWeek: false, groupNumberForThisWeek: null});
        const updatedPartner = await axios.patch(`http://localhost:3001/updateData/${currentPartnerId}`, { partner: null,isAssignedToGroupThisWeek: false, groupNumberForThisWeek: null});
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser.data));
        navigate('/UserHomePage')

    }



    return(
        <div className="flex flex-col justify-center items-center"> 
            <form>
                <input type="text" id="buddyInput" placeholder="Type or select a buddy" value={buddyNameInput} onChange={(e) => setBuddyNameInput(e.target.value)} 
                    list="buddyNames" autoComplete="off" className="border mr-6 border-yellow-500 bg-black text-white px-4 py-2 m-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"/>
                {!props.noUsersFoundError && 
                        <datalist id="buddyNames" autoComplete="off">
                            {listOfValidUsers.map((user) => (
                                <option key={user._id} value={user.name} data-id={user.id}/>
                            ))}
                        </datalist>
                    }
                <button type="submit" onClick={handleSubmit} className = "bg-gradient-to-r from-amber-200 to-yellow-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-200 text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"> Choose </button> 
            </form>
            {!(loggedInUser.partner == null) && <button onClick={handleRemovePartner} className = "mt-4 bg-gradient-to-r from-amber-200 to-yellow-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-200 text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"> Remove {loggedInUser.partner.name} as your partner</button>}
        </div>
    )
}

export default PickBuddyForm