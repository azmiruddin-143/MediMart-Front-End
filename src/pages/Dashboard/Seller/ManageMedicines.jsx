import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import ManageMedicineRow from '../../../components/Dashboard/TableRows/ManageMedicineRow';
import AddMedicineModal from '../../../Modal/AddMedicineModal';

const ManageMedicines = () => {
     const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const { data: medicine = [], isLoading, refetch } = useQuery({
        queryKey: ['medicine'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/medicine');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    return (
        <div className=" overflow-x-auto mx-auto my-10 ">
            <div className='flex justify-between mb-8'>
                <h1>(All Category {medicine.length})</h1>
                <div>
                    <span
                        onClick={() => setIsEditModalOpen(true)}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-green-700 opacity-50 rounded-full'
                        ></span>
                        <span className='relative'>Add Medicine</span>
                    </span>
                    <AddMedicineModal
                        isOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        refetch ={refetch}
                    />
                    {/* <button className='bg-slate-600 py-2 px-5 rounded-md text-white'>  Add category</button> */}
                </div>
            </div>
            <table className="table ">
                {
                    medicine.length > 0 &&
                    <thead>
                        <tr className='text-lg text-neutral'>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Modifide</th>
                            <th>Action</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Modifide</th>
                            <th>Action</th>
                            <th>Action</th>
                            <th>Action</th>
                            <th>Action</th>
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
                        <ManageMedicineRow medicine={medicine} key={medicine?._id} refetch={refetch} index={index} ></ManageMedicineRow>
                    )
                }
            </table>
        </div>
    );
};

export default ManageMedicines;