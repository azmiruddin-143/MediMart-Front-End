import React, { useState } from 'react';
import MedicineupdateModal from '../../../Modal/MedicineUpdateModal';
import DeleteMedicine from '../../../Modal/DeleteMedicine';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye } from 'react-icons/fa';
import ManageMedicineDetailsModal from '../../../Modal/ManageMedicineDetailsModal';

const ManageMedicineRow = ({ medicine,  refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { medicineName, discountPercentage, perUnitPrice, medicineMassUnit, company, medicineImage, medicineCategory, genericName, shortDescription, _id } = medicine
    let [isOpen, setIsOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }

    const madicineyDelete = () => {
        axiosSecure.delete(`/medicine/${_id}`)
            .then(res => {
                console.log(res.data);
                refetch()
                setIsOpen(false)
            })
            .catch((error) => {
                console.log(error.message);
            })
    }


    return (
        <tbody>
            <tr className='text-neutral'>
                <th className='flex  text-neutral items-center gap-5'>
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={
                                    medicineImage} />
                        </div>
                    </div>
                </th>

                <td className='text-neutral'>{medicineName}</td>
                <td className='text-neutral'>{genericName}</td>
                <td className='text-neutral'>{shortDescription}</td>
                <td className='text-neutral'>{medicineCategory}</td>

                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <span
                        onClick={() => { setIsDetailsModalOpen(true) }}
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
                    <ManageMedicineDetailsModal
                        isOpen={isDetailsModalOpen}
                        setIsDetailsModalOpen={setIsDetailsModalOpen}
                        medicine={medicine}
                        refetch={refetch}
                    
                    />
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <span
                        onClick={() => { setIsEditModalOpen(true) }}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                    >
                        <span aria-hidden='true' className='absolute inset-0 bg-green-200 opacity-50 rounded-full'>

                        </span>
                        <span className='relative'>Update</span>
                    </span>
                    <MedicineupdateModal
                        isOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        refetch={refetch}
                        medicine={medicine}
                    />
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <span
                        onClick={openModal}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative'>Delete</span>
                    </span>
                    <DeleteMedicine isOpen={isOpen} madicineyDelete={madicineyDelete} closeModal={closeModal} />
                </td>
            </tr>
        </tbody>
    );
};

export default ManageMedicineRow;