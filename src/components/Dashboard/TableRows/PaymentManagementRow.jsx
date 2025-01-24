import React, { useState } from 'react';
import { GiClick } from 'react-icons/gi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const PaymentManagementRow = ({ payment, refetch, }) => {
    const { price, email, _id, transactionId, status, name, image, menuItemIds, date } = payment
    const axiosSecure = useAxiosSecure()

    const dateFromMongoDB = date; // MongoDB theke asha date
    const dateObject = new Date(dateFromMongoDB); // ISO string ke Date object e convert
    
    // MM/DD/YYYY format e convert
    const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    
    // console.log(formattedDate); // Output: 1/20/2025

    const acceptPayment = () => {
        axiosSecure.put(`/payment-status/${_id}`, { status: "Paid" })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Payment Accept', {
                        duration: 3000,
                    });
                }

                refetch()
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
                {/* <th className='flex  text-neutral items-center gap-5'>
                  
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">

                            <img
                                src={
                                    image} />
                        </div>
                    </div> 
                </th> */}

                <td className="border border-gray-300 px-4 py-2 ">
                    <div className='gap-2 flex '>
                        {name.map((item, index) => (
                            <li className="list-none" key={index}>
                                {index + 1} {item}
                            </li>
                        ))}
                    </div>
                </td>
                <td className='text-neutral border border-gray-300 px-4 py-2'>{email}</td>
                <td className='text-neutral border border-gray-300 px-4 py-2'>{price}</td>
                <td className='text-neutral border border-gray-300 px-4 py-2'>{menuItemIds.length}</td>
                <td className='text-neutral border border-gray-300 px-4 py-2'>{transactionId}</td>
                <td className='text-neutral border border-gray-300 px-4 py-2'>{formattedDate}</td>
                <td className={`${status === "Paid" ? ' text-green-600 font-bold  border border-gray-300 px-4 py-2 ' :" border border-gray-300 px-4 py-2 "}`}>{status}</td>
                <td className='text-neutral  border border-gray-300 px-4 py-2 '>
                    <div className=' justify-end flex'>
                        <button disabled={status === "Paid"} onClick={acceptPayment} className={`${status === "Pending" ? 'bg-primary justify-end flex items-center gap-0 py-2 px-4 rounded-full text-[black] font-bold' : "bg-[#f1f1f1] justify-end text-[#979797] flex items-center gap-0 py-2 px-4 rounded-full "}`}  >
                            Accept
                            <GiClick className=' relative text-lg'/>

                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    );
};

export default PaymentManagementRow;
