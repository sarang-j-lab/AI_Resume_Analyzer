import { useState, type FormEvent, } from 'react'
import Navbar from '../ReuseableComponents/Navbar'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import TextLoader from '../ReuseableComponents/TextLoader';
import ResumeUploadForm from '../FeatureComponents/ResumeUploadForm';

const API_URL = import.meta.env.VITE_API_URL;

const Upload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null);


  const postResume = async (formData: FormData) => {
    const response = await axios.post(`${API_URL}/api/analyze/analyze-resume`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    });
    return response;
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ['postResume'],
    mutationFn: postResume,
    onSuccess: (data) => {
      setFeedback(data?.data?.content);
      toast.success("success analyzed")
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "failed to analyzed")
      } else {
        toast.error("Something went wrong please try again!")
      }
    }
  })

  const handleSubmit = async (eve: FormEvent<HTMLFormElement>) => {
    eve.preventDefault();
    const form: HTMLFormElement | null = eve.currentTarget.closest("form");
    if (!form) return;
    if (!file) {
      toast.error("Attache File")
      return;
    }

    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!companyName || !jobTitle || !jobDescription) {
      toast.error("Fill all the information properly!")
      return;
    }

    formData.append("companyName", companyName)
    formData.append("jobTitle", jobTitle)
    formData.append("jobDescription", jobDescription)
    formData.append("file", file)


    mutate(formData)
  }

  




  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className='main-section'>
        <div className='page-heading'>
          <h1>Smart feedback for your dream</h1>
          {!isPending ? (
            <>
              <h2>Drop your resume for an ATS score and improvement!</h2>
              <ResumeUploadForm file={file} setFile={setFile} handleSubmit={handleSubmit} />
            </>
          ) : (
            <>
              <TextLoader />
              <img src="/images/resume-scan.gif" width={"400px"} />
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default Upload
