import { FaDownload } from "react-icons/fa"

const UpdateCategoryForm = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form>
                <div className='grid grid-cols-1 gap-2'>
                    <div className='space-y-6'>
                        {/* Category */}
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='category' className='block text-gray-600 '>
                                Category
                            </label>
                            <select
                                required
                                className='w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                                name='category'
                            >
                                <option value='Indoor'>Indoor</option>
                                <option value='Outdoor'>Outdoor</option>
                                <option value='Succulent'>Succulent</option>
                                <option value='Flowering'>Flowering</option>
                            </select>
                        </div>

                    </div>
                    <div className='space-y-3 flex flex-col'>
                        {/* Image */}
                        <div className=' p-4  w-full  m-auto rounded-lg flex-grow'>
                            <div>
                                <label htmlFor='image' className='flex items-center gap-2 mb-2 text-sm'>
                                    <FaDownload></FaDownload>
                                </label>
                                <input
                                    type='file'
                                    id='image'
                                    name='image'
                                    accept='image/*'
                                    placeholder="gd"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 '
                        >
                            Update Category
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateCategoryForm
