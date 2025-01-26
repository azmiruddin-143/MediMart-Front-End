import React from "react";
import { FiHelpCircle } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <Helmet>
        <title>MediMart | ErrorPage </title>
      </Helmet>
      <div className="text-center px-6">
        <div className="text-6xl font-bold mb-6">404 ?</div>
        <h1 className="text-3xl font-semibold mb-4">Something's wrong here...</h1>
        <p className="text-lg text-gray-300 mb-6">
          We can't find the page you're looking for. Check out our Help Center or
          head back to home.
        </p>
        <div className="flex justify-center gap-4">
          <Link to={'/contactus'}><button className="flex items-center bg-white text-blue-900 px-4 py-2 rounded-md font-semibold hover:bg-gray-200">
            <FiHelpCircle className="mr-2" /> Help
          </button></Link>
          <Link to={'/'}><button className="flex items-center bg-white text-blue-900 px-4 py-2 rounded-md font-semibold hover:bg-gray-200">
            <AiOutlineHome className="mr-2" /> Home
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
