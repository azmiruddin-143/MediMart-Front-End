import { useContext } from "react";
import { authContext } from "../Auth Provider setup/AuthProvider";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
// import { Helmet } from "react-helmet-async";
import { FaArrowAltCircleDown } from "react-icons/fa";

const UpdateProfile = () => {

    const { user, myProfileUpdate, setuser, setloader } = useContext(authContext)
    console.log(user);


    const updateProfileForm = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const photourl = event.target.photourl.value

        // update Profile//
        myProfileUpdate({ displayName: name, photoURL: photourl})
            .then(() => {

                setuser({ ...user, displayName: name, photoURL: photourl })
                toast.success("Update successful!", {
                    autoClose: 3000,
                });
                event.target.reset();
            })
            .catch((error) => {
                toast.error(`Update failed: ${error.message}`, {
                    autoClose: 3000,
                });
            })
        setloader(false)
    }


    return (
        <div>

            {/* <Helmet>
                <title>MyProfile | Page</title>
            </Helmet> */}
            <div className="my-10 ">
                <div className="hero-content p-2 sm flex-col mx-auto lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                        <form onSubmit={updateProfileForm} className="card-body p-3 sm:p-8 ">
                            <div className="sm:flex gap-5  items-center">
                                <div className="avatar flex justify-center sm:block">
                                    <div className="ring-[#e09d15]  ring-offset-base-100 w-16 sm:w-24 lg:w-32 rounded-full ring ring-offset-2">
                                        <img src={user?.photoURL} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h1 className="text-center pt-4 sm:pt-0 sm:text-start">Name : {user?.displayName}</h1>
                                    <h1 className="text-center  sm:text-start">Email : {user?.email}</h1> 
                                   
                                </div>
                            </div>
                            <div className="form-control">
                                <h1 className="flex items-center gap-2 mt-3">Update your Profile <FaArrowAltCircleDown className="lg:text-2xl md:text-xl" /></h1>
                                <label className="label">
                                    <span className="label-text">name</span>
                                </label>
                                <input type="text" name='name' placeholder="Enter your  name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoURL</span>
                                </label>
                                <input type="text" name='photourl' placeholder="Enter your photourl" className="input input-bordered" required />
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