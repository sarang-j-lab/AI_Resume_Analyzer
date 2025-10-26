import { useMutation } from '@tanstack/react-query';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import useDisableContext from '../Context/ButtonDisableContext/UseDisableContext';
const API_URL = import.meta.env.VITE_API_URL


const Navbar = () => {

    const navigate = useNavigate();
    const { disable, disableButton } = useDisableContext();

    async function logoutFun() {
        const response = await axios.post(`${API_URL}/api/auth/signout`, {}, { withCredentials: true });
        return response.data
    }

    const { mutate, isPending } = useMutation({
        mutationKey: ['logout'],
        mutationFn: logoutFun,
        onError: (error) => {
            console.log(error)
            toast.error("Unable to logout! please try after some time")
        },
        onSuccess: () => {
            navigate("/signin")
            toast.success("Logged out successfully!")
        }
    })


    function handleLogout() {
        disableButton();
        mutate()
    }

    return (
        <nav className='navbar'>
            <Link to="/"><p className='text-2xl font-bold text-gradient'>ResuMate</p></Link>
            <div className='flex gap-5'>
                <Link to="/upload"><button disabled={disable} className='primary-button w-fit'>Upload</button></Link>
                <button disabled={disable} onClick={handleLogout} className='logout-btn text-white rounded-full px-4 py-2 cursor-pointer w-full;ad bg-red w-fit'>{isPending ? "Loading.." : "Logout"}</button>
            </div>
            <Toaster />
        </nav>
    )
}

export default Navbar
