import React, { useContext, useState } from 'react';
import DiscountModal from '../../../Modal/DiscountModal';
import { FaEye } from 'react-icons/fa6';
import { IoMdCart } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import useCart from '../../../hooks/useCart';
import axios from 'axios';
import useRole from '../../../hooks/useRole';
import toast from 'react-hot-toast';
const DiscountProductRow = ({ medicine }) => {
    const { _id, medicineImage, discountPercentage,company,sellerEmail, medicineName, perUnitPrice } = medicine
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
     const [,,cartRefetch] = useCart()
     const {role} = useRole()
    const cartDiscount = () => {

        if (user && user?.email) {
            const cartsInfo = {
                cartId: _id,
                email: user?.email,
                name: medicineName,
                image: medicineImage,
                sellerEmail:sellerEmail,
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

        
                <div className="h-[450px] bg-white rounded-lg shadow-lg 2xl:p-4 p-2 text-start">
                    <div className='relative' >
                        <img
                            src={medicineImage}
                            className="w-full h-72 rounded-md object-cover mb-4"
                        />
                        <div class="absolute text-black top-2 font-bold right-2 bg-primary rounded-full p-1 shadow">
                            <h1>{discountPercentage}%</h1>
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold">{medicineName}</h3>
                    <h3 className="text-lg font-semibold">{perUnitPrice}$</h3>

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
                                cartDiscount ={cartDiscount}
                            />
                        </div>
                        <div className='flex justify-end items-center' >
                            <button  disabled={role === "Admin" || role === "Seller"} onClick={cartDiscount} className='rounded-full bg-primary text-sm px-3 py-2 font-semibold text-black text-end flex items-center justify-center'>
                                Select <IoMdCart className='text-lg' />
                            </button>

                        </div>
                    </div>

                </div>
    
        

    );
};

export default DiscountProductRow;