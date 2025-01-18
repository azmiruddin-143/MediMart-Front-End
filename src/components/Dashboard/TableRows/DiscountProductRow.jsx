import React, { useState } from 'react';
import DiscountModal from '../../../Modal/DiscountModal';
import { FaEye } from 'react-icons/fa6';
import { IoMdCart } from 'react-icons/io';

const DiscountProductRow = ({ medicine }) => {
    const { _id, medicineImage, discountPercentage, medicineName, perUnitPrice } = medicine
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    return (

        
                <div className="h-[450px] bg-white rounded-lg shadow-lg 2xl:p-4 p-2 text-start">
                    <div className='relative' >
                        <img
                            src={medicineImage}
                            className="w-full h-72 rounded-md object-cover mb-4"
                        />
                        <div class="absolute text-white top-2 right-2 bg-primary rounded-full p-1 shadow">
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
                                    className='absolute inset-0  bg-primary text-white rounded-full'
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


                            />
                        </div>
                        <div className='flex justify-end items-center' >
                            <button className='rounded-full bg-primary text-sm px-3 py-2 font-semibold text-white text-end flex items-center justify-center'>
                                Select <IoMdCart className='text-lg' />
                            </button>

                        </div>
                    </div>

                </div>
    
        

    );
};

export default DiscountProductRow;