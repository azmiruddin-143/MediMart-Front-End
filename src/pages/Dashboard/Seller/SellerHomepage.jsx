import { useContext, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend, ResponsiveContainer } from 'recharts';
import { FaMoneyBillWave, FaHourglassHalf, FaTruckLoading, FaCheckCircle, FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
const SellerHomepage = () => {
    const { user } = useContext(AuthContext)
    const [statusCounts, setStatusCounts] = useState({ pending: 0, paid: 0 });
    const [priceCounts, setPriceCounts] = useState({ pending: 0, paid: 0 })
    const [totalOrder, setTotalOrder] = useState(0);
    const [monthlyOrders, setMonthlyOrders] = useState([]);
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        axiosSecure.get(`/payment/pending-paid/${user?.email}`)
            .then(res => {
                setStatusCounts({
                    pending: res.data.pendingCount,
                    paid: res.data.paidCount
                });
            })
            .catch((error) => {

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
                toast.error(`error ${error.message}`, {
                    autoClose: 3000,
                });
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

    useEffect(() => {
        axiosSecure.get('/order/monthly')
            .then(res => {
                setMonthlyOrders(res.data.monthlyOrders);
            })
            .catch(error => {
                // toast.error("Error!", (error.message), {
                //     duration: 3000,
                // });
            });
    }, []);


    // Pie Chart Data
    const pieData = [
        {
            name: 'Paid',
            value: priceCounts.paid
        },
        { name: 'Pending', value: priceCounts.pending }
    ];
    const COLORS = ['black', '#ad7925'];

    // Bar Chart Data
    const barData = [
        { name: 'Pending', value: statusCounts.pending },
        { name: 'Completed', value: statusCounts.paid }
    ];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
                <Helmet>
                    <title>MediMart | Seller Home </title>
                </Helmet>
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
                {/* Pie Chart */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4 text-center">Revenue Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4 text-center">Order Status Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="purple" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default SellerHomepage;