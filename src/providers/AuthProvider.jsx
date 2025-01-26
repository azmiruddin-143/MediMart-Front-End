import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loader, setLoader] = useState(true)
    const provider = new GoogleAuthProvider();
    // google user//
    // medicin

    const googleRegister = () => {
        setLoader(true)
        return signInWithPopup(auth, provider)
    }
    // create User//
    const registerUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login User //

    const loginUser = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userLogout = () => {
        return signOut(auth)

    }

    const myProfileUpdate = (updatedData) => {
        setLoader(true)
        return updateProfile(auth.currentUser,updatedData)
    }


    useEffect(() => {
        setLoader(true)
        const unsubscibe = onAuthStateChanged(auth, (currentUser) => {
            
            if (currentUser) {
                setuser(currentUser)
                setLoader(false)

                const userInfo = {
                    email: currentUser?.email
                }
                axios.post('https://medi-mart-server-opal.vercel.app/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem("access-token", res.data.token)
                        }
                    })

            } else {
                setLoader(false)
                localStorage.removeItem("access-token")
                setuser(null)
            }
           

        })
        return () => {
            return unsubscibe()
        }
    }, [user?.displayName,user?.photoURL])

   
    console.log(user);

    const authObjct = {
        registerUser,
        googleRegister,
        loginUser,
        userLogout,
        myProfileUpdate,
        user,
        setuser,
        loader,
        setLoader
    }

    return (
        <div>
            <AuthContext.Provider value={authObjct}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;