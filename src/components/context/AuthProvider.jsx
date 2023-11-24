/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initailState = {
    user: null,
    isAuthentiacted: false,
};

function authReducer(state, action) {
    switch (action.type) {
        case "login":
            return {
                user: action.payload,
                isAuthentiacted: true,
            };
        case "logout":
            return {
                user: null,
                isAuthentiacted: false,
            };
        default:
            throw new Error("Unknown action!");
    }
}

const FAKE_USER = {
    name: "Erfan",
    email: "user@gmail.com",
    password: "1234",
};

export default function AuthProvider({ children }) {
    const [{ user, isAuthentiacted }, dispatch] = useReducer(
        authReducer,
        initailState
    );

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password)
            dispatch({ type: "login", payload: FAKE_USER });
    }

    function logout() {
        dispatch({ type: "logout" })
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthentiacted,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext)
}