import React, { useState } from 'react';
import UpdateUserModal from '../../../Modal/UpdateUserModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiClick } from "react-icons/gi";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const UserDataRow = ({ user, index, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { userName,
        userphoto, userEmail, userRole } = user
    const [isOpen, setIsOpen] = useState(false)
    const updateRole = (selectRole) => {
        if (userRole === selectRole) return
        axiosSecure.patch(`/users/role/${userEmail}`, {
            userRole: selectRole
        })
            .then(res => {
                console.log(res.data);
                refetch()
                setIsOpen(false)
                if (res.data.modifiedCount > 0) {
                    toast.success("user Role Change!", { autoClose: 3000 });
                }

            })
            .catch((err) => {
                toast.error(`user role error: ${err.message}`, {
                    autoClose: 3000,
                });
                setIsOpen(false)
            })


    }


    return (
        <tbody>
            <tr className='text-neutral'>
                <th className='flex  text-neutral items-center gap-5'>{index + 1}
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={
                                    userphoto} />
                        </div>
                    </div>
                </th>

                <td className='text-neutral'>{userName}</td>
                <td className='text-neutral'>{userEmail} </td>
                <td className='text-neutral'> {userRole}</td>
                <td className='px-2 text-end py-5 border-b  border-gray-200 bg-white text-sm'>
                    <span
                        onClick={() => setIsOpen(true)}
                        className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-white leading-tight'
                    >

                        <span
                            aria-hidden='true'
                            className='absolute inset-0  bg-primary text-white rounded-full'
                        ></span>
                        <div className='flex items-center gap-0'>
                            <span className='relative '>Update</span>
                            <GiClick className=' relative text-lg' />
                        </div>

                    </span>
                    {/* Modal */}
                    <UpdateUserModal isOpen={isOpen} userRole={userRole} updateRole={updateRole} setIsOpen={setIsOpen} />
                </td>
            </tr>
        </tbody>
    );
};

export default UserDataRow;