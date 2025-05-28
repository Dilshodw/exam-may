import { Navigate } from "react-router-dom";
import React from "react";
export function PrivateRoute({children, auth} = {}){
    return auth? children : <Navigate to="/signin" />;
}