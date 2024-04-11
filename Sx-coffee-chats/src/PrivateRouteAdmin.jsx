import React from "react";
import { Navigate } from "react-router-dom";


const PrivateRouteAdmin = ({ children }) => {
    if (!localStorage.getItem('loggedInAdmin')) {
        localStorage.clear();
        return <Navigate to="/"/>;
    }
    return (
        <div>
            {children}
        </div>
    );
}


export default PrivateRouteAdmin