import { Link, Navigate } from "react-router-dom"
import Summary from "../FeatureComponents/Summary";
import Details from "../FeatureComponents/Details";
import useResumeContext from "../Context/FeedbackContext/useResumeFeedbackContext.tsx";

const Feedback = () => {

  const { feedback } = useResumeContext();

  if (!feedback) {
    return <Navigate to={'/upload'} />
  }
  return (
    <main className="!pt-0">
      <nav className="resume-nav  sticky top-0 z-10 bg-white h-[15vh]">
        <Link to={'/'}> <h1 className="w-full cursor-pointer" >Resume Review</h1></Link>
      </nav>

      <section className="flex flex-col lg:flex-row w-full md:flex-col sm:flex-col xs:flex-col z-5 ">
        <section className=" bg-cover   relative  items-center justify-center">
          <section className=" flex w-full  rounded-xl p-3 bg-[url('/images/bg-small.svg')] sticky top-[108px] ">
            <Summary feedback={feedback} />
          </section>
        </section>
        <section className="feedback-section">
          <Details feedback={feedback} />
        </section>
      </section>
    </main>
  )
}

export default Feedback
