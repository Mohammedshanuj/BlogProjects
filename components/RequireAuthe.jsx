import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
//import { selectCurrentUser } from '../redux/slices/authSlice'

function RequireAuthe() {
    const {user} =  useSelector(state => state.loggedIn)
    const location=useLocation()
    return user ? (
        <Outlet />
    ) : (
        <Navigate to='/home' state={{ from: location }} replace />
    )
}

export default RequireAuthe


