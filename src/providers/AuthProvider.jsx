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

    const myProfileUpdate = (profileUpdate) => {
        setLoader(true)
        return updateProfile(auth.currentUser, profileUpdate)
    }


    useEffect(() => {
        const unsubscibe = onAuthStateChanged(auth, (currentUser) => {
            setuser(currentUser)
            if (currentUser) {
                const userInfo = {
                    email: currentUser?.email
                }
                axios.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem("access-token", res.data.token)
                        }
                    })

            } else {
                
                localStorage.removeItem("access-token")
            }
            setLoader(false)

        })
        return () => {
            return unsubscibe()
        }
    }, [])

    useEffect(() => {
        if (user) {
            setLoader(false)
        }

    }, [user])



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