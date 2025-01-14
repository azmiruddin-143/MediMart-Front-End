import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleAccount from '../../components/Shared/GoogleAccount';

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
                toast.success("Login successful!", {
                    autoClose: 3000,
                });
                navigate(from, { replace: true });
                reset()
            })
            .catch((error) => {
                toast.error(`Login failed: ${error.message}`, {
                    autoClose: 3000,
                });
            });
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
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
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <GoogleAccount></GoogleAccount>
                        <Link to={'/signup'}>
                            <h1>SignUp</h1>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
