import { useContext, useEffect, useState } from 'react';
import { FaMoneyBillWave, FaHourglassHalf, FaTruckLoading, FaCheckCircle, FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const SellerHomepage = () => {
    const { user } = useContext(AuthContext)
    const [statusCounts, setStatusCounts] = useState({ pending: 0, paid: 0 });
    const [priceCounts, setPriceCounts] = useState({ pending: 0, paid: 0 })
    const [totalOrder, setTotalOrder] = useState(0);
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        axiosSecure.get(`/payment/pending-paid/${user?.email}`)
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
        axiosSecure.get(`/payment/price-calclute/${user?.email}`)
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
        axiosSecure.get(`/order/total/${user?.email}`)
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
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-md">
                <div className="  gap-4">
                    <FaMoneyBillWave className='text-3xl text-center mx-auto' />
                    <div>
                        <p className="text-3xl font-bold text-center ">{priceCounts.paid}$</p>
                        <p className="text-lg">Total Revenue Paid</p>
                    </div>
                </div>
            </div>

            {/* Customers Card */}
            <div className="flex items-center justify-center px-2 py-4 bg-primary text-white rounded-lg shadow-md">
                <div className="">
                    <FaHourglassHalf className='text-3xl mx-auto text-center' />
                    <div  >
                        <p className="text-3xl font-bold text-center">{priceCounts.pending}$</p>
                        <p className="text-lg">Total Pending Amount</p>
                    </div>
                </div>
            </div>
            {/* Products Card */}
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-lg shadow-md">
                <div className="">
                    <FaTruckLoading className='text-3xl text-center mx-auto' />
                    <div>
                        <p className="text-3xl font-bold text-center">{statusCounts.pending}</p>
                        <p className="text-lg">Pending Orders</p>
                    </div>
                </div>
            </div>

            {/* Orders Card */}
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-md">
                <div className="">
                    <FaCheckCircle className='text-3xl text-center mx-auto' />
                    <div>
                        <p className="text-3xl font-bold text-center">{statusCounts.paid}</p>
                        <p className="text-lg">Completed Orders</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center p-6 bg-primary text-white rounded-lg shadow-md">
                <div className="">
                    <FaShoppingCart className='text-3xl mx-auto text-center' />
                    <div>
                        <p className="text-3xl font-bold text-center">{totalOrder}</p>
                        <p className="text-lg"> Total Orders </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerHomepage;