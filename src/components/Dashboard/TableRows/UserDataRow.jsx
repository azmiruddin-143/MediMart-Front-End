import React, { useState } from 'react';
import UpdateUserModal from '../../../Modal/UpdateUserModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDataRow = ({ user, index,refetch }) => {
    const { userName,
        userphoto, userEmail, userRole } = user
    const [isOpen, setIsOpen] = useState(false)
  const updateRole =(selectRole) =>{
    if(userRole === selectRole) return
      axios.patch(`http://localhost:5000/users/role/${userEmail}`,{
        userRole : selectRole
      })
      .then(res =>{
         console.log(res.data);
         refetch()
         setIsOpen(false)
         if(res.data.modifiedCount > 0) {
            toast.success("user Role Change!", { autoClose: 3000 });
         }
         
      })
      .catch((err) =>{
        toast.error(`user role error: ${err.message}`, {
            autoClose: 3000,
        });
         setIsOpen(false)
      })
     

  }


    return (
        <tbody>
            <tr className='text-center text-neutral'>
                <th className='flex justify-center text-neutral items-center gap-5'>{index + 1}
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
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <span
                        onClick={() => setIsOpen(true)}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative'>Update Role</span>
                    </span>
                    {/* Modal */}
                    <UpdateUserModal isOpen={isOpen} userRole ={userRole} updateRole ={updateRole}  setIsOpen={setIsOpen}  />
                </td>
            </tr>
        </tbody>
    );
};

export default UserDataRow;