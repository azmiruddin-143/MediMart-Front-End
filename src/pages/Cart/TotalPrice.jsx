import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useCart from '../../hooks/useCart';
import Cart from './Cart';

const TotalPrice = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [,, cartRefetch] = useCart()

    useEffect(() => {

        axios.get("http://localhost:5000/carts/total")
            .then((res) => {
                setTotalPrice(res.data.totalPrice);
                cartRefetch()
            })
            .catch((error) => {
                console.error("Error fetching total:", error);
            });
    }, []);
    return (
        <div>
           <Cart totalPrice ={totalPrice} ></Cart>
        </div>
    );
};

export default TotalPrice;