import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Articles = () => {
    const [articel, setArticel] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/articles')
            .then(res => setArticel(res.data))
    }, [])
    console.log(articel.length);
    return (
        <div>
            {
                articel.map(ar =>
                    <div>
                        <h1>{ar.description}</h1>
                        <button className='bg-blue-700 py-2 px-4 text-white'>Vew Button</button>
                    </div>
                )
            }
        </div>
    );
};

export default Articles;