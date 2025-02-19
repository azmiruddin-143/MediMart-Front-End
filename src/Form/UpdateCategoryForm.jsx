import { FaDownload } from "react-icons/fa";
import { imageUpload } from "../api/utilis";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateCategoryForm = ({ category, refetch, setIsEditModalOpen }) => {
    const axiosSecure = useAxiosSecure()
    const { categoryImage, categoryName, _id } = category;
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [previewImage, setPreviewImage] = useState(categoryImage); // Default preview image
    const [fileName, setFileName] = useState(""); // To store file name

    // Helper function to extract file name from URL
    // Helper function to extract and format file name
    const getFileNameFromURL = (url) => {
        const urlParts = url.split("/");
        const fullFileName = urlParts[urlParts.length - 1];
        const [name, ext] = fullFileName.split(/\.(?=[^\.]+$)/); // Split into name and extension
        const truncatedName = name.length > 15 ? `${name.slice(0, 12)}...` : name; // Truncate if too long
        return `${truncatedName}.${ext}`; // Return formatted name with extension
    };




    useEffect(() => {
        if (categoryImage) {
            setFileName(getFileNameFromURL(categoryImage)); // Set default file name from URL
        }
    }, [categoryImage]);



    const addCategory = async (data) => {
        const categoryName = data.category;
        const image = data.image[0];
        const categoryImage = image ? await imageUpload(image) : previewImage;

        const categoryData = {
            categoryName,
            categoryImage,
        };


        reset();
        // Uncomment below to send the data to your backend
        axiosSecure.put(`/category/${_id}`, categoryData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Category Update', {
                        duration: 3000,
                    });
                }
                refetch();
                setIsEditModalOpen(false)
            })
            .catch((error) => {
                toast.error("Error!", (error.message), {
                    duration: 3000,
                })

            });
    };

    // Handle image change, preview, and file name
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            const fileExt = file.name.split('.').pop(); // Get file extension
            setFileName(`${file.name.slice(0, 10)}...${fileExt}`); // Shorten file name
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
            <form onSubmit={handleSubmit(addCategory)} className="w-full">
                <div className="">
                    <div className="space-y-6">
                        {/* Category */}
                        <div className="space-y-1 text-sm">
                            <input
                                type="text"
                                defaultValue={categoryName}
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
                        {/* Custom File Input */}
                        <div className="w-full m-auto rounded-lg flex-grow">
                            <div>

                                {/* Display Shortened File Name */}
                                {fileName && (
                                    <p className="mt-2 text-sm text-gray-600">
                                        {fileName}
                                    </p>
                                )}
                                {errors.image && (
                                    <p className="text-red-500 text-sm">{errors.image.message}</p>
                                )}
                                {/* Image Preview */}
                                {previewImage && (
                                    <div className="mt-4">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="w-52 h-32 object-cover rounded-md border"
                                        />
                                    </div>
                                )}

                                <label
                                    htmlFor="image"
                                    className="flex mt-5 sm:w-5/12 w-8/12 text-center items-center gap-2 mb-2 text-sm cursor-pointer bg-primary text-white px-4 py-2 rounded shadow"
                                >
                                    <FaDownload /> Upload Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    {...register("image")}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden" // Hide the default input
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="sm:w-5/12 w-8/12 p-2 mt-5 text-center text-sm text-white transition duration-200 rounded shadow-md bg-primary"
                        >
                            Update Category
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateCategoryForm;
