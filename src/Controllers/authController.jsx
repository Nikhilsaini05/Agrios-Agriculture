import { createContext, useContext, useEffect, useState } from "react";

export const dataContext = createContext();

export function UserLoginData({ children }) {

    // Load token from localStorage
    const [sessionToken, setSession] = useState(
        localStorage.getItem("token") || null
    );

    // Load user from localStorage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Save user profile
    const saveUserProfile = (profile) => {

        if (!profile) {
            setUser(null);
            localStorage.removeItem("user");
            return;
        }

        setUser(profile);

        localStorage.setItem("user", JSON.stringify(profile));
    };

    // Save session token
    const setUserSession = (token) => {

        setSession(token);

        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    };

    // Optional auto sync
    useEffect(() => {

        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (token) {
            setSession(token);
        }

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

    }, []);

    // Logout function
    const logoutUser = () => {

        setSession(null);
        setUser(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <dataContext.Provider
            value={{
                sessionToken,
                setSession,
                setUserSession,
                saveUserProfile,
                user,
                logoutUser
            }}
        >
            {children}
        </dataContext.Provider>
    );
}

export const UserData = () => {
    return useContext(dataContext);
};