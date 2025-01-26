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
