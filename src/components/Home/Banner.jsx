import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useQuery } from '@tanstack/react-query';
import { Fade, Slide } from "react-awesome-reveal";

const Banner = () => {

    const { data: banner = [], isLoading, } = useQuery({
        queryKey: ['acceptad-advertisement'],
        queryFn: async () => {
            const { data } = await axios.get('https://medi-mart-server-opal.vercel.app/acceptad-advertisement');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    return (
        <div className="w-full relative">
            <Swiper
                modules={[Navigation, Autoplay, EffectFade, Pagination]}
                navigation={false}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                effect="fade"
                slidesPerView={1}
                loop={true}
                className="2xl:h-[700px] md:h-[450px] lg:h-[600px] sm:h-[400px] h-[200px]"
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                        // Custom pagination rendering
                        return `<span class="${className} custom-bullet">${index + 1}</span>`;
                    },
                }}
            >

                {
                    banner.map(banner =>

                        <SwiperSlide>
                            <div
                                style={{
                                    backgroundImage: `url(${banner.
                                        advertisementImage})`, backgroundColor: "#00000087",
                                    backgroundBlendMode: "multiply"
                                }}
                                className="bg-cover bg-no-repeat bg-center w-full h-full flex justify-start items-center"
                            >

                                <div className="2xl:ml-36 xl:ml-28 lg:ml-10 ml-4 sm:ml-6 sm:space-y-4 space-y-2">
                                    <Fade duration={3000} triggerOnce >
                                        <h1 className="lg:text-6xl sm:text-4xl text-2xl sm:w-7/12 text-white font-bold">
                                            Discover the Taste of Freshness
                                        </h1>
                                    </Fade>
                                    <p className="lg:w-7/12  text-sm sm:text-md lg:text-lg sm:w-8/12 text-white font-bold">
                                        Savor the best collection of organic and fresh foods delivered
                                        straight to your doorstep. Experience the perfect blend of taste
                                        and nutrition in every bite.
                                    </p>
                                    <Slide direction="up" duration={2000} triggerOnce>
                                        <Link to={"/shop"} className="border-b border-secondary py-4">
                                            <button className="bg-secondary rounded-md text-black text-sm sm:text-md lg:text-xl font-bold py-1 px-4 sm:py-2 sm:px-6 sm:mt-6 mt-4 ">Purchase menu</button>
                                        </Link>
                                    </Slide>
                                </div>

                            </div>
                        </SwiperSlide>
                    )
                }


                {/* <SwiperSlide>
                    <div
                        style={{
                            backgroundImage: `url(${slider2})`
                        }}
                        className="bg-cover bg-no-repeat bg-center w-full h-full flex justify-start items-center"
                    >
                     
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        style={{
                            backgroundImage: `url(${slider3})`
                        }}
                        className="bg-cover bg-no-repeat bg-center w-full h-full flex justify-start items-center"
                    >
                      
                    </div>
                </SwiperSlide> */}
            </Swiper>

        </div>
    );
};

export default Banner;
