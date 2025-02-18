import React from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import { Link, useLoaderData } from 'react-router-dom';

const ArticleDetails = () => {
    const articleDetails = useLoaderData();
    const { title, description, image,date } = articleDetails;

    return (
        <div className='h-screen'>
           
            <div className="grid 2xl:mx-32 sm:mt-16 grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {/* Image Section */}
                <div className="flex justify-center">
                    <img
                        className="w-full h-auto rounded-lg object-cover"
                        src={image}
                        alt={title}
                    />
                </div>
                {/* Content Section */}
                <div className="flex flex-col ">
                    <h1 className="sm:text-3xl text-xl font-semibold mb-4">{title}</h1>
                    <p className="text-md text-gray-700">{description}</p>
                    <p className="text-lg pt-4 font-semibold text-black">{date}</p>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetails;
