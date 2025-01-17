import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import CartRow from '../../components/Dashboard/TableRows/CartRow';
const Cart = () => {
    
     const [cart,isLoading,cartRefetch] = useCart()
    if (isLoading) return <LoadingSpinner />;
    
    return (
        <div className=" overflow-x-auto max-w-4xl mx-auto my-10">
            <div className='flex justify-between mb-8'>
                <h1 className='text-xl' >( All Users <span className='text-primary' >{cart.length}</span> )</h1>
                
            </div>
        <table className="table">
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
                    <CartRow cart={cart} key={cart?._id} cartRefetch ={cartRefetch}  index={index} ></CartRow>
                )
            }
        </table>
    </div>
    );
};

export default Cart;