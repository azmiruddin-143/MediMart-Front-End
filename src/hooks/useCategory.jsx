import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const useCategory = () => {
    const { categoryName } = useParams(); 
    const { data: CategoryMedicine = [], isLoading,refetch } = useQuery({
        queryKey: ['CategoryMedicine', categoryName],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:5000/categoryMedicine?category=${categoryName}`);
            return data;
        },
        enabled: !!categoryName
    });

    return [ categoryName, isLoading ,refetch,CategoryMedicine ];
};

export default useCategory;