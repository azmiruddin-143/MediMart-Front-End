import React, { useState } from 'react';
import { GiClick } from 'react-icons/gi';

const UserPaymentHistoryRow = ({ payment }) => {
    const { price, email, _id, transactionId, status, name, image, menuItemIds, date } = payment
    const dateFromMongoDB = date;
    const dateObject = new Date(dateFromMongoDB);

    const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    return (
        <tbody>
            <tr className='text-neutral'>
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
                <td className='text-neutral border border-gray-300 px-4 py-2'>{price}$</td>
                <td className='text-neutral border border-gray-300 px-4 py-2'>{menuItemIds.length}</td>
                <td className='text-neutral border border-gray-300 px-4 py-2'>{transactionId}</td>
                <td className='text-neutral border border-gray-300 px-4 py-2'>{formattedDate}</td>
                <td className={`${status === "Paid" ? ' text-green-600 font-bold  border border-gray-300 px-4 py-2 ' : " border border-gray-300 px-4 py-2 "}`}>{status}</td>
            </tr>
        </tbody>
    );
};

export default UserPaymentHistoryRow;
