import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useCart = () => {
    const { data: cart = [], isLoading, refetch:cartRefetch } = useQuery({
        queryKey: ['carts'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/carts');
            return data;
        }
    });
    return [cart,isLoading,cartRefetch]
};

export default useCart;