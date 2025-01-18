import React, { useContext, useState } from 'react';
import MedicineDetailsModal from '../../../Modal/MedicineDetailsModal';
import { FaEye } from 'react-icons/fa6';
import { IoMdCart } from 'react-icons/io';
import axios from 'axios';
import useCart from '../../../hooks/useCart';
import { AuthContext } from '../../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const CategoryDetailsRow = ({medicine,index,refetch}) => {
    const { medicineName, genericName, shortDescription, medicineImage, medicineCategory, company, medicineMassUnit, perUnitPrice, discountPercentage, _id } = medicine
   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
   const navigate = useNavigate()
   const { user } = useContext(AuthContext)
   const [,,cartRefetch] = useCart()
   const cartMedicine = () => {

    if (user && user?.email) {
        const cartsInfo = {
            cartId: _id,
            email: user?.email,
            name: medicineName,
            image: medicineImage,
            company: company,
            perUnitPrice: perUnitPrice,
            quantity: 1

        }

        axios.post('http://localhost:5000/carts', cartsInfo)
            .then(res => {
                console.log(res.data);
                cartRefetch()
                setIsEditModalOpen(false)
            })
            .catch((error) => {
                console.log(error.data);
            })
    }

    else {
        navigate('/signin')
    }

}
    return (
         <tbody>
                    <tr className='text-neutral'>
                        <th className='flex  text-neutral items-center gap-5'>{index + 1}
                            <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                    <img
                                        src={
                                            medicineImage} />
                                </div>
                            </div>
                        </th>
        
                        <td className='text-neutral'>{medicineName}</td>
                        <td className='text-neutral'>{genericName} </td>
                        <td className='text-neutral'> {medicineCategory}</td>
                        <td className='text-neutral'> {company}</td>
        
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <span
                                onClick={() => { setIsEditModalOpen(true) }}
                                className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-white leading-tight'
                            >
        
                                <span
                                    aria-hidden='true'
                                    className='absolute inset-0  bg-primary text-white rounded-full'
                                ></span>
                                <div className='flex items-center gap-2'>
                                    <span className='relative '>Details</span>
                                    <FaEye className=' relative text-lg' />
                                </div>
        
                            </span>
                            <MedicineDetailsModal
                                isOpen={isEditModalOpen}
                                setIsEditModalOpen={setIsEditModalOpen}
                                medicine={medicine}
                                refetch={refetch}
                                cartMedicine ={cartMedicine}
                                
                            />
                        </td>
                        <td className='flex justify-end items-center' >
                            <button onClick={cartMedicine}  className='rounded-full bg-primary px-3 py-2 font-semibold text-white text-end flex items-center justify-center'>
                                Select <IoMdCart className='text-lg' />
                            </button>
        
                        </td>
        
        
                    </tr>
                </tbody>
    );
};

export default CategoryDetailsRow;