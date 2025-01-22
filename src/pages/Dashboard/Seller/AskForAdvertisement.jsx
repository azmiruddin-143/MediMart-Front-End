
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import Advertisementrow from '../../../components/Dashboard/TableRows/advertisementrow';
import AdvertisementModal from '../../../Modal/AdvertisementModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const AskForAdvertisement = () => {
    const axiosSecure = useAxiosSecure()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const { data: advertisement = [], isLoading, refetch } = useQuery({
        queryKey: ['advertisement'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/advertisement');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    return (
        <div className=" overflow-x-auto max-w-5xl mx-auto my-10 ">
        <div className='flex justify-between mb-8'>
            <h1>(All Advertisement {advertisement.length})</h1>
            <div>
                <span
                    onClick={() => setIsEditModalOpen(true)}
                    className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                >
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-green-700 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Add Advertisement</span>
                </span>
                <AdvertisementModal
                    isOpen={isEditModalOpen}
                    setIsEditModalOpen={setIsEditModalOpen}
                    refetch ={refetch}
                />
                {/* <button className='bg-slate-600 py-2 px-5 rounded-md text-white'>  Add category</button> */}
            </div>
        </div>
        <table className="table ">
            {
                advertisement.length > 0 &&
                <thead>
                    <tr className='text-lg text-neutral'>
                        <th>Image</th>
                        <th>Descrption</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

            }

            {advertisement.length === 0 &&
                <div className="flex h-screen justify-center my-5">
                    <div>
                        <h1 className='text-4xl py-3 text-neutral'>No Data Found ?</h1>
                        <Link to={'/allfoods'} > <button className='py-2 my-3 px-6 bg-primary-content text-primary rounded-md'>Purchase Food</button> </Link>
                    </div>
                </div>
            }




            {
                advertisement.map((advertisement, index) =>
                    <Advertisementrow advertisement={advertisement} key={advertisement?._id} refetch={refetch} index={index} ></Advertisementrow>
                )
            }
        </table>
    </div>
    );
};

export default AskForAdvertisement;