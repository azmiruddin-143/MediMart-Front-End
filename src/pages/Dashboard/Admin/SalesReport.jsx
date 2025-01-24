import React from 'react';
import SalesReportRow from './SalesReportRow';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SalesReport = () => {
    const axiosSecure = useAxiosSecure()
    const { data: report = [], isLoading, refetch } = useQuery({
        queryKey: ['report'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-payments`);
            return data;
        },
       
    });

      if(isLoading) return <LoadingSpinner></LoadingSpinner>
     
    return <SalesReportRow data = {report} ></SalesReportRow>;
};

export default SalesReport;