import { Link, Navigate, useLocation } from "react-router-dom"
import Summary from "../FeatureComponents/Summary";
import Details from "../FeatureComponents/Details";

const Feedback = () => {

  const state = useLocation();
  const feedback = state?.state?.content

  if(!feedback){
    return <Navigate to={'/upload'}/>
  }

  return (
    <main className="!pt-0">
      <nav className="resume-nav sticky top-0 z-10 bg-white">
        <h1 >Resume Review</h1>
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
        </Link>
      </nav>
      
      <section className="flex flex-col lg:flex-row w-full md:flex-col sm:flex-col xs:flex-col z-5 ">
        <section className=" bg-cover   relative  items-center justify-center">
          <section className=" flex w-full  rounded-xl p-3 bg-[url('/images/bg-small.svg')] sticky top-[108px]">
            <Summary feedback={feedback} />
          </section>
        </section>
        <section className="feedback-section ">
          <Details feedback={feedback} />
        </section>
      </section>
    </main>
  )
}

export default Feedback
