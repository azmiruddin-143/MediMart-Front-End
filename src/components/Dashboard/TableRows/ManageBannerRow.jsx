import React, { useState } from 'react';
import ManageBannerModal from '../../../Modal/ManageBannerModal';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageBannerRow = ({ advertisement, refetch }) => {
    const { advertisementImage, advertisementDescription, advertisementStatus,_id } = advertisement
       const [isOpen, setIsOpen] = useState(false)
    const updateStatus =(selectStatus) =>{
        if(advertisementStatus === selectStatus) return
          axios.patch(`http://localhost:5000/advertisement/status/${_id}`,{
            advertisementStatus : selectStatus
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
            <tr className='text-neutral'>
                <th className='flex  text-neutral items-center gap-5'>
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={
                                    advertisementImage} />
                        </div>
                    </div>
                </th>

                <td className='text-neutral'>{advertisementDescription}</td>
                <td className='text-neutral'>{advertisementStatus}</td>
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
                    <ManageBannerModal isOpen={isOpen} advertisementStatus={advertisementStatus} updateStatus={updateStatus} setIsOpen={setIsOpen} />
                </td>


            </tr>
        </tbody>
    );
};

export default ManageBannerRow;