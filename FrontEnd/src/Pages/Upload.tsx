import { useState, type FormEvent, } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Navbar from '../ReuseableComponents/Navbar'
import TextLoader from '../ReuseableComponents/TextLoader';
import ResumeUploadForm from '../FeatureComponents/ResumeUploadForm';

import useResumeContext from '../Context/FeedbackContext/useResumeFeedbackContext.tsx';
import useDisableContext from '../Context/ButtonDisableContext/UseDisableContext.tsx';

const API_URL = import.meta.env.VITE_API_URL;

interface ResumeDetails {
  companyName: string,
  jobTitle: string
}

interface ApiResponse {
  content: string
}

const Upload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [resumeDetails, setResumeDetails] = useState<ResumeDetails>({ companyName: "", jobTitle: "" });
  const navigate = useNavigate()

  const { disableButton } = useDisableContext();

  const { setFeedback } = useResumeContext();

  const postResume = async (formData: FormData) => {
    const { data } = await axios.post<ApiResponse>(`${API_URL}/api/analyze/analyze-resume`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    });

    return data;
  }



  const { mutate, isPending } = useMutation({
    mutationKey: ['postResume'],
    mutationFn: postResume,
    onSuccess: (data) => {
      try {
        const parseFeedback = JSON.parse(data.content)
        setFeedback(parseFeedback);
        toast.success("success analyzed")
        navigate("/feedback")
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message || 'Invalid response format from server.');
        }
        toast.error('Invalid response format from server.');
      }
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.response?.data || "failed to analyze the resume")
      } else {
        toast.error("Something went wrong please try again!")
      }
    }
  })

  const handleSubmit = async (eve: FormEvent<HTMLFormElement>) => {
    eve.preventDefault();
    if (!file) return toast.error("Attache a resume file.")

    const form: HTMLFormElement | null = eve.currentTarget.closest("form");
    if (!form) return;

    const formData = new FormData(form);
    const jobDescription = formData.get("job-description") as string;

    if (!jobDescription) return toast.error('Please provide a job description.');
    if (jobDescription.length > 200) return toast.error("Your description should less than 200 letters");

    if (!resumeDetails.companyName || !resumeDetails.jobTitle) return toast.error("Fill all the information properly!")

    formData.append("companyName", resumeDetails.companyName)
    formData.append("jobTitle", resumeDetails.jobTitle)
    formData.append("jobDescription", jobDescription)
    formData.append("file", file)

    disableButton();

    mutate(formData)
  }





  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className='main-section '>
        <div className='page-heading'>
          <h1>Smart feedback for your dream</h1>

          {!isPending ? (
            <>
              <h2>Drop your resume for an ATS score and improvement!</h2>

              <ResumeUploadForm file={file} setFile={setFile} setResumeDetails={setResumeDetails} handleSubmit={handleSubmit} />
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
