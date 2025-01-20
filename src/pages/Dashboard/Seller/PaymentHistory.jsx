import React, { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import PaymentManagementRow from '../../../components/Dashboard/TableRows/PaymentManagementRow';
import { AuthContext } from '../../../providers/AuthProvider';
import PaymentHistoryRow from '../../../components/Dashboard/TableRows/PaymentHistoryRow';

const PaymentHistory = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: payment = [], isLoading, refetch } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-payments/${user?.email}`);
            return data;
        }
    });
    console.log(payment);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className=" overflow-x-auto max-w-7xl mx-auto my-10 ">
            <div className='flex justify-between mb-8'>
                <h1>( All Order {payment.length} )</h1>
               
            </div>
            <table className="table ">
                {
                    payment.length > 0 &&
                    <thead>
                        <tr className='text-lg text-neutral'>
                            {/* <th>Image</th> */}
                            <th className='text-start' >Name</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Item</th>
                            <th>Transaction</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th className='text-end'>Action</th>
                        </tr>
                    </thead>

                }

                {payment.length === 0 &&
                    <div className="flex h-screen justify-center my-5">
                        <div>
                            <h1 className='text-4xl py-3 text-neutral'>No Data Found ?</h1>
                            <Link to={'/allfoods'} > <button className='py-2 my-3 px-6 bg-primary-content text-primary rounded-md'>Purchase Food</button> </Link>
                        </div>
                    </div>
                }

                {
                    payment.map((payment, index) =>
                        <PaymentHistoryRow payment={payment}  key={payment?._id} refetch={refetch} >  </PaymentHistoryRow>
                    )
                }
            </table>
        </div>
    );
};

export default PaymentHistory;

