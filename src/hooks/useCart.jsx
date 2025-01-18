import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext)
    const { data: cart = [], isLoading, refetch:cartRefetch } = useQuery({
        queryKey: ['carts',user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/carts?email=${user?.email}`);
            return data;
        }
    });
    return [cart,isLoading,cartRefetch]
};

export default useCart;