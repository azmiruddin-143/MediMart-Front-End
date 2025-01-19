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
        <div className=" overflow-x-auto max-w-5xl mx-auto my-10 ">
            <div className='flex justify-between mb-8'>
                <h1>(All Category {category.length})</h1>
                <div>
                    <span
                        onClick={() => setIsEditModalOpen(true)}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-green-700 opacity-50 rounded-full'
                        ></span>
                        <span className='relative'>Add Category</span>
                    </span>
                    <AddCategoryModal
                        isOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        refetch={refetch}
                    />
                    {/* <button className='bg-slate-600 py-2 px-5 rounded-md text-white'>  Add category</button> */}
                </div>
            </div>
            <table className="table ">
                {
                    category.length > 0 &&
                    <thead>
                        <tr className='text-lg text-neutral'>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Modifide</th>
                            <th>Action</th>

                        </tr>
                    </thead>

                }

                {category.length === 0 &&
                    <div className="flex h-screen justify-center my-5">
                        <div>
                            <h1 className='text-4xl py-3 text-neutral'>No Data Found ?</h1>
                            <Link to={'/allfoods'} > <button className='py-2 my-3 px-6 bg-primary-content text-primary rounded-md'>Purchase Food</button> </Link>
                        </div>
                    </div>
                }




                {
                    category.map((category, index) =>
                        <ManageCategoryRow category={category} key={category?._id} refetch={refetch} index={index} ></ManageCategoryRow>
                    )
                }
            </table>
        </div>
    );
};

export default ManageCategory;