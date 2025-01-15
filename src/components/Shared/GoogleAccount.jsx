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
                    useEmail: result.user?.email,
                    userPhoto: result.user?.photoURL,
                    userRole: "user"
                }
                axios.post('http://localhost:5000/users', userInfo)
                    .then(result => {
                        console.log(result.data);
                        navigate('/')
                    })
            })
    }

    return (

        <div onClick={googleSignin} className='mx-auto flex my-4'>
            <button className="btn">
                <FaGoogle></FaGoogle>
                Google
            </button>
        </div>
    );
};

export default GoogleAccount;