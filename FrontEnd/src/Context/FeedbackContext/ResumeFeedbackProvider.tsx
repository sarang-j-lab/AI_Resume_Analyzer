import {   useState, type ReactNode } from "react";
import ResumeFeedbackContext from "./ResumeFeedbackContext";



const ResumeFeedbackProvider = ({ children }: { children: ReactNode }) => {
    const [feedback, setFeedback] = useState<Feedback | null>(null);


    return (
        <ResumeFeedbackContext.Provider value={{ feedback, setFeedback, }}>
            {children}
        </ResumeFeedbackContext.Provider>
    )
}




export default ResumeFeedbackProvider;