
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import ManageBannerRow from '../../../components/Dashboard/TableRows/ManageBannerRow';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import NoResultFound from '../../../components/Shared/NoResultFound';
import { Helmet } from 'react-helmet-async';
const ManageBanner = () => {
    const axiosSecure = useAxiosSecure()
    const { data: advertisement = [], isLoading, refetch } = useQuery({
        queryKey: ['advertisement'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/advertisement');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    return (
        <div className=" overflow-x-auto container mx-auto my-10 ">
            <Helmet>
                <title>MediMart | Manage Banner </title>
            </Helmet>
            <div className='flex justify-between mb-8'>
                <h1 className='text-xl'>(All Advertisement request <span className='text-primary font-bold'>{advertisement.length}</span>)</h1>

            </div>
            <table className="table ">

                <thead className='bg-primary'>
                    <tr className='text-lg text-neutral'>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Banner Image</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Short Descrption</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Status</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Action</th>

                    </tr>
                </thead>



                {
                    advertisement.map((advertisement, index) =>
                        <ManageBannerRow advertisement={advertisement} key={advertisement?._id} refetch={refetch} index={index} ></ManageBannerRow>
                    )
                }
            </table>

            {
                advertisement.length === 0 &&
                <NoResultFound></NoResultFound>
            }
        </div>
    );
};

export default ManageBanner;