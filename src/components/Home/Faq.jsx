import { Disclosure } from '@headlessui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import faqImage from '../../assets/FAQs-bro.png'
const Faq = () => {
    const faqs = [
        {
            question: "What is the best way to store medicine?",
            answer: "Store medicine in a cool, dry place, away from direct sunlight and moisture, unless otherwise directed on the label."
        },
        {
            question: "How can I check the expiration date of a medicine?",
            answer: "The expiration date is usually printed on the packaging or label of the medicine. Always check it before use."
        },
        {
            question: "What should I do if I miss a dose of my medication?",
            answer: "If you miss a dose, take it as soon as you remember. If it is close to the next dose, skip the missed dose and continue your regular schedule."
        },
        {
            question: "How should I dispose of expired or unused medicines?",
            answer: "Dispose of expired or unused medicines by taking them to a pharmacy or following local disposal guidelines. Avoid flushing them down the toilet."
        },
        {
            question: "Can I store different medicines together in one container?",
            answer: "It is not recommended to store different medicines together as it can lead to confusion and potential mix-ups."
        },
        {
            question: "What precautions should I take when buying over-the-counter medicines?",
            answer: "Always check the label for active ingredients, expiration date, and potential side effects before purchasing over-the-counter medicines."
        },
    ];

    return (
        <div className=''>
            <div className='lg:flex items-center lg:mx-5 2xl:mx-36 rounded-md xl:mx-24'>
                <div className='flex-1'>
                    <img className='2xl:w-10/12' src={faqImage} alt="" />
                </div>

                <div className="p-4 max-w-7xl mx-auto lg:w-[50%] xl:mr-2 2xl:mr-0  lg:mr-7">
                    <h2 className="sm:text-4xl text-2xl font-bold sm:my-10 my-4 text-center">Frequently Asked Questions</h2>
                    {faqs.map((faq, index) => (
                        <Disclosure key={index}>
                            {({ open }) => (
                                <div className="mb-5 border rounded-lg">
                                    <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-left text-lg font-medium text-gray-800 bg-gray-50 hover:bg-gray-200">
                                        <span>{faq.question}</span>
                                        {open ? <FaChevronUp className="w-5 h-5" /> : <FaChevronDown className="w-5 h-5" />}
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 py-2 text-gray-700">
                                        {faq.answer}
                                    </Disclosure.Panel>
                                </div>
                            )}
                        </Disclosure>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
