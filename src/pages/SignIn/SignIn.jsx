import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import GoogleAccount from '../../components/Shared/GoogleAccount';
import signinImage from '../../assets/Sign in-pana.png';
import { FaChevronLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';


const SignIn = () => {
    const { loginUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const { register, reset, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data;
        loginUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                toast.success('Login successful!!', {
                    duration: 3000, 
                });
                navigate(from, { replace: true });
                reset();
            })
            .catch((error) => {
                toast.error("Login failed!", (error.message), {
                    duration: 3000,
                })
            });
    };

    return (
        <div>
            <Link to={'/'} ><h1 className='bg-primary text-black font-bold w-fit py-2 px-4 flex items-center gap-2 rounded-md my-3 mx-3'><FaChevronLeft /> Home Page</h1></Link>
            <div className="min-h-screen flex items-center justify-center ">
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-4 max-w-4xl w-full">
                    {/* Left Side Image */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img className="w-2/3 md:w-full object-cover" src={signinImage} alt="Sign In" />
                    </div>

                    {/* Right Side Form */}
                    <div className="card w-full md:w-1/2 flex-col bg-base-100 max-w-xl shrink-0 shadow-2xl p-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    placeholder="Enter your email"
                                    className="input input-bordered"
                                />
                                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", { required: "Password is required" })}
                                    placeholder="Enter your password"
                                    className="input input-bordered"
                                />
                                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                            </div>
                            <div className="form-control mt-6">
                                <button className="bg-primary py-3 text-black font-bold rounded-md">SignIn</button>
                            </div>
                        </form>
                        <GoogleAccount />
                        <Link className='text-center py-5' to={'/signup'}>
                            <h1>Need an account? <span className='text-primary font-bold'>SignUp</span></h1>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
