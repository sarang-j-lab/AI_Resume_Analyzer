import React from 'react'
import Navbar from '../ReuseableComponents/Navbar'
import { resumes } from '../Constants/index.ts'
import ResumeCard from '../FeatureComponents/ResumeCard.tsx'
const Home = (): React.ReactElement => {

    return (
        <main className="bg-[url('/images/bg-main.svg')]">

            <Navbar />

            <section className='main-section'>
                <div className='page-heading'>
                    <h1>Track Your Application And Resume Ratings</h1>
                    <h2>Review your submissions and check AI-Powered feedback</h2>
                </div>

                {resumes.length > 0 && <div className='resumes-section'>
                    {resumes.map((resume)=>(
                        <ResumeCard key={resume?.id} resume={resume}/>
                    ))}
                </div>}
            </section>
        </main>
    )
}

export default Home
