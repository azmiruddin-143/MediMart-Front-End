import React, { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import UserPaymentHistoryRow from '../../../components/Dashboard/TableRows/UserPaymentHistoryRow';
import NoResultFound from '../../../components/Shared/NoResultFound';

const UserPaymentHistory = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: payment = [], isLoading, refetch } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/all-payments/${user?.email}`);
            return data;
        }
    });
    console.log(payment);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className=" overflow-x-auto container mx-auto my-10 ">
            <div className='flex justify-between mb-8'>
                <h1 className='text-xl'>( All Order <span className='text-primary font-bold'>{payment.length}</span> )</h1>

            </div>
            <table className="table ">

                <thead className='bg-primary'>
                    <tr className='text-lg text-neutral'>
                        {/* <th>Image</th> */}
                        <th className='border border-gray-300 px-4 py-2 text-black' >Medicine Name</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Buyer Email</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Total Price</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Total Item</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Transaction</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Date</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Status</th>
                    </tr>
                </thead>


                {
                    payment.map((payment) =>
                        <UserPaymentHistoryRow payment={payment} key={payment?._id}  >  </UserPaymentHistoryRow>
                    )
                }
            </table>
            {
                payment.length === 0 &&
                <NoResultFound></NoResultFound>
            }
        </div>
    );
};

export default UserPaymentHistory;

