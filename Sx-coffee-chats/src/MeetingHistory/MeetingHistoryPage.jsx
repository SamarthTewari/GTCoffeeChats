import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { formatDateString } from '../utils.js'
import OneWeekMeetingDisplay from './OneWeekMeetingDisplay.jsx'





const MeetingHistoryPage = () => {
    const [meetings, setMeetings] = useState({})
    const [noMeetingsYet, setNoMeetingsYet] = useState(false)
    useEffect(() => {
        async function getMeetings() {
            
            const response = await axios.get('http://localhost:3001/getAllMeetings')
            const allMeetings = response.data
            if(allMeetings.length == 0){
                setNoMeetingsYet(true)
            }
            const meetingsHashedByDate = {}
            for(let i = 0; i < allMeetings.length; i++){
                const formattedDateString = formatDateString(allMeetings[i].weekMet)
                if (meetingsHashedByDate.hasOwnProperty(formattedDateString)) {
                    meetingsHashedByDate[formattedDateString].push(allMeetings[i].groupMembers);
                } else {
                    meetingsHashedByDate[formattedDateString] = [allMeetings[i].groupMembers];
                }
            }
            setMeetings(meetingsHashedByDate)
        }
        getMeetings()
    }, [])

    return (
    <>
        <h1> MEETING HISTORY </h1>
        {!noMeetingsYet ? Object.entries(meetings).map(([date, members], index) => (
                <OneWeekMeetingDisplay id = {index} key={index} date={date} members={members} />
        )): <h1> No meetings have occurred Yet </h1>}
        <Link to='/AdminHomePage'>
        <button> back to dashboard </button>
        </Link>
    </>
    )
}

export default MeetingHistoryPage

