
import Marquee from "react-fast-marquee";
import { FaBolt } from 'react-icons/fa';

const TextSlider = () => {

    return (
        <Marquee
        pauseOnHover={true}
        >
            <h1 className='flex items-center gap-2 2xl:text-2xl text-sm md:text-md lg:text-lg bg-[black] text-white sm:p-2 p-1 xl:py-4'>
            
                Stay healthy with our authentic medicines.<FaBolt className="text-primary"/> Fast delivery, trusted quality, and affordable prices.<FaBolt className="text-primary"/> Your health, our priority. <FaBolt className="text-primary"/>Shop now for the best healthcare products.<FaBolt className="text-primary"/> Experience hassle-free service and reliable support.<FaBolt className="text-primary"/> Choose us for a healthier tomorrow.<FaBolt className="text-primary"/> Trusted by thousands for genuine care and excellence in medicine delivery.
            </h1>
        </Marquee>
    );
};

export default TextSlider;
