import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

import axios from 'axios';
import CartRow from '../../components/Dashboard/TableRows/CartRow';
const Cart = () => {
    const [cart, isLoading, cartRefetch] = useCart()
    const [totalPrice, setTotalPrice] = useState(0);

        axios.get("http://localhost:5000/carts/total")
            .then((res) => {
                setTotalPrice(res.data.totalPrice);
                cartRefetch()
            })
            .catch((error) => {
                console.error("Error fetching total:", error);
            });

    if (isLoading) return <LoadingSpinner />;

    const clearAllCarts = () => {
        axios.delete("http://localhost:5000/cartsClear")
            .then(res => {
                console.log(res.data);
                cartRefetch();
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="overflow-x-auto max-w-7xl mx-auto  my-10">
            <div className='flex justify-end mb-8'>
                <button onClick={clearAllCarts} className='bg-primary text-white py-2 px-6 rounded-md ' >Clear All </button>


            </div>

            <div className='lg:flex items-center gap-5 ' >
                <table className="table ">
                    {
                        cart.length > 0 &&
                        <thead>
                            <tr className='text-lg uppercase  text-neutral'>
                                <th></th>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th className='text-end'>SubTotal</th>

                            </tr>
                        </thead>

                    }

                    {cart.length === 0 &&
                        <div className="flex h-screen justify-center my-5">
                            <div>
                                <h1 className='text-4xl py-3 text-neutral'>No Data Found ?</h1>
                                <Link to={'/allfoods'} > <button className='py-2 my-3 px-6 bg-primary-content text-primary rounded-md'>Purchase Food</button> </Link>
                            </div>
                        </div>
                    }




                    {
                        cart.map((cart, index) =>
                            <CartRow cart={cart} key={cart?._id} cartRefetch={cartRefetch} index={index} ></CartRow>
                        )
                    }
                </table>

                {
                    cart.length > 0 &&
                    <div className="lg:w-[50%]  mx-auto border rounded-lg p-6 shadow-md bg-white">
                        <h2 className="text-xl font-bold mb-4">CART TOTALS {cart.length}</h2>

                        {/* <div className="border-b pb-4 mb-4">
                        <div className="flex justify-between">
                            <span className="text-gray-700">Subtotal</span>
                            <span className="font-semibold">4,050.00৳</span>
                        </div>
                    </div> */}

                        {/* <div className="border-b pb-4 mb-4">
                        <div className="flex justify-between">
                            <span className="text-gray-700">Home Delivery</span>
                            <span className="font-semibold">70.00৳</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Shipping to: <span className="font-medium">Dhaka</span></p>
                        <button className="text-red-500 text-sm mt-2">Change address</button>
                    </div> */}

                        <div className="border-b pb-4 mb-4">
                            <div className="flex justify-between">
                                <span className="text-lg font-bold">Total Price</span>
                                <span className="text-lg font-bold">{totalPrice}$</span>
                            </div>
                        </div>

                        <button
                            className="w-full bg-primary text-white py-3 rounded-lg text-center font-medium hover:bg-red-600 transition duration-300"
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                }



            </div>


        </div>
    );
};

export default Cart;