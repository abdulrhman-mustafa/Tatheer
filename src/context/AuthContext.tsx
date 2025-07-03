// src/context/AuthContext.tsx

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getUserSession, saveUserSession, clearUserSession } from "@/utils/auth"; 
import { User } from "@/types/user";

// Defines the shape of values and methods provided by the Auth Context
interface AuthContextProps {
  isAuthenticated: boolean;
  userRole?: "advertiser" | "influencer";
  isLoadingAuth: boolean;
  currentUser: User | null;
  setIsAuthenticated: (value: boolean) => void;
  setUserRole: (role?: "advertiser" | "influencer") => void;
  login: (user: User) => void;
  logout: () => void;
}

// Create the Auth Context with an initial value of undefined
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provides authentication context to child components
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"advertiser" | "influencer" | undefined>(undefined);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Logs the user in and stores session details
  const login = useCallback((user: User) => {
    saveUserSession(user);
    setIsAuthenticated(true);
    setUserRole(user.role);
    setCurrentUser(user);
  }, []);

  // Logs the user out and clears session data
  const logout = useCallback(() => {
    clearUserSession();
    setIsAuthenticated(false);
    setUserRole(undefined);
    setCurrentUser(null);
  }, []);

  // Attempt to load session data on component mount
  useEffect(() => {
    const session = getUserSession();
    if (session) {
      setIsAuthenticated(true);
      setUserRole(session.role);
      setCurrentUser(session);
    }
    setIsLoadingAuth(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        isLoadingAuth,
        currentUser,
        setIsAuthenticated,
        setUserRole,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access the Auth Context in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
