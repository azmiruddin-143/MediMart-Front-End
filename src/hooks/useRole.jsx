import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user } = useContext(AuthContext); 
    const axiosSecure = useAxiosSecure();

    const { data: role = [], isLoading, isError } = useQuery({
        queryKey: ['role', user?.email], 
        queryFn: async () => {
            if (!user?.email) return []; 
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data.userRole || [];
        },
        enabled: !!user?.email, 
    });

    return { role, isLoading, isError }; 
};

export default useRole;
