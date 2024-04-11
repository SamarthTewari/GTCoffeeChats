import React, {useState, useEffect,} from "react";
import { useNavigate } from 'react-router-dom';


function ViewMemberDataPage() {
    const navigate = useNavigate();
    const [storedData, setStoredData] = useState(null);

    useEffect(() => {
        console.log("useEffect")
        
        const dataFromStorage = localStorage.getItem('SelectedMemberData');
        if (dataFromStorage) {
            setStoredData(JSON.parse(dataFromStorage));
        }
    }, []);


    function handleGoBack() {
        localStorage.removeItem('SelectedMemberData');
        navigate("/AdminHomePage")


    }
    

    return(
        <div className="bg-gradient-to-r from-gray-700 to-black min-h-screen flex flex-col items-center">
            <h1 className="text-5xl mb-12 bg-gradient-to-r from-amber-200 to-yellow-400 p-2 inline-block text-transparent bg-clip-text"> MEMBER DATA: </h1>
            {storedData && ( // Conditionally render content when storedData is not null
                <div className="flex flex-col">
                    <h1 className="text-2xl bg-gradient-to-r from-amber-200 to-yellow-400 p-2 inline-block text-transparent bg-clip-text">Name: {storedData.name}</h1>
                    <h3 className="text-2xl bg-gradient-to-r from-amber-200 to-yellow-400 p-2 inline-block text-transparent bg-clip-text">Email: {storedData.email}</h3>
                    <h3 className="text-2xl bg-gradient-to-r from-amber-200 to-yellow-400 p-2 inline-block text-transparent bg-clip-text">Partner: {storedData.partner?.name || "No partner"}</h3>
                </div>
            )}
            <button onClick={handleGoBack} class = "mt-8 bg-gradient-to-r from-amber-200 to-yellow-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-200 text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">Back To Admin Home Page</button>
        </div>
    );
}

export default ViewMemberDataPage