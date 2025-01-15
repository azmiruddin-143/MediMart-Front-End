import React from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow';
const ManageUsers = () => {
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/users');
            return data;
        }
    });
    
    if (isLoading) return <LoadingSpinner />;
    
    return (
        <div className=" overflow-x-auto max-w-7xl mx-auto my-10">
        <table className="table">
            {
                users.length > 0 &&
                <thead>
                    <tr className='text-lg text-center text-neutral'>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>

                    </tr>
                </thead>

            }

            {users.length === 0 &&
                <div className="flex h-screen justify-center my-5">
                    <div>
                        <h1 className='text-4xl py-3 text-neutral'>No Data Found ?</h1>
                        <Link to={'/allfoods'} > <button className='py-2 my-3 px-6 bg-primary-content text-primary rounded-md'>Purchase Food</button> </Link>
                    </div>
                </div>
            }




            {
                users.map((user, index) =>
                    <UserDataRow user={user} key={user?._id} refetch ={refetch}  index={index} ></UserDataRow>
                )
            }
        </table>
    </div>
    );
};

export default ManageUsers;