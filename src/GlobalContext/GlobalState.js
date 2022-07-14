import React, {  createContext, useEffect, useState } from "react";
import { auth } from "../firebase_config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";


export const UserContext = createContext()

function GlobalState({ children }) {
    const [checkLogin  , setcheckLogin] = useState(false)
    const [showNavbar , setShowNavbar] = useState(true)
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setcheckLogin(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth , (currentUser)=>{
        if(currentUser){
            localStorage.setItem("userId", currentUser.uid);
            localStorage.setItem("userEmail", currentUser.email);
        }else{
            localStorage.removeItem("userId");
            localStorage.removeItem("userEmail");
        }
    })
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  })

  return (
    <UserContext.Provider
      value={{
        createUser,
        signIn,
        logout,
        checkLogin,
        setcheckLogin,
        showNavbar,
        setShowNavbar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default GlobalState