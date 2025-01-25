import React from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import NoResultFound from '../../../components/Shared/NoResultFound';
const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        }
    });
    console.log(users);
    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="overflow-x-auto container mx-auto my-5">
            <div className='flex justify-between mb-8 items-center'>
                <h1 className='text-xl' >( All Users <span className='text-primary font-bold' >{users.length}</span> )</h1>

            </div>
            <table className="table border-collapse border border-gray-300">
             
                    <thead className='bg-primary '>
                        <tr className='text-lg text-neutral'>
                            <th className='border border-gray-300 px-4 py-2 text-black'>User Image</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>User Name</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>User Email</th>
                            <th className='border border-gray-300 px-4 py-2 text-black'>User Role</th>
                            <th className=' text-end border-gray-300 px-4 py-2 text-black'>User Status</th>
                            <th className='text-end border border-gray-300 px-4 py-2 text-black'>User Action</th>

                        </tr>
                    </thead>

             


                {
                    users.map((user, index) =>
                        <UserDataRow user={user} key={user?._id} refetch={refetch} index={index} ></UserDataRow>
                    )
                }

            </table>
            {users.length === 0 &&
                <NoResultFound></NoResultFound>
            }
        </div>
    );
};

export default ManageUsers;