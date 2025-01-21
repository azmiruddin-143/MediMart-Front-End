import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AllMedicineRow from './AllMedicineRow';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { FaSearchengin } from 'react-icons/fa';
const AllMedicine = () => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')

    const { data: medicine = [], isLoading, refetch } = useQuery({
        queryKey: ['medicine', search, sort],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:5000/medicine?search=${search}&sort=${sort}`);
            return data;
        },
       
    });

      if(isLoading) return <LoadingSpinner></LoadingSpinner>
      const handleSearchChange = (e) => {
        setSearch(e.target.value); // Update state on text change
    };


    return (
        <div className=" overflow-x-auto  xl:mx-28 2xl:mx-36 lg:mx-10 sm:mx-5 mx-2 my-10">
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-xl' >( All Medicine <span className='text-primary' >{medicine.length}</span> )</h1>

                <div>
                    <select
                        className='border p-4 rounded-md'
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value=''>Sort By Price</option>
                        <option value='dsc'>Descending Price </option>
                        <option value='asc'>Ascending Price </option>
                    </select>
                </div>
                <div className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                    <input
                        className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                        type='text'
                        name='search'
                        placeholder='Seach foods'
                        onBlur={handleSearchChange}

                    />

                    <button
                   
                        className="px-1 md:px-4 py-3 text-sm text-neutral"
                         // Trigger search when button is clicked
                    >
                        <FaSearchengin size={25} />
                    </button>
                </div>
            </div>
            <table className="table border-collapse border border-gray-300">
                {
                    medicine.length > 0 &&
                    <thead>
                        <tr className='text-lg text-neutral'>
                            <th className=' border border-gray-300 px-4 py-2 cursor-pointer'>Image</th>
                            <th className=' border border-gray-300 px-4 py-2 cursor-pointer'>Name</th>
                            <th className=' border border-gray-300 px-4 py-2 cursor-pointer'>Generic</th>
                            <th className=' border border-gray-300 px-4 py-2 cursor-pointer'>Category</th>
                            <th className=' border border-gray-300 px-4 py-2 cursor-pointer'>Company</th>
                            <th className=' border border-gray-300 px-4 py-2 cursor-pointer'>Details</th>
                            <th className=' border border-gray-300 px-4 py-2 cursor-pointer'>Cart</th>

                        </tr>
                    </thead>

                }

                {medicine.length === 0 &&
                    <div className="flex h-screen justify-center my-5">
                        <div>
                            <h1 className='text-4xl py-3 text-neutral'>No Data Found ?</h1>
                            <Link to={'/allfoods'} > <button className='py-2 my-3 px-6 bg-primary-content text-primary rounded-md'>Purchase Food</button> </Link>
                        </div>
                    </div>
                }




                {
                    medicine.map((medicine, index) =>
                        <AllMedicineRow medicine={medicine} key={medicine?._id} refetch={refetch} index={index} ></AllMedicineRow>
                    )
                }
            </table>
        </div>
    );
};

export default AllMedicine;