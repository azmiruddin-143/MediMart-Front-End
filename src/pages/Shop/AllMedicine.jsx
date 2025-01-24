import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AllMedicineRow from './AllMedicineRow';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { FaSearchengin } from 'react-icons/fa';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import NoResultFound from '../../components/Shared/NoResultFound';
const AllMedicine = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Number of items per page

    const { data: medicine = [], isLoading, refetch } = useQuery({
        queryKey: ['medicine', search, sort, currentPage],
        queryFn: async () => {
            const { data } = await axios.get(`https://medi-mart-server-opal.vercel.app/medicine?search=${search}&sort=${sort}`);
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    // Calculate pagination
    const totalPages = Math.ceil(medicine.length / itemsPerPage);
    const paginatedData = medicine.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSearchChange = (e) => {
        setSearch(e.target.value); // Update state on text change
        setCurrentPage(1); // Reset to first page on search
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="overflow-x-auto xl:mx-28 2xl:mx-36 lg:mx-10 sm:mx-5 mx-2 my-10">
            <div className='sm:flex space-y-5 sm:space-y-0 items-center justify-between mb-8'>
                <h1 className='text-xl'>( All Medicine <span className='text-primary font-bold'>{medicine.length}</span> )</h1>

                <div>
                    <select
                        className='border p-4 rounded-md w-full'
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value=''>Sort By Price</option>
                        <option value='dsc'>Descending Price</option>
                        <option value='asc'>Ascending Price</option>
                    </select>
                </div>
                <div className='flex justify-between p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-b-primary focus-within:ring-primary'>
                    <input
                        className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                        type='text'
                        name='search'
                        placeholder='Search Medicine'
                        onBlur={handleSearchChange}
                    />
                    <button className="px-1 md:px-4 py-3 text-sm text-neutral">
                        <FaSearchengin size={25} />
                    </button>
                </div>
            </div>

            <table className="table border-collapse border border-gray-300">
                
                    <thead className='bg-primary'>
                        <tr className='text-lg text-neutral'>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Image</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Name</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Generic</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Category</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Company</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Price</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Details</th>
                            <th className='border border-gray-300 px-4 py-2 text-black text-end'>Cart</th>
                        </tr>
                    </thead>
             

              

                {paginatedData.map((medicine, index) => (
                    <AllMedicineRow medicine={medicine} key={medicine?._id} refetch={refetch} index={index} />
                ))}
            </table>

            {
                paginatedData.length === 0 &&
                <NoResultFound></NoResultFound>
            }

            {/* Pagination */}
            <div className='sm:flex justify-center items-center mt-8'>
                <button
                    className={`px-2 py-3 mx-1 rounded-md ${currentPage === 1 ? 'bg-gray-200' : 'bg-primary'}`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <SlArrowLeft />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`px-4 py-2 mx-1 rounded-md ${currentPage === i + 1 ? 'bg-primary text-black' : 'bg-gray-200'}`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className={`px-2 py-3 mx-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-primary'}`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <SlArrowRight />
                </button>
            </div>
        </div>
    );
};

export default AllMedicine;
