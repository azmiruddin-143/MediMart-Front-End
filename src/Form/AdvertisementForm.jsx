import { useForm } from "react-hook-form";
import { FaDownload } from "react-icons/fa";
import { imageUpload } from "../api/utilis";
import axios from "axios";

const AdvertisementForm = ({ setIsEditModalOpen, refetch }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const addAdvertisement = async (data) => {
    const advertisementDescription = data.description;
    const image = data.image[0];
    const advertisementImage = await imageUpload(image);

    const advertisementData = {
      advertisementImage,
      advertisementDescription,
      advertisementStatus: "Pending",
    };

    reset();
    setIsEditModalOpen(false);
    axios.post("http://localhost:5000/advertisement", advertisementData)
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(addAdvertisement)}>
        <div className="grid grid-cols-1 gap-2">
          <div className="space-y-3 flex flex-col">
            {/* Image */}
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
                  className="file:btn file:btn-sm file:bg-blue-500 file:text-white file:rounded file:border-0 file:cursor-pointer"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>
            </div>

            <textarea
              {...register("description", { required: "Description is required" })}
              className="textarea textarea-bordered"
              placeholder="Banner Description"
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500"
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
