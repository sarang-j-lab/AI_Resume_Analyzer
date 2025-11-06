import React, { useState, type FormEvent, } from 'react'
import Input from '../ReuseableComponents/Input';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { Link,  useNavigate } from 'react-router-dom';
import useDisableContext from '../Context/ButtonDisableContext/UseDisableContext';
const API_URL = import.meta.env.VITE_API_URL;

interface UserData {
  email: string,
  password: string
}

const SignIn = () => {
  const [userData, setUserData] = useState<UserData>({ email: "", password: "" });
  const { disable, disableButton } = useDisableContext();
  const navigate = useNavigate();

  function inputChange(eve: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = eve.target;
    setUserData({ ...userData, [name]: value });
  }

  async function postUserData(userData: UserData) {
    if (userData?.password.length < 6) {
      throw new Error("Password must be greather than 6 charactors")
    }
    const response = await axios.post(`${API_URL}/api/auth/signin`, userData, { withCredentials: true })
    return response;
  }


  const { isPending: isLoading, mutate} = useMutation({
    mutationKey: ["signIn"],
    mutationFn: postUserData,
    onSuccess: () => {
      toast.success("User Logged In Successfully!")
      navigate("/")
    },
    onError: (error) => {
      const errorMessage = axios.isAxiosError(error) ? error?.response?.data?.message : error?.message || "Something went wrong! please try again.";
      toast.error(errorMessage);
    }
  })



  function handleSubmit(eve: FormEvent): void {
    eve.preventDefault();
    disableButton()
    mutate(userData)
  }

  

      return (
      <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
        <div className='gradient-border shadow-lg'>
          <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
            <div className='flex flex-col items-center gap-2 text-center'>
              <h1>Welcome Back</h1>
              <h2>Log in to continue you job journey</h2>
            </div>
            <form onSubmit={handleSubmit} className='flex justify-center items-center '>
              <Input type='email' name='email' value={userData?.email} placeholder='Email' onChange={inputChange} />
              <Input type='password' name='password' value={userData?.password} placeholder='Password' onChange={inputChange} />
              <div>

                <button disabled={disable} className='auth-button animated-pulse'>
                  <p>{isLoading ? "Signing you in..." : "Sign-In"}</p>
                </button>

              </div >
            </form>
            <div>Does'nt have an Account! <Link to={'/signup'} className='text-blue-500'> Sign-Up here</Link></div>
          </section>
        </div>
        <Toaster />
      </main>
      )
}

      export default SignIn
