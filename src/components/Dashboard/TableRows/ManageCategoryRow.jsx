import React, { useState } from 'react';
import UpdateCategoryModal from '../../../Modal/UpdateCategoryModal';
import DeleteCategory from '../../../Modal/DeleteCategory';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

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

       const categoryDelete = () =>{
          axiosSecure.delete(`/category/${_id}`)
          .then(res =>{
            if (res.data.deletedCount > 0) {
                toast.success('Category deleted successfully!', {
                    duration: 3000, 
                });
            }
              refetch()
              setIsOpen(false)
          })
          .catch((error) =>{
            toast.error("Error!", (error.message), {
                duration: 3000,
            })
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
                                    categoryImage} />
                        </div>
                    </div>
                </th>

                <td className='text-neutral'>{categoryName}</td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <span
                        onClick={() => { setIsEditModalOpen(true) }}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                    >
                        <span aria-hidden='true' className='absolute inset-0 bg-green-200 opacity-50 rounded-full'>

                        </span>
                        <span className='relative'>Update</span>
                    </span>
                    <UpdateCategoryModal
                        isOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        category={category}
                        refetch={refetch}
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
                    <DeleteCategory isOpen={isOpen} categoryDelete ={categoryDelete} closeModal={closeModal} />
                </td>
            </tr>
        </tbody>
    );
};

export default ManageCategoryRow;