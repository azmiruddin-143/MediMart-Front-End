import React from 'react';
import LoadingSpinner from '../Shared/LoadingSpinner';
import useCategory from '../../hooks/useCategory';
import { Link } from 'react-router-dom';
import CategoryDetailsRow from '../Dashboard/TableRows/CategoryDetailsRow';


const CategoryDetails = () => {
    const [categoryName, isLoading, refetch, CategoryMedicine] = useCategory();
    if (isLoading) return <LoadingSpinner />;

    return (
        <div className=" overflow-x-auto  xl:mx-28 2xl:mx-36 lg:mx-10 sm:mx-5 mx-2 my-10">
            <div className='flex justify-between mb-8'>
                <h1 className='text-xl' >( Category:  <span className='text-primary font-bold' >
                    {categoryName}</span> )</h1>
            </div>
            <table className="table">
               
                    <thead>
                        <tr className='text-lg  text-neutral'>
                            <th className='border border-gray-300 px-4 py-2 text-black' >Image</th>
                            <th className='border border-gray-300 px-4 py-2 text-black' >Name</th>
                            <th className='border border-gray-300 px-4 py-2 text-black' >Generic</th>
                            <th className='border border-gray-300 px-4 py-2 text-black' >Category</th>
                            <th className='border border-gray-300 px-4 py-2 text-black' >Company</th>
                            <th className='border border-gray-300 px-4 py-2 text-black' >Details</th>
                            <th className='text-end border border-gray-300 px-4 py-2 text-black'>Cart</th>


                        </tr>
                    </thead>


                {
                    CategoryMedicine.map((medicine, index) =>
                        <CategoryDetailsRow medicine={medicine} key={medicine?._id} refetch={refetch} index={index} ></CategoryDetailsRow>
                    )
                }
            </table>
        </div>
    );
};

export default CategoryDetails;