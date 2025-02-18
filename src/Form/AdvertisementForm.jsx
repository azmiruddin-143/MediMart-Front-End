import { useForm } from "react-hook-form";
import { FaDownload } from "react-icons/fa";
import { imageUpload } from "../api/utilis";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const AdvertisementForm = ({ setIsEditModalOpen, refetch }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const addAdvertisement = async (data) => {
    const advertisementTitle = data.title; 
    const advertisementDescription = data.description;
    const image = data.image[0];
    const advertisementImage = await imageUpload(image);

    const advertisementData = {
      advertisementTitle, 
      advertisementImage,
      advertisementDescription,
      advertisementStatus: "Pending",
      requestEmail: user?.email
    };

    reset();
    setIsEditModalOpen(false);
    axiosSecure.post("/advertisement", advertisementData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success('Banner added successfully', {
            duration: 3000, 
          });
        }
        refetch();
      })
      .catch((error) => {
        toast.error("Error!", (error.message), {
          duration: 3000,
      })
      });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(addAdvertisement)}>
        <div className="grid grid-cols-1 gap-2">
          <div className="space-y-3 flex flex-col">
            
            

            {/* Image Upload */}
            <div className="p-4 w-full m-auto rounded-lg flex-grow">
              <div>
                <label htmlFor="image" className="flex items-center gap-2 mb-2 text-sm">
                  <FaDownload />
                  <span>Upload Image</span>
                </label>
                <input
                  type="file"
                  id="image"
                  {...register("image", { required: "Image is required" })}
                  accept="image/*"
                  className="file:btn file:btn-sm file:bg-primary file:text-white file:rounded file:border-0 file:cursor-pointer"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>
            </div>

            {/* Title Input */}
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered"
              placeholder="Banner Title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}

            {/* Description Input */}
            <textarea
              {...register("description", { required: "Description is required" })}
              className="textarea textarea-bordered"
              placeholder="Banner Description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-primary"
            >
              Add Advertisement
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdvertisementForm;
