import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';

const useCategory = () => {
    const axiosSecure = useAxiosSecure();
    const { categoryName } = useParams(); 
    const { data: CategoryMedicine = [], isLoading,refetch } = useQuery({
        queryKey: ['CategoryMedicine', categoryName],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/categoryMedicine?category=${categoryName}`);
            return data;
        },
        enabled: !!categoryName
    });

    return [ categoryName, isLoading ,refetch,CategoryMedicine ];
};

export default useCategory;