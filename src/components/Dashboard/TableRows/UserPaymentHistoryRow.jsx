import React, { useState } from 'react';
import { GiClick } from 'react-icons/gi';

const UserPaymentHistoryRow = ({ payment}) => {
    const { price, email, _id, transactionId, status, name, image, menuItemIds, date } = payment
    
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
                <td className='text-neutral text-end'>{status}</td>     
            </tr>
        </tbody>
    );
};

export default UserPaymentHistoryRow;
