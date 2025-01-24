import React from 'react';
import slider from '../../../src/assets/Medicine-banner-1.jpg';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { useNavigate, useParams } from 'react-router-dom';
const CategoryCard = () => {
   
    const navigate = useNavigate()
    const { data: category = [], isLoading, } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const { data } = await axios.get('https://medi-mart-server-opal.vercel.app/category');
            return data;
        }
    });

    
   
    if (isLoading) return <LoadingSpinner />;
    return (
        <div>
            <h1 className='text-center pt-6 text-4xl' >Shop By Category</h1>
            <div className='grid max-w-7xl mx-auto my-12 lg:grid-cols-4 grid-cols-1 sm:grid-cols-3 xl:grid-cols-6 place-items-center gap-4'>
                {
                    category.map(category =>
                        <div 
                        
                        onClick={()=> navigate(`/category/${category.categoryName}`)} 
                        
                        class="flex justify-center items-center  bg-gray-100">
                            <div class="w-52 h-52 bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">

                                <div class="h-[85%]">
                                    <img
                                        src={category.categoryImage}
                                        alt="Category"
                                        class="w-full h-full object-cover"
                                    />
                                </div>

                                <div class="h-[15%] flex justify-center items-center bg-primary">
                                    <h2 class="text-lg font-semibold text-white">{category.categoryName} </h2>
                                </div>
                               
                            </div>
                        </div>
                    )
                }

            </div>
        </div>

    );
};

export default CategoryCard;