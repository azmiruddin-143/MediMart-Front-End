import React from "react";
import { FaShippingFast, FaUndo, FaLock, FaGift } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <section className="bg-black py-8 xl:my-10 sm:my-14 my-8">
      <div className=" mx-auto xl:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <FaShippingFast className="text-primary text-4xl mb-4" />
          <h3 className="text-lg font-semibold text-white">Free Shipping</h3>
          <p className="text-gray-100">On all orders over $49.00</p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <FaUndo className="text-primary text-4xl mb-4" />
          <h3 className="text-lg font-semibold text-white">15 Days Returns</h3>
          <p className="text-gray-100">Moneyback guarantee</p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <FaLock className="text-primary text-4xl mb-4" />
          <h3 className="text-lg font-semibold text-white">Secure Checkout</h3>
          <p className="text-gray-100">Protected by Stripe</p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center">
          <FaGift className="text-primary text-4xl mb-4" />
          <h3 className="text-lg font-semibold text-white">Offer & Gift Here</h3>
          <p className="text-gray-100">On all orders over</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
