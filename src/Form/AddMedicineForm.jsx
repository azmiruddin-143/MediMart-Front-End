import { useForm } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { imageUpload } from "../api/utilis";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const AddMedicineForm = ({ setIsEditModalOpen, refetch }) => {
  const { user } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const addMedicine = async (data) => {
    const medicineImage = await imageUpload(data.medicineImage[0]);
    const medicineData = {
      medicineName: data.medicineName,
      sellerEmail: user?.email,
      genericName: data.genericName,
      shortDescription: data.shortDescription,
      medicineImage,
      medicineCategory: data.medicineCategory,
      company: data.company,
      medicineMassUnit: data.medicineMassUnit,
      perUnitPrice: parseFloat(data.perUnitPrice),
      discountPercentage: parseFloat(data.discountPercentage) || 0,

    };
    if (data.medicineCategory === "Select a category") {
      return
    }
    if (data.company === "Select a company") {
      return
    }

    // Reset form
    reset();
    setIsEditModalOpen(false);
    refetch();
    axiosSecure.post('/medicine', medicineData)
      .then(res => {
        if (res.data.insertedId) {
          toast.success(' Medicine added successfully', {
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
    <div className="w-full p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Add New Medicine</h2>
      <form onSubmit={handleSubmit(addMedicine)} className="space-y-6">
        {/* Medicine Name */}
        <div>
          <label htmlFor="medicineName" className="block text-gray-600 mb-1">
            Medicine Name
          </label>
          <input
            type="text"
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
          <div className="flex items-center gap-2">
            <FaCloudUploadAlt className="text-2xl text-lime-500" />
            <input
              type="file"
              id="medicineImage"
              {...register("medicineImage", { required: "Image is required" })}
              accept="image/*"
              className="block w-full text-sm text-gray-600"
            />
          </div>
          {errors.medicineImage && <p className="text-red-500 text-sm">{errors.medicineImage.message}</p>}
        </div>

        {/* Medicine Category */}
        <div>
          <label htmlFor="medicineCategory" className="block text-gray-600 mb-1">
            Medicine Category
          </label>
          <select
            {...register("medicineCategory", { required: "Category is required" })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-lime-500"
          >
            <option disabled selected>
              Select a category
            </option>
            <option value="Capsule">Capsule</option>
            <option value="Syrup">Syrup</option>
            <option value="Tablet">Tablet</option>
            <option value="Drops">Drops</option>
            <option value="Powder">Powder</option>
            <option value="Injection">Injection</option>
            <option value="Diabetic">Diabetic</option>
          </select>
          {errors.medicineCategory && <p className="text-red-500 text-sm">{errors.medicineCategory.message}</p>}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-gray-600 mb-1">
            Company
          </label>
          <select
            {...register("company", { required: "Company is required" })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-lime-500"
          >
            <option disabled selected>
              Select a company
            </option>
            <option value="Renata Limited">Renata Limited</option>
            <option value="Opsonin Pharma">Opsonin Pharma</option>
            <option value="ACI Limited">ACI Limited</option>
            <option value="Beximco Pharma">Beximco Pharma</option>
            <option value="Square Pharmaceuticals">Square Pharmaceuticals</option>
            <option value="Opso Saline">Opso Saline</option>
            <option value="Incepta Pharmaceuticals">Incepta Pharmaceuticals</option>
            <option value="Aristopharma Limited">Aristopharma Limited</option>
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
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default AddMedicineForm;
