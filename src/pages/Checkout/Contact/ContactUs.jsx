
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaClock } from "react-icons/fa";
import contact from '../../../assets/contact-image-BOLEc--O.jpg'
import { Helmet } from "react-helmet-async";
const ContactUs = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage("Your message has been sent successfully!");
                e.target.reset(); // Reset form fields
            } else {
                setErrorMessage("Something went wrong. Please try again later.");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please check your connection.");
        }
    };

    return (
        <div className="max-w-7xl lg:mx-auto gap-10 px-2 lg:px-8 items-center sm:my-16 xl:my-24 my-5 flex flex-col lg:flex-row">
            {/* Left Section */}
            <Helmet>
                <title>MediMart | Contact Us </title>
            </Helmet>
            {/* Left Section */}
            <div
                style={{
                    backgroundImage: `url(${contact})`, backgroundColor: "#000000dc",
                    backgroundBlendMode: "multiply"
                }}

                className="lg:w-1/2 w-full lg:py-32 py-10 text-white rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>

                {/* Address */}
                <div className="mb-4 flex items-center">
                    <FaMapMarkerAlt className="text-xl mr-4" />
                    <div>
                        <p>Bangladesh</p>
                        <p>Dhaka, Sonargaon</p>
                    </div>
                </div>

                {/* Phone */}
                <div className="mb-4 flex items-center">
                    <FaPhoneAlt className="text-xl mr-4" />
                    <div>
                        <p>Main: 01933946077</p>
                        <p>Support: 01916633597</p>
                    </div>
                </div>

                {/* Email */}
                <div className="mb-4 flex items-center">
                    <FaEnvelope className="text-xl mr-4" />
                    <div>
                        <p>contact: freelancerazmir143@gmail.com</p>
                        <p>support: developerazmir@gmail.com</p>
                    </div>
                </div>

                {/* Working Hours */}
                <div className="mb-4 flex items-center">
                    <FaClock className="text-xl mr-4" />
                    <div>
                        <p>Working Hours:</p>
                        <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
                    </div>
                </div>

                {/* Social Media */}
                <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                            <FaFacebook className="text-2xl" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                            <FaTwitter className="text-2xl" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                            <FaLinkedin className="text-2xl" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                            <FaInstagram className="text-2xl" />
                        </a>
                    </div>
                </div>
            </div>
            {/* Right Section */}
            <div className="lg:w-1/2 w-full bg-white shadow-xl p-8">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="access_key" value="ab114c23-5e20-4f54-81ae-2812da3142eb" />
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full border rounded-lg p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full border rounded-lg p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="w-full border rounded-lg p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            className="w-full border rounded-lg p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows="4"
                            className="w-full border rounded-lg p-2"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-black font-bold py-2 px-4 rounded-lg "
                    >
                        Send
                    </button>
                </form>

                {/* Success/Error Messages */}
                {successMessage && (
                    <p className="mt-4 text-green-600 font-medium">{successMessage}</p>
                )}
                {errorMessage && (
                    <p className="mt-4 text-red-600 font-medium">{errorMessage}</p>
                )}
            </div>
        </div>
    );
};

export default ContactUs;