import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './utils/Common-utils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get(`${API_URL}/auth/user`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const userData = response.data;
                    setUser(userData);
                    setUserRole(userData.role || 'guest'); // Safely set the role
                } else {
                    setUser(null);
                    setUserRole(null);
                }
            } catch (error) {
                console.error('Error fetching user data', error);
                setUser(null);
                setUserRole(null);
            }
        };

        fetchUser();
    }, []); // Removed dependency on `user.role`

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, setIsAuthenticated, user, setUser, setUserRole, userRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
