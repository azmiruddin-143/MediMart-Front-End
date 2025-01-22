import React, { useState } from 'react';
import UpdateCategoryModal from '../../../Modal/UpdateCategoryModal';
import DeleteCategory from '../../../Modal/DeleteCategory';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { GiClick } from 'react-icons/gi';

const ManageCategoryRow = ({ category, index, refetch }) => {
    const { categoryImage, categoryName, _id } = category
    const axiosSecure = useAxiosSecure()
    let [isOpen, setIsOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }

    const categoryDelete = () => {
        axiosSecure.delete(`/category/${_id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success('Category deleted successfully!', {
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
                <td className=' border border-gray-300 px-4 py-2  text-neutral '>
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={
                                    categoryImage} />
                        </div>
                    </div>
                </td>

                <td className='text-neutral border border-gray-300 px-4 py-2'>{categoryName}</td>
                <td className='border border-gray-300 px-4 py-2 text-sm'>
                    <span
                        onClick={() => { setIsEditModalOpen(true) }}
                        className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-black leading-tight'
                    >
                        <span aria-hidden='true' className='absolute inset-0 bg-primary  rounded-full'>

                        </span>

                        <div className='flex items-center gap-0'>
                            <span className='relative'>Update</span>
                            <GiClick className=' relative text-lg' />
                        </div>
                    </span>
                    <UpdateCategoryModal
                        isOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        category={category}
                        refetch={refetch}
                    />
                </td>
                <td className='border  border-gray-300 px-4 py-2 text-sm'>
                    <div className='flex justify-end' >
                        <span
                            onClick={openModal}
                            className='relative cursor-pointer  inline-block px-3 py-2 font-semibold text-white leading-tight'
                        >
                            <span
                                aria-hidden='true'
                                className='absolute inset-0 bg-black  rounded-full'
                            ></span>

                            <div className='flex items-center gap-0'>
                                <span className='relative'>Delete</span>
                                <GiClick className=' relative text-lg' />
                            </div>
                        </span>
                    </div>
                    <DeleteCategory isOpen={isOpen} categoryDelete={categoryDelete} closeModal={closeModal} />
                </td>
            </tr>
        </tbody>
    );
};

export default ManageCategoryRow;