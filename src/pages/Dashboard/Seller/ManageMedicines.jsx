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
        <div className=" overflow-x-auto max-w-7xl mx-auto my-10 ">
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
                        refetch={refetch}
                    />

                </div>
            </div>
            <table className="table ">
                
                    <thead className='bg-primary'>
                        <tr className='text-lg text-neutral'>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Generic</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Details</th>
                            <th>Update</th>
                            <th>Action</th>

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