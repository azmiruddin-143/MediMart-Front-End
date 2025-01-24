import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosSecure from './useAxiosSecure';
import { useEffect, useState } from 'react';

const useCategory = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [filteredData, setFilteredData] = useState([]); // Filtered data state
    const axiosSecure = useAxiosSecure();
    const { categoryName } = useParams();

    // Fetching data using react-query
    const { data: CategoryMedicine = [], isLoading, refetch } = useQuery({
        queryKey: ['CategoryMedicine', categoryName],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/categoryMedicine?category=${categoryName}`);
            return data;
        },
        enabled: !!categoryName, // Run query only if categoryName is available
    });

    // Filter and sort logic
    useEffect(() => {
        if (!CategoryMedicine || CategoryMedicine.length === 0) {
            setFilteredData([]);
            return;
        }

        let updatedData = [...CategoryMedicine];

        // Search filter
        if (search) {
            updatedData = updatedData.filter((item) =>
                item?.medicineName?.toLowerCase().includes(search.toLowerCase()) // Optional chaining
            );
        }

        // Sort
        if (sort === 'asc') {
            updatedData.sort((a, b) => (a?.perUnitPrice || 0) - (b?.perUnitPrice || 0)); // Handle missing price
        } else if (sort === 'dsc') {
            updatedData.sort((a, b) => (b?.perUnitPrice || 0) - (a?.perUnitPrice || 0));
        }

        setFilteredData(updatedData);
    }, [search, sort, CategoryMedicine]);

    return [categoryName, isLoading, refetch, filteredData, setSearch, setSort, sort];
};

export default useCategory;
