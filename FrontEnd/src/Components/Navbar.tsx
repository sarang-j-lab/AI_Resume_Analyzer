import axios from 'axios'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL


const Navbar = () => {

    const navigate = useNavigate();

    async function handleLogout(){
        try {
            await axios.post(`${API_URL}/api/auth/signout`,{},{withCredentials:true});
            toast.success("Successfully Logged Out")
            navigate("/signin")
        } catch (error) {
            if(axios.isAxiosError(error)){
                toast.success(error?.response?.data?.message);
            }else{
                toast.success("Something went wrong");
            }
        }
    }
    return (
        <nav className='navbar'>
            <Link to="/"><p className='text-2xl font-bold text-gradient'>ResuMate</p></Link>
            <div className='flex gap-5'>
                <Link to="/upload"><p className='primary-button w-fit'>Upload</p></Link>
                <button onClick={handleLogout} className='logout-btn text-white rounded-full px-4 py-2 cursor-pointer w-full;ad bg-red w-fit'>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar
