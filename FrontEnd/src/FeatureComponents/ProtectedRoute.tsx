import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { Navigate, Outlet } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL


const ProtectedRoute = () => {

    // const data = {isLoggedIn:true};
    async function authCheck() {
        const res = await axios.get(`${API_URL}/api/auth/auth-check`, { withCredentials: true });
        return res.data;
    }


    const { data, isPending:isLoading, isError, } = useQuery({
        queryKey: ["authCheck"],
        queryFn: authCheck,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retryOnMount: false,
        retry:false,
    })

    if (isLoading) return <p>Checking authentication...</p>;

    if (isError) return <Navigate to={'/signin'} />

    return (
        <>
            {data?.isLoggedIn ? <Outlet /> : <Navigate to="/signin" replace />}
        </>
    )
}

export default ProtectedRoute
