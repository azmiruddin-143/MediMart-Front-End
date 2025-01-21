// import axios from 'axios';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MedicineDetailsModal from '../../Modal/MedicineDetailsModal';
import { useContext, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoMdCart } from "react-icons/io";
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useRole from '../../hooks/useRole';
const AllMedicineRow = ({ medicine, index, refetch }) => {
    const { medicineName, genericName, shortDescription,
        sellerEmail, medicineImage, medicineCategory, company, medicineMassUnit, perUnitPrice, discountPercentage, _id } = medicine
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
     const [,,cartRefetch] = useCart()
     const {role} = useRole()
    const cartMedicine = () => {

        if (user && user?.email) {
            const cartsInfo = {
                cartId: _id,
                email: user?.email,
                name: medicineName,
                image: medicineImage,
                sellerEmail:sellerEmail,
                company: company,
                perUnitPrice: perUnitPrice,
                quantity: 1

            }

            axios.post('http://localhost:5000/carts', cartsInfo)
                .then(res => {
                    console.log(res.data);
                    cartRefetch()
                })
                .catch((error) => {
                    console.log(error.data);
                })
        }

        else {
            navigate('/signin')
        }

    }

    return (
        <tbody>
            <tr className='text-neutral '>
                <td className=' border border-gray-300 px-4 py-2 cursor-pointer  '>
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={
                                    medicineImage} />
                        </div>
                    </div>
                </td>

                <td className='text-neutral border border-gray-300 px-4 py-2 cursor-pointer'>{medicineName}</td>
                <td className='text-neutral border border-gray-300 px-4 py-2 cursor-pointer'>{genericName} </td>
                <td className='text-neutral border border-gray-300 px-4 py-2 cursor-pointer'> {medicineCategory}</td>
                <td className='text-neutral border border-gray-300 px-4 py-2 cursor-pointer'> {company}</td>

                <td className='px-5 py-5 border-b border-gray-300  text-sm border   cursor-pointer '>
                    <span
                        onClick={() => { setIsEditModalOpen(true) }}
                        className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-black leading-tight'
                    >

                        <span
                            aria-hidden='true'
                            className='absolute inset-0  bg-primary  rounded-full'
                        ></span>
                        <div className='flex items-center gap-2'>
                            <span className='relative '>Details</span>
                            <FaEye className=' relative text-lg' />
                        </div>

                    </span>
                    <MedicineDetailsModal
                        isOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        medicine={medicine}
                        refetch={refetch}
                        cartMedicine ={cartMedicine}
                    />
                </td>
                <td className=' border border-gray-300 px-4 py-2 cursor-pointer' >
                    <button disabled={role === "Admin" || role === "Seller"} onClick={cartMedicine} className='rounded-full bg-primary px-3 py-2 font-semibold text-black text-end flex items-center justify-center'>
                        Select <IoMdCart className='text-lg' />
                    </button>

                </td>


            </tr>
        </tbody>
    );
};

export default AllMedicineRow;