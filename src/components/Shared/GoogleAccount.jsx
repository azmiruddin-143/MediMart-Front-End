import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';


const GoogleAccount = () => {
    const { googleRegister } = useContext(AuthContext)
    const navigate = useNavigate()

    const googleSignin = () => {
        googleRegister()
            .then((result) => {
                console.log(result.user);
                const userInfo = {
                    userName: result.user?.displayName,
                    userEmail: result.user?.email,
                    userphoto: result.user?.photoURL,
                    userRole: "User"
                }
                axios.post('https://medi-mart-server-opal.vercel.app/users', userInfo)
                    .then(result => {
                        console.log(result.data);
                        navigate('/')
                    })
            })
    }

    return (

        <div onClick={googleSignin} className='mx-auto flex items-center my-4'>
            <button className="bg-black flex items-center gap-2 text-white rounded-md py-2 px-5">
                <FaGoogle></FaGoogle>
                Google
            </button>
        </div>
    );
};

export default GoogleAccount;