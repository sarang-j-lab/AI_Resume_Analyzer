import ScoreCircle from '../FeatureComponents/ScoreCircle.tsx'

const ResumeCard = ({ resume: { companyName, jobTitle, feedback ,imagePath} }: { resume: Resume }) => {
    return (
        <section  className='resume-card animate-in fade-in duration-1000'>
            <div className="resume-card-header">

                <div className="flex flex-col gap2">
                    <h2 className="!text-black font-bold break-words">{companyName}</h2>
                    <h2 className="text-lg text-gray-500 break-words">{jobTitle}</h2>
                </div>
                <div className='flex-shrink-0'>
                    <ScoreCircle score={feedback?.overallScore} />
                </div>
            </div>
            <div className='gradient-border animate-in fade-in duration-1000'>
                <div className='w-full h-full'>
                    <img src={imagePath} alt='resume' className='w-full h-[350px] max-s:h-[200px] object-cover object-top'/>
                </div>
            </div>
        </section>
    )
}

export default ResumeCard
