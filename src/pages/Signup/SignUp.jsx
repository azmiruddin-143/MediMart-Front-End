import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { imageUpload } from '../../api/utilis';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleAccount from '../../components/Shared/GoogleAccount';
import axios from 'axios';
import signupImage from '../../assets/Sign up-bro.png';
import { FaChevronLeft } from 'react-icons/fa';

const SignUp = () => {
    const { register, reset, handleSubmit, formState: { errors }, } = useForm();
    const { registerUser, myProfileUpdate, setuser } = useContext(AuthContext);

    const onSubmit = async (data) => {
        try {
            const photoURL = await imageUpload(data.image[0]);
            const name = data.name;
            const email = data.email;
            const image = photoURL;
            const password = data.password;
            const role = data.role;

            if (role === 'chose role?') {
                return;
            }

            registerUser(email, password)
                .then((result) => {
                    myProfileUpdate({ displayName: name, photoURL: image })
                        .then(() => {
                            const userInfo = {
                                userName: name,
                                userEmail: email,
                                userphoto: photoURL,
                                userRole: role
                            };

                            axios.post('https://medi-mart-server-opal.vercel.app/users', userInfo)
                                .then(res => {
                                    console.log(res.data);
                                })
                                .catch((error) => {
                                    console.log(error.message);
                                });

                            setuser({ ...result.user, displayName: name, photoURL: image });
                            toast.success("Registration successful!", {
                                autoClose: 3000,
                            });
                            reset();
                        })
                        .catch((error) => {
                            toast.error(`Registration failed: ${error.message}`, {
                                autoClose: 3000,
                            });
                            console.log('error kahico', error.message);
                        });
                })
                .catch((error) => {
                    console.log('error kahico', error.message);
                });
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    return (
        <div>
             
             <Link to={'/'} ><h1 className='bg-primary text-black font-bold w-fit py-2 px-4 flex items-center gap-2 rounded-md my-3 mx-3'><FaChevronLeft /> Home Page</h1></Link>
             
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-6 max-w-4xl w-full">
                    {/* Left Side Image */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img className="w-2/3 md:w-full object-cover" src={signupImage} alt="Sign Up" />
                    </div>

                    {/* Right Side Form */}
                    <div className="card w-full md:w-1/2 flex-col bg-base-100 max-w-xl shrink-0 shadow-2xl p-4">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name='name'
                                    {...register("name", { required: true, minLength: 3 })}
                                    placeholder="Enter your name"
                                    className="input input-bordered"
                                />
                                {errors.name && <span className='text-red-800 pt-3'>Name must be 3+ characters</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    {...register("email", { required: true })}
                                    placeholder="Enter your email"
                                    className="input input-bordered"
                                />
                                {errors.email && <span className='text-red-800 pt-3'>Email is required</span>}
                            </div>
                            <div>
                                <label htmlFor='image' className='block mb-2 text-sm'>
                                    Select Image:
                                </label>
                                <input
                                    {...register("image", { required: true })}
                                    type='file'
                                    id='image'
                                    name='image'
                                    accept='image/*'
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                                    placeholder="Enter your password"
                                    className="input input-bordered"
                                />
                                {errors.password?.type === "required" && <p className='text-red-800 pt-3'>Password is required</p>}
                                {errors.password?.type === "minLength" && <p className='text-red-800 pt-3'>Password must be 6+ characters</p>}
                                {errors.password?.type === "maxLength" && <p className='text-red-800 pt-3'>Password must be less than 20 characters</p>}
                            </div>
                            <div className='form-control'>
                                <label className="label">
                                    <span className="label-text">User Role</span>
                                </label>
                                <select className="select select-bordered w-full"  {...register("role", { required: true })}>
                                    <option disabled selected>Choose role?</option>
                                    <option>User</option>
                                    <option>Seller</option>
                                </select>
                            </div>
                            <div className="form-control mt-6">
                                <button className="bg-primary py-3 text-black font-bold rounded-md">SignUp</button>
                            </div>
                        </form>
                        <GoogleAccount />
                        <Link className='text-center py-5' to={'/signin'} ><h1>Already a user? <span className='text-primary font-bold'>SignIn</span> </h1></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
