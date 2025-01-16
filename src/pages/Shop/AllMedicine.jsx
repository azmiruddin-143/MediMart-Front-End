import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AllMedicineRow from './AllMedicineRow';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
const AllMedicine = () => {
    const { data: medicine = [], isLoading, refetch } = useQuery({
        queryKey: ['medicine'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/medicine');
            return data;
        }
    });
    
    if (isLoading) return <LoadingSpinner />;
    
    return (
        <div className=" overflow-x-auto  xl:mx-28 2xl:mx-36 lg:mx-10 sm:mx-5 mx-2 my-10">
            <div className='flex justify-between mb-8'>
                <h1 className='text-xl' >( All Medicine <span className='text-primary' >{medicine.length}</span> )</h1>
                
            </div>
        <table className="table">
            {
                medicine.length > 0 &&
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
                    <AllMedicineRow medicine={medicine} key={medicine?._id} refetch ={refetch}  index={index} ></AllMedicineRow>
                )
            }
        </table>
    </div>
    );
};

export default AllMedicine;