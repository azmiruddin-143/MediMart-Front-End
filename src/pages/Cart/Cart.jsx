import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import CartRow from '../../components/Dashboard/TableRows/CartRow';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';
import NoResultFound from '../../components/Shared/NoResultFound';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
const Cart = () => {
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

    const clearAllCarts = () => {
        axiosSecure.delete("/cartsClear")
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success('AllCart deleted successfully!', {
                        duration: 3000,
                    });
                }
                cartRefetch();
            })
            .catch((error) => {
                toast.error("Error!", (error.message), {
                    duration: 3000,
                })
            });
    };




    return (
        <div className="overflow-x-auto h-screen max-w-7xl mx-auto  my-10">
            <Helmet>
                <title>MediMart | Cart </title>
            </Helmet>
            {
                cart.length > 0 &&
                <div className='flex justify-end mb-8'>
                    <button onClick={clearAllCarts} className='bg-primary text-white py-2 px-6 rounded-md ' >Clear All </button>

                </div>
            }

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



                    {
                        cart.map((cart, index) =>
                            <CartRow cart={cart} key={cart?._id} cartRefetch={cartRefetch} index={index} ></CartRow>
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
                        <h2 className="text-xl font-bold mb-4">CART TOTALS {cart.length}</h2>


                        <div className="border-b pb-4 mb-4">
                            <div className="flex justify-between">
                                <span className="text-lg font-bold">Total Price</span>
                                <span className="text-lg font-bold">{totalPrice}$</span>
                            </div>
                        </div>


                        <Link to={'/chekout'} >

                            <button
                                className="w-full bg-primary text-white py-3 rounded-lg text-center font-medium transition duration-300"
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </Link>
                    </div>
                }



            </div>


        </div>
    );
};

export default Cart;