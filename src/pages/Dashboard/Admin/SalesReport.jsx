import React from 'react';
import SalesReportRow from './SalesReportRow';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const SalesReport = () => {
    const { data: report = [], isLoading, refetch } = useQuery({
        queryKey: ['report'],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:5000/all-payments`);
            return data;
        },
       
    });

      if(isLoading) return <LoadingSpinner></LoadingSpinner>
     
    return <SalesReportRow data = {report} ></SalesReportRow>;
};

export default SalesReport;