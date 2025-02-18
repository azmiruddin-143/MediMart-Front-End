import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import slider from '../../assets/medicine-banner-1.jpg';
import slider2 from '../../assets/medicine-banner-2.jpg';
import slider3 from '../../assets/medicine-banner-3.jpg';
import slider4 from '../../assets/medicine-banner-4.jpg';
import slider5 from '../../assets/medicine-banner-5 .jpg';
import { Link } from "react-router-dom";
import { Fade, Slide } from "react-awesome-reveal";
import { BorderBeam } from "@stianlarsen/border-beam";

const Sliders = () => {
    return (
        <div className="w-full relative">
            <Swiper
                modules={[Navigation, Autoplay, EffectFade, Pagination]}
                navigation={false}
                // autoplay={{
                //     delay: 3000,
                //     disableOnInteraction: false,
                // }}
                effect="fade"
                slidesPerView={1}
                loop={true}
                className="2xl:h-[600px] md:h-[450px] lg:h-[500px] sm:h-[400px] h-[300px]"
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                        // Custom pagination rendering
                        return `<span class="${className} custom-bullet">${index + 1}</span>`;
                    },
                }}
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div
                        style={{
                            backgroundImage: `url(${slider5})`, backgroundColor: "#00000087",
                            backgroundBlendMode: "multiply"
                        }}
                        className="bg-cover bg-no-repeat bg-center w-full h-full flex justify-start items-center"
                    >
                        <div className="2xl:ml-36 xl:ml-28 lg:ml-10 ml-4 sm:ml-6 sm:space-y-4 space-y-2">
                            <Fade duration={3000} triggerOnce >
                                <h1 className="lg:text-6xl sm:text-4xl text-2xl lg:w-9/12 xl:w-8/12 sm:w-7/12 text-white font-bold">
                                    Trusted Medicine, Quality Assured
                                </h1>
                            </Fade>
                            <p className="lg:w-7/12 sm:pb-6 pb-4 text-sm sm:text-md lg:text-lg sm:w-8/12 text-white font-bold">
                                We provide high-quality medicines at affordable prices. Safe, reliable, and fast delivery to your doorstep. Your health is our priority.
                            </p>
                            <Slide  className="" direction="up" duration={2000} triggerOnce>
                                <div className="relative  border-2 border-transparent rounded-md inline-block">
                                    {/* Border Animation */}
                                    <BorderBeam
                                        borderWidth={3}
                                        colorFrom="white"
                                        colorTo="#ad7925"
                                        size={50}
                                        duration={4}
                                        delay={0}
                                    />

                                    {/* Button */}
                                    <Link to={"/shop"}>
                                        <button className="bg-black rounded-md text-white text-sm sm:text-md lg:text-xl font-bold py-1 px-4 sm:py-2 sm:px-6  w-full">
                                            Purchase medicine
                                        </button>
                                    </Link>
                                </div>
                            </Slide>

                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div
                        style={{
                            backgroundImage: `url(${slider2})`, backgroundColor: "#00000087",
                            backgroundBlendMode: "multiply"
                        }}
                        className="bg-cover bg-no-repeat bg-center w-full h-full flex justify-start items-center"
                    >
                        <div className="2xl:ml-36 xl:ml-28 lg:ml-10 ml-4 sm:ml-6 sm:space-y-4 space-y-2">
                            <Fade duration={3000} triggerOnce >
                                <h1 className="lg:text-6xl sm:text-4xl text-2xl lg:w-9/12 xl:w-8/12 sm:w-7/12  text-white font-bold">
                                    Fast & Reliable Online Pharmacy
                                </h1>
                            </Fade>
                            <p className="lg:w-7/12 sm:pb-6 pb-4  text-sm sm:text-md lg:text-lg sm:w-8/12 text-white font-bold">
                                Order quality medicines online with ease. Hassle-free service, fast delivery, and trusted products for your health and well-being.
                            </p>
                            <Slide  className="" direction="up" duration={2000} triggerOnce>
                                <div className="relative  border-2 border-transparent rounded-md inline-block">
                                    {/* Border Animation */}
                                    <BorderBeam
                                        borderWidth={3}
                                        colorFrom="white"
                                        colorTo="#ad7925"
                                        size={50}
                                        duration={4}
                                        delay={0}
                                    />

                                    {/* Button */}
                                    <Link to={"/shop"}>
                                        <button className="bg-black rounded-md text-white text-sm sm:text-md lg:text-xl font-bold py-1 px-4 sm:py-2 sm:px-6  w-full">
                                            Purchase medicine
                                        </button>
                                    </Link>
                                </div>
                            </Slide>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        style={{
                            backgroundImage: `url(${slider3})`, backgroundColor: "#00000087",
                            backgroundBlendMode: "multiply"
                        }}
                        className="bg-cover bg-no-repeat bg-center w-full h-full flex justify-start items-center"
                    >
                        <div className="2xl:ml-36 xl:ml-28 lg:ml-10 ml-4 sm:ml-6 sm:space-y-4 space-y-2">
                            <Fade duration={3000} triggerOnce >
                                <h1 className="lg:text-6xl sm:text-4xl text-2xl xl:w-8/12 sm:w-7/12 text-white font-bold">
                                    Reliable Medicine Supply Online
                                </h1>
                            </Fade>
                            <p className="lg:w-7/12 sm:pb-6 pb-4 text-sm sm:text-md lg:text-lg sm:w-8/12 text-white font-bold">
                                Order genuine medicines easily from our trusted online store. Fast delivery, expert pharmacists, and quality healthcare at your fingertips.
                            </p>
                            <Slide  className="" direction="up" duration={2000} triggerOnce>
                                <div className="relative  border-2 border-transparent rounded-md inline-block">
                                    {/* Border Animation */}
                                    <BorderBeam
                                        borderWidth={3}
                                        colorFrom="white"
                                        colorTo="#ad7925"
                                        size={50}
                                        duration={4}
                                        delay={0}
                                    />

                                    {/* Button */}
                                    <Link to={"/shop"}>
                                        <button className="bg-black rounded-md text-white text-sm sm:text-md lg:text-xl font-bold py-1 px-4 sm:py-2 sm:px-6  w-full">
                                            Purchase medicine
                                        </button>
                                    </Link>
                                </div>
                            </Slide>
                        </div>
                    </div>
                </SwiperSlide>
                {/* 4 */}
                <SwiperSlide>
                    <div
                        style={{
                            backgroundImage: `url(${slider4})`, backgroundColor: "#00000087",
                            backgroundBlendMode: "multiply"
                        }}
                        className="bg-cover bg-no-repeat bg-center w-full h-full flex justify-start items-center"
                    >
                        <div className="2xl:ml-36 xl:ml-28 lg:ml-10 ml-4 sm:ml-6 sm:space-y-4 space-y-2">
                            <Fade duration={3000} triggerOnce >
                                <h1 className="lg:text-6xl sm:text-4xl text-2xl lg:w-9/12 xl:w-8/12 sm:w-7/12  text-white font-bold">
                                    Trusted Medicine for Every Need
                                </h1>
                            </Fade>
                            <p className="lg:w-7/12 sm:pb-6 pb-4 text-sm sm:text-md lg:text-lg sm:w-8/12 text-white font-bold">
                                Providing high-quality medicines with reliable service. Shop a wide range of healthcare products with guaranteed safety and authenticity for your well-being.
                            </p>
                            <Slide  className="" direction="up" duration={2000} triggerOnce>
                                <div className="relative  border-2 border-transparent rounded-md inline-block">
                                    {/* Border Animation */}
                                    <BorderBeam
                                        borderWidth={3}
                                        colorFrom="white"
                                        colorTo="#ad7925"
                                        size={50}
                                        duration={4}
                                        delay={0}
                                    />

                                    {/* Button */}
                                    <Link to={"/shop"}>
                                        <button className="bg-black rounded-md text-white text-sm sm:text-md lg:text-xl font-bold py-1 px-4 sm:py-2 sm:px-6  w-full">
                                            Purchase medicine
                                        </button>
                                    </Link>
                                </div>
                            </Slide>
                        </div>
                    </div>
                </SwiperSlide>

                {/* 5 */}

                <SwiperSlide>
                    <div
                        style={{
                            backgroundImage: `url(${slider})`, backgroundColor: "#00000087",
                            backgroundBlendMode: "multiply"
                        }}
                        className="bg-cover bg-no-repeat bg-center w-full h-full flex justify-start items-center"
                    >
                        <div className="2xl:ml-36 xl:ml-28 lg:ml-10 ml-4 sm:ml-6 sm:space-y-4 space-y-2">
                            <Fade duration={3000} triggerOnce >
                                <h1 className="lg:text-6xl sm:text-4xl text-2xl lg:w-9/12 xl:w-8/12 sm:w-7/12  text-white font-bold">
                                    Your Trusted Online Pharmacy
                                </h1>
                            </Fade>
                            <p className="lg:w-7/12 sm:pb-6 pb-4 text-sm sm:text-md lg:text-lg sm:w-8/12 text-white font-bold">
                                Buy genuine medicines and healthcare products online. Easy ordering, fast delivery, and expert guidance for your health and wellness needs.
                            </p>
                            <Slide  className="" direction="up" duration={2000} triggerOnce>
                                <div className="relative  border-2 border-transparent rounded-md inline-block">
                                    {/* Border Animation */}
                                    <BorderBeam
                                        borderWidth={3}
                                        colorFrom="white"
                                        colorTo="blue"
                                        size={50}
                                        duration={4}
                                        delay={0}
                                    />

                                    {/* Button */}
                                    <Link to={"/shop"}>
                                        <button className="bg-primary rounded-md text-white text-sm sm:text-md lg:text-xl font-bold py-1 px-4 sm:py-2 sm:px-6  w-full">
                                            Purchase medicine
                                        </button>
                                    </Link>
                                </div>
                            </Slide>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

        </div>
    );
};

export default Sliders;
