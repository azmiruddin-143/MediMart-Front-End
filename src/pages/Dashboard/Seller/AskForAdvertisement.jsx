
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import Advertisementrow from '../../../components/Dashboard/TableRows/advertisementrow';
import AdvertisementModal from '../../../Modal/AdvertisementModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import NoResultFound from '../../../components/Shared/NoResultFound';
import { AuthContext } from '../../../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
const AskForAdvertisement = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const { data: advertisement = [], isLoading, refetch } = useQuery({
        queryKey: ['advertisement', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/seller-advertisement/${user?.email}`);
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    return (
        <div className=" overflow-x-auto container mx-auto my-5 ">
            <Helmet>
                <title>MediMart | Advertisement </title>
            </Helmet>
            <div className='sm:flex  justify-between mb-8'>
                <h1 className='text-xl mb-4 sm:mb-0'>(All Advertisement <span className='text-primary font-bold'>{advertisement.length}</span>)</h1>
                <div>
                    <span
                        onClick={() => setIsEditModalOpen(true)}
                        className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-black leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-primary  rounded-full'
                        ></span>
                        <span className='relative'>Add Advertisement</span>
                    </span>
                    <AdvertisementModal
                        isOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        refetch={refetch}
                    />
                    {/* <button className='bg-slate-600 py-2 px-5 rounded-md text-white'>  Add category</button> */}
                </div>
            </div>
            <table className="table ">

                <thead className='bg-primary'>
                    <tr className='text-lg text-neutral'>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Image</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Descrption</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Status</th>
                        <th className='border border-gray-300 px-4 py-2 text-black text-end'>Action</th>
                    </tr>
                </thead>







                {
                    advertisement.map((advertisement, index) =>
                        <Advertisementrow advertisement={advertisement} key={advertisement?._id} refetch={refetch} index={index} ></Advertisementrow>
                    )
                }
            </table>

            {advertisement.length === 0 &&
                <NoResultFound></NoResultFound>
            }
        </div>
    );
};

export default AskForAdvertisement;