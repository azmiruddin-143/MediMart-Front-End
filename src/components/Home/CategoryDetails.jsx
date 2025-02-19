import React from 'react';
import LoadingSpinner from '../Shared/LoadingSpinner';
import useCategory from '../../hooks/useCategory';
import CategoryDetailsRow from '../Dashboard/TableRows/CategoryDetailsRow';
import { FaSearchengin } from 'react-icons/fa';
import NoResultFound from '../Shared/NoResultFound';
import { Helmet } from 'react-helmet-async';


const CategoryDetails = () => {
    const [categoryName, isLoading, refetch, CategoryMedicine, setSearch, setSort, sort] = useCategory();
    if (isLoading) return <LoadingSpinner />;

    const handleSearchChange = (e) => {
        setSearch(e.target.value);

    };

    return (
        <div className=" overflow-x-auto h-screen  xl:mx-28 2xl:mx-36 lg:mx-10 sm:mx-5 mx-2 my-10">
            <Helmet>
                <title>MediMart | Category </title>
            </Helmet>
            <div className='sm:flex space-y-5 sm:space-y-0 items-center justify-between mb-8'>
                <h1 className='text-xl' >( Category:  <span className='text-primary font-bold' >
                    {categoryName}</span> )</h1>

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
                    // onChange={handleSearchChange}
                    />
                    <button className="px-1 md:px-4 py-3 text-sm text-neutral">
                        <FaSearchengin size={25} />
                    </button>
                </div>
            </div>

         

            <div className="mx-2 sm:mx-0 sm:grid-cols-2 gap-y-20 gap-8 my-16 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1">
                {CategoryMedicine.map((medicine, index) => (
                    <CategoryDetailsRow medicine={medicine} key={medicine?._id} refetch={refetch} index={index} ></CategoryDetailsRow>
                ))}
            </div>

            {/* ... */}

            {
                CategoryMedicine.length === 0 &&
                <NoResultFound></NoResultFound>
            }
        </div>
    );
};

export default CategoryDetails;