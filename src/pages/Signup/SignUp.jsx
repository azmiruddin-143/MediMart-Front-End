import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { imageUpload } from '../../api/utilis';
// import GoogleAccount from './GoogleAccount';
// import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleAccount from '../../components/Shared/GoogleAccount';
import axios from 'axios';

const SignUp = () => {
    const { register, reset, handleSubmit, formState: { errors }, } = useForm()
    const { registerUser, myProfileUpdate, setuser } = useContext(AuthContext)
    const onSubmit = async (data) => {
        try {
            const photoURL = await imageUpload(data.image[0]); // Await ব্যবহার করুন

            const name = data.name
            const email = data.email
            const image = photoURL
            const password = data.password
            const role = data.role

            registerUser(email, password)
                .then((result) => {
                    console.log(result.user);
                    myProfileUpdate({ displayName: name, photoURL: image })
                        .then(() => {
                            const userInfo = {
                                userName: name,
                                userEmail: email,
                                userphoto: photoURL,
                                userRole: role
                            };

                            axios.post('http://localhost:5000/users',userInfo)
                            .then(res =>{
                                console.log(res.data);
                            })
                            .catch((error) =>{
                                console.log(error.message);
                            })

                            setuser({ ...result.user, displayName: name, photoURL: image })
                            toast.success("Registration successful!", {
                                autoClose: 3000,
                            });
                            reset()
                        })
                        .catch((error) => {
                            toast.error(`Registration failed: ${error.message}`, {
                                autoClose: 3000,
                            });
                            console.log('error kahico', error.message);
                        })


                })
                .catch((error) => {
                    console.log('error kahico', error.message);
                })



            ///////////////////////errr/////////////////////////
            // console.log(userInfo); 
        } catch (error) {
            console.error("Image upload failed:", error);
        }

    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">SignUp</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="name" name='name' {...register("name", { required: true, minLength: 3 })} placeholder="Enter your name" className="input input-bordered" />
                            {errors.name && <span className='text-red-800 pt-3'>Your Name 3 carektar must</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' {...register("email", { required: true })} placeholder="Enter your email" className="input input-bordered" />
                            {errors.email && <span className='text-red-800 pt-3'>email is rewure</span>}
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
                            <input type="password" name='password' {...register("password", {
                                // required: true, minLength: 6, maxLength: 20,
                                // pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%!]).+$/
                            })} placeholder="Enter your password" className="input input-bordered" />

                            {errors.password?.type === "required" && (<p className='text-red-800 pt-3'>password is required</p>)}
                            {errors.password?.type === "minLength" && (<p className='text-red-800 pt-3'>6 ba tar besi</p>)}
                            {errors.password?.type === "maxLength" && (<p className='text-red-800 pt-3'>20 er besi hobe na</p>)}
                            {errors.password?.type === "pattern" && (<p className='text-red-800 pt-3'>A a 5 @ agula thakte hobe passeord er modde</p>)}

                        </div>
                        <div className='form-control'>
                            <label className="label">
                                <span className="label-text">User Role</span>
                            </label>
                            <select className="select select-bordered w-full max-w-xs"  {...register("role", { required: true })}>
                                <option disabled selected>Who chose role?</option>
                                <option>User</option>
                                <option>Seller</option>
                            </select>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">SignUp</button>
                        </div>
                    </form>
                    <GoogleAccount></GoogleAccount>
                    <Link to={'/signin'} ><h1>Signin</h1></Link>
                    {/* <GoogleAccount></GoogleAccount> */}
                </div>

            </div>
        </div>
    );
};

export default SignUp;