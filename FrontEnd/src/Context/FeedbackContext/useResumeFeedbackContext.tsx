import { useContext } from "react";
import ResumeFeedbackContext from "./ResumeFeedbackContext.jsx";

const useResumeContext = () => {
    const context = useContext(ResumeFeedbackContext);
    if (!context) {
        throw new Error("useResumeFeedback must be used within a ResumeFeedbackProvider")
    }
    return context;
}


export default useResumeContext;