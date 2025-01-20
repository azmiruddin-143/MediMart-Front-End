import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import CartRow from '../../components/Dashboard/TableRows/CartRow';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';
import ChekOutRow from '../../components/Dashboard/TableRows/ChekOutRow';
import Payment from '../Dashboard/Payment/Payment';
const ChekOut = () => {
   const {user} = useContext(AuthContext)
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
        <div className="overflow-x-auto max-w-7xl mx-auto  my-10">
       <div className='text-center mb-8'>
                
                <h1 className='text-5xl' >ChekOut</h1>

            </div>

            <div className='lg:flex items-center gap-5 ' >
                <table className="table ">
                    {
                        cart.length > 0 &&
                        <thead>
                            <tr className='text-lg uppercase  text-neutral'>
                                <th></th>
                                <th>Name5</th>
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
                            <ChekOutRow cart={cart} key={cart?._id} cartRefetch={cartRefetch} index={index} ></ChekOutRow>
                        )
                    }
                </table>

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

                        <Payment></Payment>

                        <button
                            
                            className="w-full bg-primary text-white py-3 rounded-lg text-center font-medium transition duration-300"
                        >
                            Order Now
                        </button>
                    </div>
                }



            </div>


        </div>
    );
};

export default ChekOut;