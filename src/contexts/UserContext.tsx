import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import axios, { isAxiosError } from 'axios';
import { useCookies } from 'react-cookie';

// Define user types
export type UserRole = "student" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  accountType: UserRole;
  joinDate: string;
  coursesEnrolled?: number;
  coursesCompleted?: number;
  profileImageUrl?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => any;
  signUp: (name: string, email: string, password: string) => any;
  ChangeInformation:(name:string ,email:string) =>any;
  
  logout: () => any;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);



export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cookies, setCookie ,removeCookie] = useCookies(['accessToken', 'refreshToken'])

  // Login function with admin restriction
  const login = async (email: string, password: string) => {
    const controller = new AbortController();
    // Check for admin credentials
    try {

      const Responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`, {
        email: email,
        password: password

      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      let expiresAccessToken = new Date()
      expiresAccessToken.setTime(expiresAccessToken.getTime() + (24 * 60 * 60 * 1000))
      let expiresRefreshToken = new Date();
      expiresRefreshToken.setTime(expiresRefreshToken.getTime() + (10 * 24 * 60 * 60 * 1000))
      setCookie('accessToken', Responce.data.data.accessToken, { expires: expiresAccessToken })
      setCookie('refreshToken', Responce.data.data.refreshToken, { expires: expiresRefreshToken })

      setUser(Responce.data.data.user);
      toast.success("Student login successful!");
      return true;


    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

      }
      toast.error("Invalid credentials");
      return false;

    }
  };

  // signUp function 
  const signUp = async (name: string, email: string, password: string) => {
    const controller = new AbortController();
    // Check for admin credentials
    try {

      const Responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`, {
        userName: name,
        email: email,
        password: password,

      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });


      setUser(Responce.data.data);
      toast.success(" successful  create account");
      return true;


    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

      }
      toast.error("Invalid credentials");
      return false;

    }
  }

  const logout = async() => {

    const controller = new AbortController();
    // Check for admin credentials
    try {

      const Responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/logout`,{}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`
        }
      });

      removeCookie('accessToken');
      removeCookie('refreshToken');
      setUser(null);
      toast.success(" successful  logout");
      return true;


    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

      }
      toast.error("Invalid credentials");
      return false;

    }

    setUser(null);
    toast.info("You have been logged out");
  };
  const ChangeInformation = async(name:string ,email:string)=>{
    const controller = new AbortController();
    // Check for admin credentials
    try {

      const Responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/update`, {
        name: name,
        email: email

      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`
        }
      });
      console.log(Responce.data.data);

      setUser(Responce.data.data);
      toast.success(" successful change information");

      return true;
    }catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

      }
      toast.error("Invalid credentials");
      return false;

    }
    

  };


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        signUp,
        ChangeInformation,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

