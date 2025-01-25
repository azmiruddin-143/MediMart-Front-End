import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import CartRow from '../../components/Dashboard/TableRows/CartRow';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';
import ChekOutRow from '../../components/Dashboard/TableRows/ChekOutRow';
import Payment from '../Dashboard/Payment/Payment';
import NoResultFound from '../../components/Shared/NoResultFound';
const ChekOut = () => {
    const { user } = useContext(AuthContext)
    const [cart, isLoading, cartRefetch] = useCart()
    const [totalPrice, setTotalPrice] = useState(0);
    const axiosSecure = useAxiosSecure();
    axiosSecure.get(`/carts/total?email=${user?.email}`)
        .then((res) => {
            setTotalPrice(res.data.totalPrice);
            cartRefetch()
        })
        .catch((error) => {
            console.error("Error fetching total:", error);
        });

    if (isLoading) return <LoadingSpinner />;

    // const handleCheckout = () => {
    //     const selectedCartData = cart.map(item => ({
    //         image: item.image,
    //         name: item.name,
    //         company: item.company,
    //         perUnitPrice: item.perUnitPrice,
    //         quantity: item.quantity,
    //         subTotal: item.subTotal,
    //         totalPrice: totalPrice,
    //         _id: item._id
    //     }));
    //     console.log(selectedCartData);
    // }
    return (
        <div className="overflow-x-auto h-screen max-w-7xl mx-auto  my-10">
            <div className='text-center mb-8'>

                <h1 className='xl:text-5xl  sm:text-3xl md:text-4xl text-xl text-primary font-bold' >ChekOut</h1>

            </div>

            <div className='lg:flex items-center gap-5 ' >
                <table className="table ">

                    {
                        cart.length > 0 &&
                        <thead>
                            <tr className='text-lg uppercase  text-neutral'>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th className='text-end'>SubTotal</th>

                            </tr>
                        </thead>
                    }




                    {
                        cart.map((cart, index) =>
                            <ChekOutRow cart={cart} key={cart?._id} cartRefetch={cartRefetch} index={index} ></ChekOutRow>
                        )
                    }
                </table>
                <div className='absolute top-28 right-5'>
                    {
                        cart.length === 0 &&
                        <NoResultFound></NoResultFound>
                    }
                </div>

                {
                    cart.length > 0 &&
                    <div className="lg:w-[50%]  mx-auto border rounded-lg p-6 shadow-md bg-white">
                        <h2 className="text-xl font-bold mb-4">CART TOTALS <span className='text-primary font-bold'>{cart.length}</span></h2>


                        <div className="border-b pb-4 mb-4">
                            <div className="flex justify-between">
                                <span className="text-lg font-bold">Total Price</span>
                                <span className="text-lg font-bold">{totalPrice}$</span>
                            </div>
                        </div>

                        <Payment></Payment>

                        {/* <button

                            className="w-full bg-primary text-white py-3 rounded-lg text-center font-medium transition duration-300"
                        >
                            Order Now
                        </button> */}
                    </div>
                }



            </div>


        </div>
    );
};

export default ChekOut;