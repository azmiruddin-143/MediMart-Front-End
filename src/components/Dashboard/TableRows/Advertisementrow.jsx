import React from 'react';

const Advertisementrow = ({ advertisement, index, refetch }) => {
    const {advertisementImage,advertisementDescription} = advertisement
    return (
        <tbody>
            <tr className='text-neutral'>
                <th className='flex  text-neutral items-center gap-5'>
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={
                                    advertisementImage} />
                        </div>
                    </div>
                </th>

                <td className='text-neutral'>{advertisementDescription}</td>
                <td className='text-neutral'>Pending</td>
               
               
            </tr>
        </tbody>
    );
};

export default Advertisementrow;