import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import ManageMedicineRow from '../../../components/Dashboard/TableRows/ManageMedicineRow';
import AddMedicineModal from '../../../Modal/AddMedicineModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import NoResultFound from '../../../components/Shared/NoResultFound';
import { FaSearchengin } from 'react-icons/fa';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

const ManageMedicines = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Adjusted number of items per page
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    
    const { data: medicine = [], isLoading, refetch } = useQuery({
        queryKey: ['medicine', currentPage],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/medicine/manage/${user?.email}`);
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    // Calculate pagination
    const totalPages = Math.ceil(medicine.length / itemsPerPage);
    const paginatedData = medicine.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Filter and sort the medicine data based on search and sort parameters
    const filteredMedicines = paginatedData
        .filter((medicine) => {
            return (
                medicine.medicineName.toLowerCase().includes(search.toLowerCase()) ||
                medicine.medicineCategory.toLowerCase().includes(search.toLowerCase()) ||
                medicine.genericName.toLowerCase().includes(search.toLowerCase()) ||
                medicine.company.toLowerCase().includes(search.toLowerCase())
            );
        })
        .sort((a, b) => {
            if (sort === 'asc') {
                return a.perUnitPrice - b.perUnitPrice; // Ascending
            } else if (sort === 'dsc') {
                return b.perUnitPrice - a.perUnitPrice; // Descending
            }
            return 0; // No sorting
        });

    return (
        <div className=" overflow-x-auto container mx-auto my-10 ">
            <div className='md:flex space-y-4 md:space-y-0 items-center justify-between mb-8'>
                <h1 className='text-xl'>(All Medicine <span className='text-primary font-bold'>{medicine.length}</span>)</h1>
                <div>
                    <select
                        className='border p-4 rounded-md w-full'
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value=''>Sort By Price</option>
                        <option value='dsc'>Descending Price</option>
                        <option value='asc'>Ascending Price</option>
                    </select>
                </div>
                <div className='flex justify-between p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-b-primary focus-within:ring-primary'>
                    <input
                        className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                        type='text'
                        name='search'
                        placeholder='Search Medicine'
                        onBlur={handleSearchChange} // Used onChange for live filtering
                    />
                    <button className="px-1 md:px-4 py-3 text-sm text-neutral">
                        <FaSearchengin size={25} />
                    </button>
                </div>
                <div>
                    <span
                        onClick={() => setIsEditModalOpen(true)}
                        className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-black leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-primary rounded-full'
                        ></span>
                        <span className='relative'>Add Medicine</span>
                    </span>
                    <AddMedicineModal
                        isOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        refetch={refetch}
                    />
                </div>
            </div>

            <table className="table">
                <thead className='bg-primary'>
                    <tr className='text-lg text-neutral'>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Image</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Name</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Generic</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Description</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Category</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Details</th>
                        <th className='border border-gray-300 px-4 py-2 text-black'>Modified</th>
                        <th className='border border-gray-300 px-4 py-2 text-black text-end'>Action</th>
                    </tr>
                </thead>

                {
                    filteredMedicines.length > 0 && filteredMedicines.map((medicine) =>
                        <ManageMedicineRow medicine={medicine} key={medicine?._id} refetch={refetch} />
                    ) 
                }
            </table>

            {
                filteredMedicines.length === 0 && 
                <NoResultFound></NoResultFound>
            }

            {/* Pagination */}
            {
                filteredMedicines.length > 0 &&
                <div className='sm:flex justify-center items-center mt-8'>
                <button
                    className={`px-2 py-3 mx-1 rounded-md ${currentPage === 1 ? 'bg-gray-200' : 'bg-primary'}`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <SlArrowLeft />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`px-4 py-2 mx-1 rounded-md ${currentPage === i + 1 ? 'bg-primary text-black' : 'bg-gray-200'}`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className={`px-2 py-3 mx-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-primary'}`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <SlArrowRight />
                </button>
            </div>
            }
        </div>
    );
};

export default ManageMedicines;
