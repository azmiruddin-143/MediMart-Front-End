import { useForm } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { imageUpload } from "../api/utilis";
import axios from "axios";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MedicineUpdateForm = ({ setIsEditModalOpen, refetch, medicine }) => {
    const axiosSecure = useAxiosSecure()
    const { medicineName, discountPercentage, perUnitPrice, medicineMassUnit, company, medicineImage, medicineCategory, genericName, shortDescription, _id } = medicine;
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageName, setImageName] = useState(medicineImage ? medicineImage.split("/").pop().slice(0, 10) : ""); // Get the default image name

    const medicineUpdate = async (data) => {
        const uploadedImage = selectedImage ? await imageUpload(selectedImage) : medicineImage;
        const medicineUpdate = {
            medicineName: data.medicineName,
            genericName: data.genericName,
            shortDescription: data.shortDescription,
            medicineImage: uploadedImage,
            medicineCategory: data.medicineCategory,
            company: data.company,
            medicineMassUnit: data.medicineMassUnit,
            perUnitPrice: parseFloat(data.perUnitPrice),
            discountPercentage: parseFloat(data.discountPercentage) || 0,
        };
        if (data.medicineCategory === "Select a category") {
            return;
        }
        if (data.company === "Select a company") {
            return;
        }

        // Reset form
        reset();
        setIsEditModalOpen(false);
        refetch();
        axiosSecure.put(`/medicine/${_id}`, medicineUpdate)
            .then(res => {
                console.log(res.data);
                refetch();
                setIsEditModalOpen(false);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImageName(file.name.slice(0, 10)); // Show first 10 characters of the file name
        }
    };

    return (
        <div className="w-full p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Update Medicine</h2>
            <form onSubmit={handleSubmit(medicineUpdate)} className="space-y-6">
                {/* Medicine Name */}
                <div>
                    <label htmlFor="medicineName" className="block text-gray-600 mb-1">
                        Medicine Name
                    </label>
                    <input
                        type="text"
                        defaultValue={medicineName}
                        id="medicineName"
                        {...register("medicineName", { required: "Medicine Name is required" })}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-lime-500"
                        placeholder="Enter medicine name"
                    />
                    {errors.medicineName && <p className="text-red-500 text-sm">{errors.medicineName.message}</p>}
                </div>

                {/* Generic Name */}
                <div>
                    <label htmlFor="genericName" className="block text-gray-600 mb-1">
                        Generic Name
                    </label>
                    <input
                        type="text"
                        defaultValue={genericName}
                        id="genericName"
                        {...register("genericName", { required: "Generic Name is required" })}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-lime-500"
                        placeholder="Enter generic name"
                    />
                    {errors.genericName && <p className="text-red-500 text-sm">{errors.genericName.message}</p>}
                </div>

                {/* Short Description */}
                <div>
                    <label htmlFor="shortDescription" className="block text-gray-600 mb-1">
                        Short Description
                    </label>
                    <textarea
                        id="shortDescription"
                        defaultValue={shortDescription}
                        {...register("shortDescription", { required: "Description is required" })}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-lime-500"
                        placeholder="Enter a short description"
                    ></textarea>
                    {errors.shortDescription && <p className="text-red-500 text-sm">{errors.shortDescription.message}</p>}
                </div>

                {/* Medicine Image */}
                <div>
                    <label htmlFor="medicineImage" className="block text-gray-600 mb-1">
                        Upload Medicine Image
                    </label>
                    <div className="flex flex-col  gap-4">
                        <div className="relative">
                            <input
                                type="file"
                                id="medicineImage"
                                accept="image/*"
                                {...register("medicineImage")}
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="medicineImage"
                                className="flex w-5/12 items-center gap-2 cursor-pointer bg-lime-500 text-white py-2 px-4 rounded-md hover:bg-lime-600"
                            >
                                <FaCloudUploadAlt className="text-xl" />
                                Choose File
                            </label>
                            {selectedImage && (
                                <div className="mt-2">
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Selected"
                                        className="w-24 h-24 object-cover rounded-md border border-gray-300"
                                    />
                                    <p className="mt-2 text-sm text-gray-600">{imageName}...</p>
                                </div>
                            )}
                            {medicineImage && !selectedImage && (
                                <div className="mt-2">
                                    <img
                                        src={medicineImage}
                                        alt="Current"
                                        className="w-24 h-24 object-cover rounded-md border border-gray-300"
                                    />
                                    <p className="mt-2 text-sm text-gray-600">{imageName}...</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {errors.medicineImage && <p className="text-red-500 text-sm">{errors.medicineImage.message}</p>}
                </div>

                {/* Other Fields (Medicine Category, Company, Mass Unit, etc.) */}
                {/* ... Your existing code for other fields like medicine category, company, mass unit, etc. */}
                {/* Medicine Category */}
                <div>
                    <label htmlFor="medicineCategory" className="block text-gray-600 mb-1">
                        Medicine Category
                    </label>
                    <select
                        defaultValue={medicineCategory}
                        {...register("medicineCategory", { required: "Category is required" })}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-lime-500"
                    >
                        <option disabled selected>
                            Select a category
                        </option>
                        <option value="Analgesics">Analgesics</option>
                        <option value="Antibiotics">Antibiotics</option>
                        <option value="Antiseptics">Antiseptics</option>
                        <option value="Antipyretics">Antipyretics</option>
                        <option value="Antacids">Antacids</option>
                        <option value="Antihistamines">Antihistamines</option>
                        <option value="Antimalarials">Antimalarials</option>
                        <option value="Vitamins">Vitamins</option>
                        <option value="Antifungals">Antifungals</option>
                        <option value="Antiviral">Antiviral</option>
                    </select>
                    {errors.medicineCategory && <p className="text-red-500 text-sm">{errors.medicineCategory.message}</p>}
                </div>

                {/* Company */}
                <div>
                    <label htmlFor="company" className="block text-gray-600 mb-1">
                        Company
                    </label>
                    <select
                        defaultValue={company}
                        {...register("company", { required: "Company is required" })}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-lime-500"
                    >
                        <option disabled selected>
                            Select a company
                        </option>
                        <option value="ABC Pharmaceuticals">ABC Pharmaceuticals</option>
                        <option value="XYZ Biotech">XYZ Biotech</option>
                        <option value="MediCare Ltd.">MediCare Ltd.</option>
                        <option value="HealthCare Inc.">HealthCare Inc.</option>
                        <option value="PharmaPlus">PharmaPlus</option>
                    </select>
                    {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
                </div>

                {/* Medicine Mass Unit */}
                <div>
                    <label htmlFor="medicineMassUnit" className="block text-gray-600 mb-1">
                        Medicine Mass Unit
                    </label>
                    <input
                        
                        type="text"
                        defaultValue={medicineMassUnit}
                        id="medicineMassUnit"
                        {...register("medicineMassUnit", { required: "Mass Unit is required" })}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-lime-500"
                        placeholder="e.g., 500 Mg or 200 ML"
                    />
                    {errors.medicineMassUnit && <p className="text-red-500 text-sm">{errors.medicineMassUnit.message}</p>}
                </div>

                {/* Per Unit Price */}
                <div>
                    <label htmlFor="perUnitPrice" className="block text-gray-600 mb-1">
                        Per Unit Price
                    </label>
                    <input
                        type="number"
                        defaultValue={perUnitPrice}
                        id="perUnitPrice"
                        {...register("perUnitPrice", { required: "Price is required" })}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-lime-500"
                        placeholder="Enter price per unit"
                    />
                    {errors.perUnitPrice && <p className="text-red-500 text-sm">{errors.perUnitPrice.message}</p>}
                </div>

                {/* Discount Percentage */}
                <div>
                    <label htmlFor="discountPercentage" className="block text-gray-600 mb-1">
                        Discount Percentage
                    </label>
                    <input
                        type="number"
                        defaultValue={discountPercentage}
                        id="discountPercentage"
                        {...register("discountPercentage")}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-lime-500"
                        placeholder="Enter discount percentage (optional)"
                    />
                </div>


                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 text-white bg-lime-500 rounded-md hover:bg-lime-600 transition duration-200"
                >
                    Update Medicine
                </button>
            </form>
        </div>
    );
};

export default MedicineUpdateForm;
