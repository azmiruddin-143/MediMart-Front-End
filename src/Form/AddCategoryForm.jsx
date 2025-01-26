import { useForm } from "react-hook-form";
import { FaDownload } from "react-icons/fa";
import { imageUpload } from "../api/utilis";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const AddCategoryForm = ({ setIsEditModalOpen, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const addCategory = async (data) => {
        const categoryName = data.category;
        const image = data.image[0];
        const categoryImage = await imageUpload(image);

        const categoryData = {
            categoryName,
            categoryImage
        }

        reset()
        setIsEditModalOpen(false)
        axiosSecure.post('/category', categoryData)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Successfully Add Category', {
                        duration: 3000,
                    });
                }
                refetch()
            })
            .catch((error) => {
                toast.error("Error!", (error.message), {
                    duration: 3000,
                })
            })


    };

    return (
        <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
            <form onSubmit={handleSubmit(addCategory)}>
                <div className="grid grid-cols-1 gap-2">
                    <div className="space-y-6">
                        {/* Category */}
                        <div className="space-y-1 text-sm">
                            <input
                                type="text"
                                {...register("category", { required: "Category is required" })}
                                className="w-full px-4 py-3 border-black focus:outline-primary rounded-md bg-gray-50 border"
                                placeholder="Type Category"
                            />
                            {errors.category && (
                                <p className="text-red-500 text-sm">{errors.category.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-3 flex flex-col">
                        {/* Image */}
                        <div className="p-4 w-full m-auto rounded-lg flex-grow">
                            <div>
                                <label htmlFor="image" className="flex items-center gap-2 mb-2 text-sm">
                                    <FaDownload />
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    {...register("image", { required: "Image is required" })}
                                    accept="image/*"
                                />
                                {errors.image && (
                                    <p className="text-red-500 text-sm">{errors.image.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full p-3 mt-5 text-center font-medium  transition duration-200 rounded shadow-md bg-primary text-black"
                        >
                            Add Category
                        </button>
                    </div>
                </div>
            </form>
        </div>
        // old//
    );
};

export default AddCategoryForm;
