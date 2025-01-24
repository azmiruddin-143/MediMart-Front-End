import React, { useState } from 'react';
import ManageBannerModal from '../../../Modal/ManageBannerModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { GiClick } from 'react-icons/gi';

const ManageBannerRow = ({ advertisement, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { advertisementImage, advertisementDescription, advertisementStatus, _id } = advertisement
    const [isOpen, setIsOpen] = useState(false)
    const updateStatus = (selectStatus) => {
        if (advertisementStatus === selectStatus) return
        axiosSecure.patch(`/advertisement/status/${_id}`, {
            advertisementStatus: selectStatus
        })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('banner Advertise Role Change', {
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

                setIsOpen(false)
            })


    }

    return (
        <tbody>
            <tr className='text-neutral'>
                <th className='border border-gray-300 px-4 py-2'>
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={
                                    advertisementImage} />
                        </div>
                    </div>
                </th>

                <td className='text-neutral border border-gray-300 px-4 py-2'>{advertisementDescription}</td>
                <td className={`${advertisementStatus === "Accept" ? "text-green-500 font-bold border border-gray-300 px-4 py-2" :
                    "text-neutral border border-gray-300 px-4 py-2"
                    }`}>{advertisementStatus}</td>
                <td className='border border-gray-300 px-4 py-2 text-sm'>
                    <span
                        onClick={() => setIsOpen(true)}
                        className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-black leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-primary rounded-full'
                        ></span>
                        <div className='flex'>
                            <span className='relative'>Change</span>
                            <GiClick className=' relative text-lg' />
                        </div>
                    </span>
                    {/* Modal */}
                    <ManageBannerModal isOpen={isOpen} advertisementStatus={advertisementStatus} updateStatus={updateStatus} setIsOpen={setIsOpen} />
                </td>


            </tr>
        </tbody>
    );
};

export default ManageBannerRow;