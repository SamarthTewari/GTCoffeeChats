import React from 'react'
import { Link } from 'react-router-dom'; /* to define link tags */



function HomePage() {

    return(
    <div className="bg-gradient-to-r from-gray-700 to-black w-full min-h-screen flex flex-col justify-center items-center">
        <h1 style={{ position: 'absolute', top: 20 }} className="text-yellow-400 text-7xl font-serif bg-gradient-to-r from-amber-200 to-yellow-400 inline-block text-transparent bg-clip-text"> SX COFFEE CHATS</h1>
            <div class= "flex flex-row justify-center items-center ">
                <Link to="/login">
                    <button className="bg-gradient-to-r from-amber-200 to-yellow-400 text-black rounded-[0.7rem] py-2 px-4 m-3 transition-transform transform hover:scale-110">
                        Log In
                    </button>
                </Link>
                <Link to="/AdminLogIn"> 
                    <button className="bg-gradient-to-r from-amber-200 to-yellow-400 text-black rounded-[0.7rem] p-2 m-3 transition-transform transform hover:scale-110">
                        Admin Log In
                    </button>
                </Link>
                <Link to="/signUp">
                    <button className="bg-gradient-to-r from-amber-200 to-yellow-400 text-black rounded-[0.7rem] p-2 m-3 transition-transform transform hover:scale-110">
                        Sign Up
                    </button>
                </Link>
                </div>
    </div>

    )
}

export default HomePage