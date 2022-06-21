import React, {useContext} from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import {UserContext} from "../../contexts/UserContext";

export default function PrivateRoute() {
    const { currentUser } = useContext(UserContext);
    console.log(currentUser)

    return currentUser ? <Outlet /> : <Navigate to="/login"/>


}
