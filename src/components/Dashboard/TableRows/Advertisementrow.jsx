import React from 'react';

const Advertisementrow = ({ advertisement, index, refetch }) => {
    const {advertisementImage,advertisementDescription,advertisementStatus} = advertisement
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
               
               
            </tr>
        </tbody>
    );
};

export default Advertisementrow;