import React, { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import PaymentManagementRow from '../../../components/Dashboard/TableRows/PaymentManagementRow';
import { AuthContext } from '../../../providers/AuthProvider';
import PaymentHistoryRow from '../../../components/Dashboard/TableRows/PaymentHistoryRow';
import NoResultFound from '../../../components/Shared/NoResultFound';
import { Helmet } from 'react-helmet-async';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: payment = [], isLoading, refetch } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-payments/${user?.email}`);
            return data;
        }
    });
    // console.log(payment);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className=" overflow-x-auto container mx-auto my-10 ">
            <Helmet>
                <title>MediMart | PaymentHistory </title>
            </Helmet>
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
                        <th className='text-end border border-gray-300 px-4 py-2 text-black'>Action</th>
                    </tr>
                </thead>


                {
                    payment.map((payment, index) =>
                        <PaymentHistoryRow payment={payment} key={payment?._id} refetch={refetch} >  </PaymentHistoryRow>
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

export default PaymentHistory;

