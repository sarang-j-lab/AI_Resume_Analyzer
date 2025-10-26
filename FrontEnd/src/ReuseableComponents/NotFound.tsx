import {  useNavigate } from "react-router-dom"

const NotFound = () => {

    const navigate = useNavigate();
  return (
    <div className='flex justify-center items-center h-screen flex-col gap-6'>
        <h1>404 Not Found</h1>
        <button className="border-1 p-1 px-2 rounded-lg hover:bg-gray-500 transition duration-[0.4s] hover:text-white" onClick={() => navigate("/")}>Navigate to home</button>
    </div>
  )
}

export default NotFound
