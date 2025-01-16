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
const DiscountProducts = () => {
    const { data: medicine = [], isLoading, } = useQuery({
        queryKey: ['medicine'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/medicine');
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
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
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
                        {medicine.map((medicine) => (
                            <SwiperSlide key={medicine._id}>
                                <div className="h-[450px] bg-white rounded-lg shadow-lg 2xl:p-4 p-2 text-center">
                                    <div className='relative' >
                                        <img
                                            src={medicine.medicineImage}
                                            className="w-full h-72 rounded-md object-cover mb-4"
                                        />
                                        <div class="absolute text-white top-2 right-2 bg-primary rounded-full p-1 shadow">
                                            <h1>{medicine.discountPercentage}%</h1>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-semibold">{medicine.medicineName}</h3>
                                    <p className="text-[#9dc923] font-bold">${medicine.perUnitPrice}</p>
                                    <Link  ><button className='text-white bg-[#9dc923] my-3 py-2 px-5'>View Details</button></Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </Slide>

    );
};

export default DiscountProducts;