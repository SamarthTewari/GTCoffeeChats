import React from "react";


function EnterOtpPage() {
    const email = localStorage.getItem("userEmail") // clear when done

    return (
        <>
            <h1> Enter Code Sent to {email} </h1>
        </>
    )
}

export default EnterOtpPage