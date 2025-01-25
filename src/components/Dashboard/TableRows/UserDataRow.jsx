import React, { useState } from 'react';
import UpdateUserModal from '../../../Modal/UpdateUserModal';
import { GiClick } from "react-icons/gi";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import DeleteUsers from '../../../pages/Dashboard/Admin/DeleteUsers';
import axios from 'axios';
const UserDataRow = ({ user, index, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { userName,
        userphoto, userEmail, userRole, _id } = user
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    function openUpdateModal() {
        setIsUpdateOpen(true);
    }

    function closeUpdateModal() {
        setIsUpdateOpen(false);
    }

    function openDeleteModal() {
        setIsDeleteOpen(true);
    }

    function closeDeleteModal() {
        setIsDeleteOpen(false);
    }
    const updateRole = (selectRole) => {
        if (userRole === selectRole) return
        axiosSecure.patch(`/users/role/${userEmail}`, {
            userRole: selectRole
        })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('User Role Change', {
                        duration: 3000,
                    });
                }
                refetch()
                setIsUpdateOpen(false);


            })
            .catch((error) => {
                toast.error("Error!", (error.message), {
                    duration: 3000,
                })
                setIsUpdateOpen(false);
            })


    }



    const UsersDelete = () => {
        axios.delete(`http://localhost:5000/users/${_id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success('User deleted successfully!', {
                        duration: 3000,
                    });
                }
                refetch()
                setIsDeleteOpen(false);
            })
            .catch((error) => {
                toast.error("Error!", (error.message), {
                    duration: 3000,
                })
            })
    }


    return (
        <tbody>
            <tr className='text-neutral'>
                <th className='flex  text-neutral items-center gap-5'>{index + 1}
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                referrerPolicy='no-referrer'
                                src={
                                    userphoto} />

                        </div>
                    </div>
                </th>

                <td className='text-neutral border border-gray-300 px-4 py-2'>{userName}</td>
                <td className='text-neutral border border-gray-300 px-4 py-2'>{userEmail} </td>
                <td className={`${userRole === "Admin"
                        ? "text-yellow-600 font-bold"
                        : userRole === "Seller"
                            ? "text-blue-500 font-bold"
                            : "text-black font-bold"
                    } border border-gray-300 px-4 py-2`}
                >{userRole}</td>
                <td className='px-2 text-end py-5 border-b border-gray-200 bg-white text-sm'>
                    <span
                        onClick={openUpdateModal}
                        className='relative cursor-pointer inline-block px-2 py-2 font-semibold text-black leading-tight'
                    >
                        <span aria-hidden='true' className='absolute inset-0 bg-primary rounded-full'></span>
                        <div className='flex items-center gap-0'>
                            <span className='relative '>Toggle Role</span>
                            <GiClick className=' relative text-lg' />
                        </div>
                    </span>
                    <UpdateUserModal
                        isOpen={isUpdateOpen}
                        userRole={userRole}
                        updateRole={updateRole}
                        setIsOpen={setIsUpdateOpen}
                        closeUpdateModal={closeUpdateModal}
                    />
                </td>

                <td className='border border-gray-300 px-4 py-2 text-sm'>
                    <div className='flex justify-end'>
                        <span
                            onClick={openDeleteModal}
                            className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-white leading-tight'
                        >
                            <span aria-hidden='true' className='absolute inset-0 bg-black rounded-full'></span>
                            <div className='flex items-center gap-0'>
                                <span className='relative'>Delete</span>
                                <GiClick className=' relative text-lg' />
                            </div>
                        </span>
                    </div>
                    <DeleteUsers
                        isOpen={isDeleteOpen}
                        UsersDelete={UsersDelete}
                        closeModal={closeDeleteModal}
                    />
                </td>
            </tr>
        </tbody>
    );
};

export default UserDataRow;