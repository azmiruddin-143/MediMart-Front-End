import axios from 'axios';
import { Fade, Slide } from 'react-awesome-reveal';
import { Link } from 'react-router-dom'; 
import LatestProductCard from './LatestProductCard';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
const LatestProduct = () => {
    const { data: medicine = [], isLoading, refetch } = useQuery({
        queryKey: ['latest-product'],
        queryFn: async () => {
            const { data } = await axios.get(`https://medi-mart-server-opal.vercel.app/latest-product`);
            return data;
        },
    });


    if (isLoading) return <LoadingSpinner />;
    return (
        <div>
            <Fade duration={2000} triggerOnce className='text-center  text-primary font-bold sm:text-5xl text-3xl uppercase mt-8 sm:mt-16'>Latest Products</Fade>

            <Fade duration={4000} triggerOnce className='text-center mx-auto text-neutral mt-3 sm:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12'>Discover our 6 newest medicines, freshly added for your health and convenience!</Fade>


            <Slide direction="up" duration={2000} triggerOnce>
                <div className='sm:my-8 xl:my-16 my-5'>

                    <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center sm:gap-y-5 lg:gap-y-8 lg:mx-3 xl:mx-24 '>
                        {
                            medicine.map(latestProduct => <LatestProductCard key={latestProduct._id} medicine={latestProduct} ></LatestProductCard>)
                        }
                    </div>

                </div>

                <Link to={'/shop'}>
                    <button className='bg-black flex  mx-auto  text-white font-bold  py-2 px-5 my-5 rounded-lg'>See All</button>
                </Link>
            </Slide>


        </div>
    );
};

export default LatestProduct;