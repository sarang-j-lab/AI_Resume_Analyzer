import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { Navigate, Outlet } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL


const ProtectedRoute = () => {

    async function authCheck() {
        const res = await axios.get(`${API_URL}/api/auth/auth-check`, { withCredentials: true });
        return res.data;
    }


    const { data, isLoading, isError } = useQuery({
        queryKey: ["authCheck"],
        queryFn: authCheck,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime:Infinity,
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
