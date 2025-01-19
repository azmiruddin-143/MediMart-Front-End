import React, { useEffect, useState } from 'react';
import { FaWallet, FaUsers, FaBox, FaTruck } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const AdminHomePage = () => {
    const [statusCounts, setStatusCounts] = useState({ pending: 0, paid: 0 });
    const [priceCounts, setPriceCounts] = useState({ pending: 0, paid: 0 })
    const [totalOrder, setTotalOrder] = useState(0);
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/payment/pending-paid')
            .then(res => {
                console.log(res.data); 
                setStatusCounts({
                    pending: res.data.pendingCount,
                    paid: res.data.paidCount
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [])

    useEffect(() => {
        axiosSecure.get('/payment/price-calclute')
            .then(res => {
                setPriceCounts({
                    pending: res.data.pendingPrice,
                    paid: res.data.paidPrice
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [])



useEffect(() => {
  axiosSecure.get('/order/total')
    .then(res => {
        setTotalOrder(res.data.totalOrder);
    })
    .catch(err => {
      console.error("Error fetching total payments:", err.message);
    });
}, []);
  


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
            {/* Revenue Card */}
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg shadow-md">
                <div className="text-center">
                    <FaWallet className="text-4xl mb-2 mx-auto" />
                    <p className="text-3xl font-bold">{priceCounts.paid}</p>
                    <p className="text-lg">Price Paid</p>
                </div>
            </div>

            {/* Customers Card */}
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg shadow-md">
                <div className="text-center">
                    <FaUsers className="text-4xl mb-2 mx-auto" />
                    <p className="text-3xl font-bold">{priceCounts.pending}</p>
                    <p className="text-lg">Price Pending</p>
                </div>
            </div>

            {/* Products Card */}
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-lg shadow-md">
                <div className="text-center">
                    <FaBox className="text-4xl mb-2 mx-auto" />
                    <p className="text-3xl font-bold">{statusCounts.pending || 'loading'}</p>
                    <p className="text-lg">Total Pending</p>
                </div>
            </div>

            {/* Orders Card */}
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-md">
                <div className="text-center">
                    <FaTruck className="text-4xl mb-2 mx-auto" />
                    <p className="text-3xl font-bold">{statusCounts.paid}</p>
                    <p className="text-lg">Total Paid</p>
                </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-primary text-white rounded-lg shadow-md">
                <div className="text-center">
                    <FaTruck className="text-4xl mb-2 mx-auto" />
                    <p className="text-3xl font-bold">{totalOrder}</p>
                    <p className="text-lg">Orders</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;