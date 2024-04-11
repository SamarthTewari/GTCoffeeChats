import React from 'react'




const OneWeekMeetingDisplay = (props) => {
    return (
    <div>
        <h1> Date: {props.date} </h1>
        {props.members.map((member, memberIndex) => (
            <div key={memberIndex}>
            {member.length > 0 && <h1>Group: {memberIndex + 1}</h1>}
                {Array.isArray(member) && member.map((item, itemIndex) => (
                    <div key={`${memberIndex}-${itemIndex}`}>
                    <p>{item.name}</p>
            </div>
        ))}
    </div>
))}
    </div>
    )
}

export default OneWeekMeetingDisplay