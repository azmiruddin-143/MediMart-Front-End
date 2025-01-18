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
                <h1 className='text-xl' >( Category:  <span className='text-primary' >
                    {categoryName}</span> )</h1>
            </div>
            <table className="table">
                {
                    CategoryMedicine.length > 0 &&
                    <thead>
                        <tr className='text-lg  text-neutral'>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Generic</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Details</th>
                            <th className='text-end'>Cart</th>


                        </tr>
                    </thead>

                }

                {CategoryMedicine.length === 0 &&
                    <div className="flex h-screen justify-center my-5">
                        <div>
                            <h1 className='text-4xl py-3 text-neutral'>No Data Found ?</h1>
                            <Link to={'/allfoods'} > <button className='py-2 my-3 px-6 bg-primary-content text-primary rounded-md'>Purchase Food</button> </Link>
                        </div>
                    </div>
                }




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