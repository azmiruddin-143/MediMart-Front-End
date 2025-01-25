import React from 'react';
import noData from '../../assets/No data-bro.png'
const NoResultFound = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4">

            <img src={noData} alt="No results found" class="w-2/3 md:w-2/4 lg:w-2/5 xl:w-1/5 mb-2" />

            <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2 text-center">
                No Results Found
            </h1>

            <p className="text-gray-500 text-center text-sm md:text-base">
                We couldn't find what you searched for. <br />
                Try searching again.
            </p>
        </div>

    );
};

export default NoResultFound;