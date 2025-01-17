import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useCart = () => {
    const {user} = useContext(AuthContext)
    const { data: cart = [], isLoading, refetch:cartRefetch } = useQuery({
        queryKey: ['carts',user?.email],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:5000/carts?email=${user?.email}`);
            return data;
        }
    });
    return [cart,isLoading,cartRefetch]
};

export default useCart;