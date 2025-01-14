import { useContext } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { FaArrowAltCircleDown } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { imageUpload } from "../../api/utilis";

const UpdateProfile = () => {
    const { user, myProfileUpdate, setuser } = useContext(AuthContext);

    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { name, image } = data;
        const photoURL = await imageUpload(image[0]);

        myProfileUpdate({ displayName: name, photoURL })
            .then(() => {
                setuser({ ...user, displayName: name, photoURL });
                toast.success("Update successful!", {
                    autoClose: 3000,
                });
                reset()
            })
            .catch((error) => {
                toast.error(`Update failed: ${error.message}`, {
                    autoClose: 3000,
                });
            });
    };

    return (
        <div>
            <div className="my-10">
                <div className="hero-content p-2 sm flex-col mx-auto lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body p-3 sm:p-8">
                            <div className="sm:flex gap-5 items-center">
                                <div className="avatar flex justify-center sm:block">
                                    <div className="ring-[#e09d15] ring-offset-base-100 w-16 sm:w-24 lg:w-32 rounded-full ring ring-offset-2">
                                        <img src={user?.photoURL} alt="Profile" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h1 className="text-center pt-4 sm:pt-0 sm:text-start">Name: {user?.displayName}</h1>
                                    <h1 className="text-center sm:text-start">Email: {user?.email}</h1>
                                </div>
                            </div>

                            <div className="form-control">
                                <h1 className="flex items-center gap-2 mt-3">
                                    Update your Profile <FaArrowAltCircleDown className="lg:text-2xl md:text-xl" />
                                </h1>
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Enter your name"
                                    className="input input-bordered"
                                />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </div>

                            <div>
                                <label htmlFor="image" className="block mb-2 text-sm">
                                    Select Image:
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    {...register("image", { required: "Image is required" })}
                                    accept="image/*"
                                />
                                {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn bg-[#3c4483] hover:bg-[#3c4483] text-white">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
