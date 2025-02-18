import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const CategoryCard = () => {
   const navigate = useNavigate();
   const { data: category = [], isLoading } = useQuery({
      queryKey: ['category'],
      queryFn: async () => {
         const { data } = await axios.get('https://medi-mart-server-opal.vercel.app/category');
         return data;
      }
   });

   if (isLoading) return <LoadingSpinner />;

   return (
      <div>
         <h1 className='text-center font-bold pt-6 text-black text-2xl sm:text-4xl'>Shop By Category </h1>
         <div className='grid  max-w-7xl  mx-auto my-8 lg:grid-cols-4 grid-cols-1 sm:grid-cols-3 xl:grid-cols-6 place-items-center gap-4'>
            {
               category.slice(0, 6).map((category, index) =>
                  <div
                     key={index}
                     onClick={() => navigate(`/category/${category.categoryName}`)}
                     className="flex  justify-center items-center  bg-gray-100"
                  >
                     <div className=" w-80 sm:w-52 h-52  shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                        <div className="h-[85%]">
                           <img
                              src={category.categoryImage}
                              alt="Category"
                              className="w-full h-full object-cover"
                           />
                        </div>

                        <div className="h-[15%] flex justify-center items-center bg-primary">
                           <h2 className="text-lg font-semibold text-white">{category.categoryName}</h2>
                           <span className="text-sm text-white ml-2">({category.productCount} Products)</span>
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
