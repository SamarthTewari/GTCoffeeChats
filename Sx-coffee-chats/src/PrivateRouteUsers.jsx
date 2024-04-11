import React from "react";
import { Navigate } from "react-router-dom";


const PrivateRouteUsers = ({ children }) => {
    if (!localStorage.getItem('loggedInUser')) {
        localStorage.clear();
        return <Navigate to="/"/>;
    }
    return (
        <div>
            {children}
        </div>
    );
};


export default PrivateRouteUsers