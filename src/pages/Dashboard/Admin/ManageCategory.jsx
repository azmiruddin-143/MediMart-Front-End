import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import ManageCategoryRow from '../../../components/Dashboard/TableRows/ManageCategoryRow';
import AddCategoryModal from '../../../Modal/AddCategoryModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageCategory = () => {
    const axiosSecure = useAxiosSecure()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const { data: category = [], isLoading, refetch } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/category');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    return (
        <div className=" overflow-x-auto container mx-auto my-5 ">
            <div className='flex justify-between items-center  mb-8'>
                <h1 className='text-xl'>(All Category <span className='text-primary font-bold' >{category.length}</span> )</h1>
                <div>
                    <span
                        onClick={() => setIsEditModalOpen(true)}
                        className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-black leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-primary  rounded-full'
                        ></span>
                        <span className='relative'>Add Category</span>
                    </span>
                    <AddCategoryModal
                        isOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        refetch={refetch}
                    />

                </div>
            </div>
            <table className="table border-collapse border border-gray-300">
                {
                    category.length > 0 &&
                    <thead className='bg-primary'>
                        <tr className='text-lg text-neutral'>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Category Image</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Category Name</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Category Modified</th>
                            <th className='border border-gray-300 px-4 py-2 text-black text-end'>Category Action</th>

                        </tr>
                    </thead>

                }



                {
                    category.map((category, index) =>
                        <ManageCategoryRow category={category} key={category?._id} refetch={refetch} index={index} ></ManageCategoryRow>
                    )
                }
            </table>

            {category.length === 0 &&
                <NoResultFound></NoResultFound>
            }
        </div>
    );
};

export default ManageCategory;