/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { useEffect } from "react"

function ProtectedRoute({ children }) {
    const navigate = useNavigate()
    const { isAuthentiacted } = useAuth()

    useEffect(() => {
        if (!isAuthentiacted) navigate("/login")
    }, [isAuthentiacted, navigate])

    return isAuthentiacted ? children : null
}

export default ProtectedRoute
