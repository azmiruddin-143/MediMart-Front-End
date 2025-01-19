import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const CartRow = ({ cart, index, cartRefetch, }) => {
    
 
    const axiosSecure = useAxiosSecure();
    const { image, name, company, perUnitPrice, quantity: buyQuantity, _id } = cart
    const [quantity, Setquantity] = useState(buyQuantity)

    
    
    const subTotal = perUnitPrice * quantity

    const updateCart = {
        quantity,
        subTotal
    }

    axiosSecure.put(`/carts/${_id}`, updateCart)
        .then(res => {
            console.log(res.data);
            cartRefetch()
        })
        .catch((error) => {
            console.log(error);
        })


    const clearCart = (id) => {
        axiosSecure.delete(`/carts/${id}`)
            .then(res => {
                console.log(res.data);
                cartRefetch()
            })
            .catch((error) => {
                console.log(error);
            })
    }



   

    return (
        <tbody>
            <tr className='text-neutral'>
                <th className='flex  text-neutral items-center gap-5'>

                    <button onClick={() => clearCart(_id)} ><RxCross2 className='text-lg border p1 rounded-full' /></button>

                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={
                                    image} />
                        </div>
                    </div>
                </th>

                <td className='text-neutral'>{name}</td>
                <td className='text-neutral'>{company}</td>
                <td className='text-neutral'>{perUnitPrice}$</td>
                <td className='text-neutral'>
                    <div className='flex items-center justify-center  border w-fit px-2 gap-2  ' >
                        <button disabled={(quantity < 2)} onClick={() => Setquantity(quantity - 1)} className='border-r py-3 pr-2 text-center' ><FiMinus /></button>
                        <h1 className='' >{quantity}</h1>
                        <button onClick={() => Setquantity(quantity + 1)} className='border-l py-3 pl-2 '><GoPlus /></button>
                    </div>

                </td>
                <td className='text-neutral text-end'>{subTotal}</td>

            </tr>
        </tbody>
    );
};

export default CartRow;