import React, { useState } from 'react';
import MedicineupdateModal from '../../../Modal/MedicineUpdateModal';
import DeleteMedicine from '../../../Modal/DeleteMedicine';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye } from 'react-icons/fa';
import ManageMedicineDetailsModal from '../../../Modal/ManageMedicineDetailsModal';
import toast from 'react-hot-toast';
import { GiClick } from 'react-icons/gi';

const ManageMedicineRow = ({ medicine, refetch }) => {
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
                if (res.data.deletedCount > 0) {
                    toast.success('Medicine deleted successfully!', {
                        duration: 3000,
                    });
                }
                refetch()
                setIsOpen(false)
            })
            .catch((error) => {
                toast.error("Error!", (error.message), {
                    duration: 3000,
                })
            })
    }


    return (
        <tbody>
            <tr className='text-neutral'>
                <th className='border border-gray-300 px-4 py-2'>
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={
                                    medicineImage} />
                        </div>
                    </div>
                </th>

                <td className='text-neutral border border-gray-300 px-4 py-2'>{medicineName}</td>
                <td className='text-neutral border border-gray-300 px-4 py-2'>{genericName}</td>
                <td className='text-neutral border border-gray-300 px-4 py-2'>{shortDescription}</td>
                <td className='text-neutral border border-gray-300 px-4 py-2'>{medicineCategory}</td>

                <td className='border border-gray-300 px-4 py-2'>
                    <span
                        onClick={() => { setIsDetailsModalOpen(true) }}
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
                    <ManageMedicineDetailsModal
                        isOpen={isDetailsModalOpen}
                        setIsDetailsModalOpen={setIsDetailsModalOpen}
                        medicine={medicine}
                        refetch={refetch}

                    />
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                    <span
                        onClick={() => { setIsEditModalOpen(true) }}
                        className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-black leading-tight'
                    >
                        <span aria-hidden='true' className='absolute inset-0 bg-primary  rounded-full'>

                        </span>
                        <div className='flex'>
                            <span className='relative'>Update</span>
                            <GiClick className=' relative text-lg' />
                        </div>
                    </span>
                    <MedicineupdateModal
                        isOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        refetch={refetch}
                        medicine={medicine}
                    />
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                    <div className='flex justify-end'>
                        <span
                            onClick={openModal}
                            className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-white leading-tight'
                        >
                            <span
                                aria-hidden='true'
                                className='absolute inset-0 bg-black  rounded-full'
                            ></span>
                            <div className='flex'>
                                <span className='relative'>Delete</span>
                                <GiClick className=' relative text-lg' />
                            </div>

                        </span>
                    </div>
                    <DeleteMedicine isOpen={isOpen} madicineyDelete={madicineyDelete} closeModal={closeModal} />
                </td>
            </tr>
        </tbody>
    );
};

export default ManageMedicineRow;