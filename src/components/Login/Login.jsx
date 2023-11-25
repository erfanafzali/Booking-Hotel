/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState("user@gmail.com")
    const [password, setPassword] = useState("1234")
    const { user, login, isAuthentiacted } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && password) login(email, password)
    }

    useEffect(() => {
        if (isAuthentiacted) navigate("/", { replace: true })
    }, [isAuthentiacted, navigate])

    return (
        <div className="w-full  mt-10 sm:mt-12 md:mt-14 lg:mt-16  mb-10 flex justify-center items-center">
            <div className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] flex flex-col bg-blue-800 rounded-xl shadow-lg shadow-blue-800 justify-center items-center  pb-4 sm:pb-6 md:pb-8 lg:pb-10   py-2 sm:py-3 md:py-4 lg:py-5 px-4 sm:px-3 md:px-4 lg:px-5">
                <h1 className="w-full text-center pb-2 sm:pb-3 md:pb-4 lg:pb-5 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">Login form</h1>
                <form onSubmit={handleSubmit} action="" className="w-full flex justify-center items-center flex-col">
                    <div className="w-full flex flex-col justify-center items-center">
                        <label htmlFor="email" className="w-full text-start font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl pb-2 sm:pb-1 md:pb-2 lg:pb-3">Email:</label>
                        <input className="w-full rounded-lg py-0.5 sm:py-1 md:py-1.5 lg:py-2 outline-0 border-0 bg-blue-100 placeholder:text-xs placeholder:sm:text-sm placeholder:md:text-base placeholder:lg:text-lg placeholder:text-blue-300 text-blue-600 font-bold px-1 sm:px-2 md:px-3 lg:px-4 " type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email.test@gmail.com..." />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center pt-2 sm:pt-3 md:pt-4 lg:pt-5">
                        <label htmlFor="password" className="w-full text-start font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl pb-2 sm:pb-1 md:pb-2 lg:pb-3">Password:</label>
                        <input className="w-full rounded-lg py-0.5 sm:py-1 md:py-1.5 lg:py-2 outline-0 border-0 bg-blue-100 placeholder:text-xs placeholder:sm:text-sm placeholder:md:text-base placeholder:lg:text-lg placeholder:text-blue-300 text-blue-600 font-bold px-1 sm:px-2 md:px-3 lg:px-4 " type="text" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password..." />
                    </div>
                    <button className="w-full bg-blue-500  rounded-lg py-0.5 sm:py-1 md:py-1.5 lg:py-2 outline-0 border-0 mt-4 sm:mt-6 md:mt-8 lg:mt-10 font-bold text-sm sm:text-base md:text-lg lg:text-xl text-white">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
