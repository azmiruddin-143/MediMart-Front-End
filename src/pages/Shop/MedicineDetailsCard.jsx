import { Description } from '@headlessui/react';
import React from 'react';
import { IoMdCart } from 'react-icons/io';
import useRole from '../../hooks/useRole';

const MedicineDetailsCard = ({ medicine, cartMedicine }) => {
    const { medicineName, genericName, shortDescription, medicineImage, medicineCategory, company, medicineMassUnit, perUnitPrice, discountPercentage } = medicine
    const {role} = useRole()
    return (
        <div>

            <div>
                <img className='w-full h-[300px] object-cover rounded-md' src={medicineImage} alt="" />
                <div className='space-y-3 my-4 text-md'>
                    <h1>Medicine Name: {medicineName}</h1>
                    <h1>Generic Name: {genericName}</h1>
                    <h1>Short Description: {shortDescription}</h1>
                    <h1>Medicine Category: {medicineCategory}</h1>
                    <h1>Medicine Company: {company}</h1>
                    <h1>Medicine MassUnit: {medicineMassUnit}</h1>
                    <h1>Discount Percentage: {discountPercentage} % </h1>
                    <div className='flex justify-between items-center'>
                        <h1>PerUnit Price: {perUnitPrice} $</h1>
                        <button disabled={role === "Admin" || role === "Seller"} onClick={cartMedicine} className='rounded-full bg-primary px-3 py-2 font-semibold text-black text-end flex items-center justify-center'>
                            Select <IoMdCart className='text-lg' />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MedicineDetailsCard;