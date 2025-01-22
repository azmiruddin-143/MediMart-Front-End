import React, { useState } from 'react';
import DeleteAdvertisement from '../../../Modal/DeleteAdvertisement';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const Advertisementrow = ({ advertisement, index, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { advertisementImage, advertisementDescription, advertisementStatus, _id } = advertisement
    let [isOpen, setIsOpen] = useState(false)
    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }
    const AdvertisementDelete = () => {
        axiosSecure.delete(`/advertisement/${_id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success('Advertisement deleted successfully!', {
                        duration: 3000,
                    });
                }
                refetch()
                setIsOpen(false)
            })
            .catch((error) => {
                toast.error("Error!", (error.message), {
                    duration: 3000,
                })
            })
    }

    return (
        <tbody>
            <tr className='text-neutral'>
                <th className='flex  text-neutral items-center gap-5'>
                    <div className="avatar">
                        <div className="mask mask-squircle object-cover items-center h-12 w-12">
                            <img
                                src={
                                    advertisementImage} />
                        </div>
                    </div>
                </th>

                <td className='text-neutral'>{advertisementDescription}</td>
                <td className='text-neutral'>{advertisementStatus}</td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <button disabled = {advertisementStatus === "Accept"}>
                        <span
                            onClick={openModal}
                            className={`${advertisementStatus === "Accept" ? 'text-[#979797] relative cursor-pointer inline-block px-3 py-1 font-semibold' :"relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"}`}
                        >
                            <span
                                aria-hidden='true'
                                className={`${advertisementStatus === "Accept" ? 'absolute inset-0 bg-[#e3e1e1] opacity-50 rounded-full' :
                                    " absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                    }`}
                            ></span>
                            <span className='relative'>Delete</span>
                        </span>
                    </button>
                    <DeleteAdvertisement isOpen={isOpen}  AdvertisementDelete={AdvertisementDelete} closeModal={closeModal} />
                </td>

            </tr>
        </tbody>
    );
};

export default Advertisementrow;