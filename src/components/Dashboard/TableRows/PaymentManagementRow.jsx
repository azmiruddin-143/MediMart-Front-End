import React, { useState } from 'react';
import { GiClick } from 'react-icons/gi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentManagementRow = ({ payment, refetch,}) => {
    const { price, email, _id, transactionId, status, name, image, menuItemIds, date } = payment
    const axiosSecure = useAxiosSecure()
      
    const acceptPayment = () =>{
        axiosSecure.put(`/payment-status/${_id}`,{ status: "Paid" })
        .then(res =>{
            console.log(res.data);
            refetch()
        })
        .catch((error) =>{
            console.log(error.message);
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

                <td className='text-neutral'>{name[0]}, {name[1]}</td>
                <td className='text-neutral'>{email}</td>
                <td className='text-neutral'>{price}</td>
                <td className='text-neutral'>{menuItemIds.length}</td>
                <td className='text-neutral'>{transactionId}</td>
                <td className='text-neutral'>{date}</td>
                <td className='text-neutral'>{status}</td>
                <td className='text-neutral justify-end flex '>
                    <button disabled ={status === "Paid"} onClick={acceptPayment} className='bg-primary justify-end flex items-center gap-0 py-2 px-4 rounded-full text-white' >
                    Accept
                        <GiClick className=' relative text-lg' />

                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default PaymentManagementRow;
