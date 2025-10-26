import React, { type ChangeEvent, type FormEvent } from 'react'
import toast from 'react-hot-toast';
import useDisableContext from '../Context/ButtonDisableContext/UseDisableContext.tsx';

interface FormProps {
    handleSubmit: (eve: FormEvent<HTMLFormElement>) => void,
    setFile: (file: File | null) => void,
    file: File | null,
    setResumeDetails: React.Dispatch<React.SetStateAction<{ companyName: string, jobTitle: string }>>
}

const ResumeUploadForm = ({ handleSubmit, setResumeDetails, setFile, file }: FormProps) => {


    const { disable } = useDisableContext();

    const onFileChange = async (eve: React.ChangeEvent<HTMLInputElement>) => {
        if (eve.target.files && eve.target.files[0].type !== "application/pdf") {
            toast.error("Input file should in the PDF format only!");
            eve.target.value = ""
            return;
        }
        if (eve?.target?.files && eve?.target?.files[0]) {
            setFile(eve?.target?.files[0])
        }
    }

    const handleInputChange = (eve: ChangeEvent<HTMLInputElement>) => {

        setResumeDetails(pre => {
            return { ...pre, [eve.target.id]: eve.target.value }
        })
    }

    return (
        <form encType="multipart/form-data" id='upload-form' onSubmit={handleSubmit} className='flex flex-col justify-center gap-4 mt-8 mb-8'>
            <div className='form-div'>
                <label htmlFor="company-name">Company name</label>
                <input type="text" onChange={handleInputChange} name="company-name" id="companyName" placeholder='Company Name' required />
            </div>
            <div className='form-div'>
                <label htmlFor="job-title">Job Title</label>
                <input type="text" onChange={handleInputChange} name="job-title" id="jobTitle" placeholder='Job title' required />
            </div>
            <div className='form-div'>
                <label htmlFor="job-description">Job description</label>
                <textarea rows={5} name="job-description" id="jobDescription" placeholder='Job Description' required></textarea>
            </div>
            <div className='form-div'>
                <label htmlFor="job-description">Click here to Upload Resume PDF (less than 1MB)</label>
                <div className=' form-div w-[50%] h-[80px] flex-row items-center w-full p-4 inset-shadow rounded-2xl focus:outline-none bg-white'>
                    {!file ? <input type="file" accept='application/pdf' id='file' onChange={onFileChange} required />
                        :
                        <>
                            <p className='w-[100%] text-[1.5rem] text-gray-600'>{file?.name}</p>
                            <img src="/images/pdf.png" width={'50px'} alt="" />
                            <button type='button' onClick={() => setFile(null)} className='w-[10%]'><strong>X</strong></button>
                        </>
                    }
                </div>
            </div>

            <button disabled={disable} className="primary-button" type='submit'>
                Analyze Resume
            </button>
        </form>
    )
}

export default ResumeUploadForm
