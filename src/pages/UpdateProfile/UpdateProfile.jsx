import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { FaArrowAltCircleDown } from "react-icons/fa";
import { useForm } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { imageUpload } from '../../api/utilis';

const UpdateProfile = () => {
    const { user } = useContext(AuthContext)
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
   
    const { data: myprofile = [], isLoading , refetch} = useQuery({
        queryKey: ['myprofile'],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:5000/myprofile/${user?.email}`);
            return data;
        }
    });
    
    const { userName, userEmail, userRole, userphoto,_id } = myprofile

    const onSubmit = async (data) => {
        const { name, image } = data;
        let updateData = {};

        if (name) {
            updateData.userName = name;
        }

        if (image && image.length > 0) {
            try {
                const photoURL = await imageUpload(image[0]);
                updateData.userphoto = photoURL;
            } catch (err) {
                toast.error("Image upload failed. Please try again.");
                return;
            }
        }

        // MongoDB তে PUT কল
        if (Object.keys(updateData).length > 0) {
            try {
                const response = await axios.put(`http://localhost:5000/myprofile/${_id}`, updateData);
                if (response.data.modifiedCount > 0) {
                    toast.success("Profile updated successfully!");
                    refetch()
                    reset();
                } else {
                    toast.warning("No changes made to the profile.");
                }
            } catch (error) {
                toast.error("Failed to update profile: " + error.message);
            }
        } else {
            toast.warning("No changes to update.");
        }
    };


  
    if (isLoading) return <LoadingSpinner />;




    return (
        <div>
            <div className="my-24">
                <div className="hero-content p-2 sm flex-col mx-auto lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body p-3 sm:p-8">
                            <div className="sm:flex gap-5 items-center">
                                <div className="avatar flex justify-center sm:block">
                                    <div className="ring-[#e09d15] ring-offset-base-100 w-16 sm:w-24 lg:w-32 rounded-full ring ring-offset-2">
                                        <img src={userphoto} alt="Profile" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h1 className="text-center pt-4 sm:pt-0 sm:text-start">Name: {userName}</h1>
                                    <h1 className="text-center sm:text-start">Email: {userEmail}</h1>
                                    <h1 className="text-center sm:text-start">Role: {userRole}</h1>
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
                                    {...register("name")}
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
                                    {...register("image")}
                                    accept="image/*"
                                />
                                {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn bg-primary hover:bg-primary text-white">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
