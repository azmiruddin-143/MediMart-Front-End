import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from 'react-router-dom';
import { Fade, Slide } from 'react-awesome-reveal';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { FaEye } from 'react-icons/fa6';
import { IoMdCart } from 'react-icons/io';
import DiscountModal from '../../Modal/DiscountModal';
import DiscountProductRow from '../Dashboard/TableRows/DiscountProductRow';
const DiscountProducts = () => {

    const { data: medicine = [], isLoading, refetch } = useQuery({
        queryKey: ['medicine-percent'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/medicine-percent');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;


    return (

        <Slide direction="up" duration={2000} triggerOnce>
            <div className='md:my-28 text-center  my-14 bg-gray-100'>

                <Fade className='xl:text-4xl lg:text-3xl sm:text-2xl relative -top-7 text-white bg-[#9dc923] py-2 px-5 w-fit mx-auto' duration={500} cascade triggerOnce>Top Trending</Fade>
                <div className=" lg:py-20 pb-10 2xl:mx-36 xl:mx-28 mx-4 lg:mx-10 ">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation
                        loop={true}
                        // autoplay={{
                        //     delay: 3000,
                        //     disableOnInteraction: false,
                        // }}
                        spaceBetween={20}
                        slidesPerView={4}

                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                            1280: {
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {medicine.map((item) => (
                            <SwiperSlide key={item._id}>
                                <DiscountProductRow medicine={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        </Slide>

    );
};

export default DiscountProducts;