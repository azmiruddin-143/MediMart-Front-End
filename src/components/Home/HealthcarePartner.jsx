import React from 'react';
import healdImage from '../../assets/healdcare-image.png'
import { FaSquareCheck } from 'react-icons/fa6';
import doctor from '../../assets/doctor.jpg'
const HealthcarePartner = () => {
    return (
        <div className='py-5 sm:py-14 xl:py-28 '>
            <section className=" lg:mx-8 mx-5 xl:mx-32 2xl:mx-36 shadow-md px-4 py-16 flex flex-col md:flex-row items-center ">
                {/* Left Image */}
                <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
                    <img src={healdImage} alt="" />
                </div>

                {/* Right Content */}
                <div className="md:w-1/2 md:pl-8">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                        Your Faithful Partners<br />
                        <span className="text-primary">Medical Goods</span>
                    </h2>
                    <p className="text-gray-600 mb-6">
                        We offer innovative solutions to design unlimited medical panels, capture leads, and maintain detailed records. Trust us for better security and seamless eCommerce solutions for all your medical needs.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex gap-2 items-center">
                            <FaSquareCheck className='text-primary text-3xl' />
                            <span className="text-gray-700">Enhanced security for patient privacy.</span>
                        </li>
                        <li className="flex gap-2 items-center">
                            <FaSquareCheck className='text-primary text-3xl' />
                            <span className="text-gray-700">Affordable prices for a wide range of products.</span>
                        </li>
                        <li className="flex gap-2 items-center">
                            <FaSquareCheck className='text-primary text-3xl' />
                            <span className="text-gray-700">Seamless eCommerce integration for customers.</span>
                        </li>
                    </ul>
                    <div className="mt-8 sm:flex justify-between items-center">
                        <div className='flex gap-2 mb-5 items-center'>
                            <img
                                src={doctor}
                                alt="Profile"
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="ml-4">
                                <p className="text-gray-700 font-semibold">Jerry Henson</p>
                                <p className="text-gray-500 text-sm">Medical Specialist</p>
                            </div>
                        </div>
                        <div className=" w-fit bg-[black] p-4 rounded-lg">
                            <p className="text-primary font-semibold">Get Support</p>
                            <p className="text-white text-sm">123-456-789-10</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HealthcarePartner;