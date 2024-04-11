import React from "react";
import { Navigate } from "react-router-dom";


const PrivateRouteOTP = ({ children }) => {
    if (!localStorage.getItem('userEmail')) {
        localStorage.clear();
        return <Navigate to="/"/>;
    }
    return (
        <div>
            {children}
        </div>
    );
}


export default PrivateRouteOTP