import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import ManageMedicineRow from '../../../components/Dashboard/TableRows/ManageMedicineRow';
import AddMedicineModal from '../../../Modal/AddMedicineModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import NoResultFound from '../../../components/Shared/NoResultFound';

const ManageMedicines = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const { data: medicine = [], isLoading, refetch } = useQuery({
        queryKey: ['medicine'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/medicine/manage/${user?.email}`);
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    return (
        <div className=" overflow-x-auto container mx-auto my-10 ">
            <div className='flex justify-between mb-8'>
                <h1 className='text-xl'>(All Medicine <span className='text-primary font-bold'>{medicine.length}</span>)</h1>
                <div>
                    <span
                        onClick={() => setIsEditModalOpen(true)}
                        className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-black leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-primary  rounded-full'
                        ></span>
                        <span className='relative'>Add Medicine</span>
                    </span>
                    <AddMedicineModal
                        isOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        refetch={refetch}
                    />

                </div>
            </div>
            <table className="table ">
                
                    <thead className='bg-primary'>
                        <tr className='text-lg text-neutral'>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Image</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Name</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Generic</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Description</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Category</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Details</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>Modified</th>
                            <th className='border border-gray-300 px-4 py-2 text-black text-end'>Action</th>

                        </tr>
                    </thead>

           

                {
                    medicine.map((medicine, index) =>
                        <ManageMedicineRow medicine={medicine} key={medicine?._id} refetch={refetch}  ></ManageMedicineRow>
                    )
                }
            </table>
            {medicine.length === 0 &&
                <NoResultFound></NoResultFound>
            }

        </div>
    );
};

export default ManageMedicines;