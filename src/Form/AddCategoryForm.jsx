import { useForm } from "react-hook-form";
import { FaDownload } from "react-icons/fa";
import { imageUpload } from "../api/utilis";

const AddCategoryForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const addCategory = async (data) => {
    const category = data.category;
    const image = data.image[0]; // 'image' is an array, we need the first file
    const photoURL = await imageUpload(image);
    console.log(category, photoURL);

    // Optional: Reset form after submission
    reset();
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(addCategory)}>
        <div className="grid grid-cols-1 gap-2">
          <div className="space-y-6">
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
              >
                <option disabled selected>
                  Who chose Category?
                </option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulent">Succulent</option>
                <option value="Flowering">Flowering</option>
              </select>
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
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500"
            >
              Add Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
