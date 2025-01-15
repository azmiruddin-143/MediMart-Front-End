import React, { useState } from 'react';
import UpdateCategoryModal from '../../../Modal/UpdateCategoryModal';

const ManageCategoryRow = ({ category, index, refetch }) => {
    const { categoryImage, categoryName,_id } = category
    // let [isOpen, setIsOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    //    const updateId = (id) =>{
    //       console.log(id);
    //    }


    return (
        <tbody>
            <tr className='text-center text-neutral'>
                <th className='flex justify-center text-neutral items-center gap-5'>{index + 1}
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={
                                    categoryImage} />
                        </div>
                    </div>
                </th>

                <td className='text-neutral'>{categoryName}</td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <span
                        onClick={() => {setIsEditModalOpen(true)}}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                    >
                        <span aria-hidden='true' className='absolute inset-0 bg-green-200 opacity-50 rounded-full'>

                        </span>
                        <span className='relative'>Update</span>
                    </span>
                    <UpdateCategoryModal
                        isOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        category ={category}
                        refetch={refetch}
                    />
                </td>
                <td className='text-neutral'>Delete</td>
            </tr>
        </tbody>
    );
};

export default ManageCategoryRow;