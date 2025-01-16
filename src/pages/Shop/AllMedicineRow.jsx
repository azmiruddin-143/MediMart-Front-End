
// import axios from 'axios';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MedicineDetailsModal from '../../Modal/MedicineDetailsModal';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoMdCart } from "react-icons/io";
const AllMedicineRow = ({ medicine, index, refetch }) => {
    const { medicineName, genericName, shortDescription, medicineImage, medicineCategory, company, medicineMassUnit, perUnitPrice, discountPercentage } = medicine
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

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
                    />
                </td>
                <td className='rounded-full bg-primary px-3 py-2 text-white text-end flex items-center justify-center'>Selected <IoMdCart className='text-lg' /></td>


            </tr>
        </tbody>
    );
};

export default AllMedicineRow;