import React, { useContext, useState } from 'react';
import { IoMdCart } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import DiscountModal from '../../Modal/DiscountModal';
import { FaEye } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import useCart from '../../hooks/useCart';
import useRole from '../../hooks/useRole';
import toast from 'react-hot-toast';
import axios from 'axios';

const LatestProductCard = ({ medicine }) => {
    const { medicineName, genericName, shortDescription,
        sellerEmail, medicineImage, medicineCategory, company, medicineMassUnit, perUnitPrice, discountPercentage, _id } = medicine
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [, , cartRefetch] = useCart()
    const { role } = useRole()
    const cartDiscount = () => {

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
        <div class="max-w-sm p-4">
            <div class=" border rounded-lg p-2 shadow-lg overflow-hidden">

                <div class="relative">
                    <div class="absolute top-2 left-2 bg-primary text-black text-xs font-semibold py-1 px-2 rounded-full">
                        Latest Product
                    </div>
                </div>

                <img class="w-[400px] h-64 object-cover rounded-md" src={medicineImage} alt="Chek Trouser" />

                <div class="p-2">
                    <h1 class="text-2xl font-semibold text-black pb-1 ">{medicineName}</h1>
                    <p class="text-md text-neutral">{medicineCategory}</p>
                    {/* <p class="text-md text-neutral py-1"> Total Purchase: <span className='font-bold text-neutral'>{purchaseCount}</span> </p> */}


                    {
                        discountPercentage === 0 ? <h1 className='text-sm line-through'>No Discount</h1> :
                            <h1 className='line-through'>{discountPercentage}%</h1>
                    }
                    <span class="text-xl font-bold text-neutral"> ${perUnitPrice}</span>



                    <div className='flex justify-between' >
                        <div className=' py-5 border-b border-gray-200 bg-white text-sm'>
                            <span
                                onClick={() => { setIsEditModalOpen(true) }}
                                className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-white leading-tight'
                            >

                                <span
                                    aria-hidden='true'
                                    className='absolute inset-0  bg-black black rounded-full'
                                ></span>
                                <div className='flex items-center gap-2'>
                                    <span className='relative '>Details</span>
                                    <FaEye className=' relative text-lg' />
                                </div>

                            </span>
                            <DiscountModal
                                isOpen={isEditModalOpen}
                                setIsEditModalOpen={setIsEditModalOpen}
                                medicine={medicine}
                                cartDiscount={cartDiscount}


                            />
                        </div>
                        <div className='flex justify-end items-center' >
                            <button disabled={role === "Admin" || role === "Seller"} onClick={cartDiscount} className='rounded-full bg-primary text-sm px-3 py-2 font-semibold text-black text-end flex items-center justify-center'>
                                Select <IoMdCart className='text-lg' />
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestProductCard;