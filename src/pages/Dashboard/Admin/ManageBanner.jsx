
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import ManageBannerRow from '../../../components/Dashboard/TableRows/ManageBannerRow';
const ManageBanner = () => {
    const { data: advertisement = [], isLoading, refetch } = useQuery({
        queryKey: ['advertisement'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/advertisement');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    return (
        <div className=" overflow-x-auto max-w-5xl mx-auto my-10 ">
            <div className='flex justify-between mb-8'>
                <h1>(All Advertisement request {advertisement.length})</h1>

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
                        <ManageBannerRow advertisement={advertisement} key={advertisement?._id} refetch={refetch} index={index} ></ManageBannerRow>
                    )
                }
            </table>
        </div>
    );
};

export default ManageBanner;