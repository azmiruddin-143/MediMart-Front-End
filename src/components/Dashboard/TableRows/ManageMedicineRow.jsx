import React, { useState } from 'react';
import UpdateCategoryModal from '../../../Modal/UpdateCategoryModal';
import DeleteCategory from '../../../Modal/DeleteCategory';
import axios from 'axios';
import MedicineupdateModal from '../../../Modal/MedicineUpdateModal';
import DeleteMedicine from '../../../Modal/DeleteMedicine';

const ManageMedicineRow = ({ medicine, index, refetch }) => {
    const { medicineName,discountPercentage,perUnitPrice,medicineMassUnit,company,medicineImage,medicineCategory, genericName,shortDescription, _id } = medicine
    let [isOpen, setIsOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    function openModal() {
        setIsOpen(true)
      }
      function closeModal() {
        setIsOpen(false)
      }

       const madicineyDelete = () =>{
          axios.delete(`http://localhost:5000/medicine/${_id}`)
          .then(res =>{
              console.log(res.data);
              refetch()
              setIsOpen(false)
          })
          .catch((error) =>{
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
                {/* {/* <td className='text-neutral'>{company}</td> */}
                {/* <td className='text-neutral'>{medicineMassUnit}</td>
                <td className='text-neutral'>{perUnitPrice}</td>
                <td className='text-neutral'>{discountPercentage}</td> */}
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
                        medicine ={medicine}
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
                    <DeleteMedicine isOpen={isOpen} madicineyDelete ={madicineyDelete}  closeModal={closeModal} />
                </td>
            </tr>
        </tbody>
    );
};

export default ManageMedicineRow;