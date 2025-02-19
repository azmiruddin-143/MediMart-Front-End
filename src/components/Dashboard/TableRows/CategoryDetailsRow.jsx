import React, { useContext, useState } from 'react';
import MedicineDetailsModal from '../../../Modal/MedicineDetailsModal';
import { FaEye } from 'react-icons/fa6';
import { IoMdCart } from 'react-icons/io';
import axios from 'axios';
import useCart from '../../../hooks/useCart';
import { AuthContext } from '../../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import useRole from '../../../hooks/useRole';
import toast from 'react-hot-toast';

const CategoryDetailsRow = ({ medicine, index, refetch }) => {
    const { medicineName, genericName, shortDescription, sellerEmail, medicineImage, medicineCategory, company, medicineMassUnit, perUnitPrice, discountPercentage, _id } = medicine
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [, , cartRefetch] = useCart()
    const { role } = useRole()
    const cartMedicine = () => {

        if (user && user?.email) {
            const cartsInfo = {
                cartId: _id,
                email: user?.email,
                name: medicineName,
                image: medicineImage,
                sellerEmail: sellerEmail,
                company: company,
                perUnitPrice: perUnitPrice,
                quantity: 1

            }

            axios.post('https://medi-mart-server-opal.vercel.app/carts', cartsInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        toast.success(' Medicine added cart', {
                            duration: 3000,
                        });
                    }
                    cartRefetch()
                    setIsEditModalOpen(false)
                })
                .catch((error) => {
                    toast.error("Error!", (error.message), {
                        duration: 3000,
                    })
                })
        }

        else {
            navigate('/signin')
        }

    }
    return (
        // <tbody>
        //     <tr className='text-neutral'>
        //         <td className='border border-gray-300 px-4 py-2 text-black'>
        //             <div className="avatar">
        //                 <div className="mask mask-squircle h-12 w-12">
        //                     <img
        //                         src={
        //                             medicineImage} />
        //                 </div>
        //             </div>
        //         </td>

        //         <td className='text-neutral border border-gray-300 px-4 py-2 '>{medicineName}</td>
        //         <td className='text-neutral border border-gray-300 px-4 py-2 '>{genericName} </td>
        //         <td className='text-neutral border border-gray-300 px-4 py-2 '> {medicineCategory}</td>
        //         <td className='text-neutral border border-gray-300 px-4 py-2 '> {company}</td>

        //         <td className='border border-gray-300 px-4 py-2 text-black'>
        //             <span
        //                 onClick={() => { setIsEditModalOpen(true) }}
        //                 className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-black leading-tight'
        //             >

        //                 <span
        //                     aria-hidden='true'
        //                     className='absolute inset-0  bg-primary  rounded-full'
        //                 ></span>
        //                 <div className='flex items-center gap-2'>
        //                     <span className='relative '>Details</span>
        //                     <FaEye className=' relative text-lg' />
        //                 </div>

        //             </span>
        //             <MedicineDetailsModal
        //                 isOpen={isEditModalOpen}
        //                 setIsEditModalOpen={setIsEditModalOpen}
        //                 medicine={medicine}
        //                 refetch={refetch}
        //                 cartMedicine={cartMedicine}

        //             />
        //         </td>
        //         <td className=' border border-gray-300 px-4 py-2 text-black' >
        //             <div className='flex justify-end items-end'>
        //                 <button disabled={role === "Admin" || role === "Seller"} onClick={cartMedicine} className='rounded-full bg-primary px-3 py-2 font-semibold text-black font-bold text-end flex items-center justify-center'>
        //                     Select <IoMdCart className='text-lg' />
        //                 </button>
        //             </div>

        //         </td>


        //     </tr>
        // </tbody>
        <div class="max-w-sm mx-auto h-[420px] bg-gray-50 border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">

            <div class="relative -mt-14">
                <img
                    src={medicineImage}
                    class=" mx-auto shadow-lg w-[400px] h-64 object-cover rounded-md"
                />
            </div>

            <div class="py-4">

                <h2 class="text-xl text-black font-semibold ">{medicineName}</h2>


                <div class="flex space-x-2 my-3">
                    <span class="bg-black text-white  px-2 py-1 text-sm rounded-full">{medicineCategory}</span>
                </div>

                <span class="text-lg font-bold text-neutral">{perUnitPrice}$</span>
                <div class="flex justify-between items-center mt-5">
                    <div className='text-sm cursor-pointer '>
                        <span
                            onClick={() => { setIsEditModalOpen(true) }}
                            className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-black leading-tight'
                        >

                            <span
                                aria-hidden='true'
                                className='absolute inset-0  bg-primary  rounded-full'
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
                            cartMedicine={cartMedicine}
                        />
                    </div>
                    {/* .. */}


                    <div className='cursor-pointer' >
                        <div className=''>
                            <button disabled={role === "Admin" || role === "Seller"} onClick={cartMedicine} className='rounded-full bg-primary px-3 py-[5px] font-semibold text-black text-end flex items-center justify-center'>
                                Select <IoMdCart className='text-lg' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetailsRow;