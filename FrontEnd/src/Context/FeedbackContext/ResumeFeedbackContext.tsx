import React, {createContext} from 'react';

interface ResumeContext {
    feedback: Feedback | null,
    setFeedback: React.Dispatch<React.SetStateAction<Feedback | null>>,
}

const ResumeFeedbackContext = createContext<ResumeContext | undefined>(undefined);

export default ResumeFeedbackContext;