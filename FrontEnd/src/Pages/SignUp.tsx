import React, { useState, type FormEvent } from 'react'
import Input from '../ReuseableComponents/Input';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import useDisableContext from '../Context/ButtonDisableContext/UseDisableContext';

const API_URL = import.meta.env.VITE_API_URL;

interface UserData {
    name: string,
    email: string,
    password: string
}

const SignUp = () => {
    const [userData, setUserData] = useState<UserData>({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    const { disable, disableButton } = useDisableContext();

    function inputChange(eve: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = eve.target;
        setUserData({ ...userData, [name]: value });
    }

    async function postUserData(userData: UserData) {
        if (userData?.password.length < 6) {
            throw new Error("Password must be greather than 6 charactors")
        }

        const response = await axios.post(`${API_URL}/api/auth/signup`, userData, { withCredentials: true })
        return response;
    }


    const { isPending: isLoading, mutate } = useMutation({
        mutationKey: ["signUp"],
        mutationFn: postUserData,
        onSuccess: () => {
            toast.success("User Logged In Successfully!")
            navigate("/")
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data?.message || error?.message || "Something went wrong! please try again.")
            } else if (error instanceof Error) {
                toast.error(error?.message)
            } else {
                toast.error("Something went wrong! please try again.")
            }
        },
        onSettled: () => {
            setUserData({ name: "", email: "", password: "" })
        }
    })

    const handleSubmit = (eve: FormEvent): void => {
        eve.preventDefault();
        disableButton()
        mutate(userData)
    }

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className='gradient-border shadow-lg'>
                <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
                    <div className='flex flex-col items-center gap-2 text-center'>
                        <h1>Welcome</h1>
                        <h2>Log in to continue you job journey</h2>
                    </div>
                    <form onSubmit={handleSubmit} className='flex justify-center items-center '>
                        <Input type='text' name='name' value={userData?.name} placeholder='Username' onChange={inputChange} />
                        <Input type='email' name='email' value={userData?.email} placeholder='Email' onChange={inputChange} />
                        <Input type='password' name='password' value={userData?.password} placeholder='Password' onChange={inputChange} />
                        <div>
                            <button disabled={disable} className='auth-button animated-pulse'>
                                <p>{isLoading ? "Signing you up..." : "Sign-Up"}</p>
                            </button>
                        </div>
                    </form>
                    <div>Already have an account! <Link to={'/signin'} className='text-blue-500'> Sign-in here</Link></div>
                </section>
            </div>

            <Toaster />
        </main>
    )
}

export default SignUp
