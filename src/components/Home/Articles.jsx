import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Articles = () => {
    const [articel, setArticel] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/articles')
            .then(res => setArticel(res.data))
    }, [])
    // const shortDescription = articel.description.split(' ').slice(0, 20).join(' ') + "..."
    return (
        <div className='2xl:mx-36 xl:mx-28 mx-5 lg:mx-10'>
            <h1 className='text-4xl font-semibold text-black py-8 '>Health Artices</h1>
            <div className='grid 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5 gap-5'>
                {
                    articel.map(ar =>

                        <div className="bg-gray-100 p-2 rounded-md h-full flex flex-col">
                            <img className="w-full h-36 rounded-md" src={ar.image} alt="" />
                            <div className="space-y-2 flex-grow">
                                <h1 className="font-bold pt-2">{ar.title}</h1>
                                <p className="text-gray-600">{ar.description.slice(0, 100) + "..."}</p>
                            </div>
                            <Link to={`/health-article/${ar._id}`}>
                                <button className="text-primary flex items-center my-3">
                                    Read More <FaChevronRight className="text-sm" />
                                </button>
                            </Link>
                        </div>

                    )
                }
            </div>
        </div>
    );
};

export default Articles;