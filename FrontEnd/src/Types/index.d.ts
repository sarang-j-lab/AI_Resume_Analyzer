interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: Feedback;
}

interface Tip {
  type: "good" | "improve",
  tip: string, //give 3-4 tips, //make it a short "title" for the actual explanation
  explanation?: string //explain in detail here
}

interface Feedback {
  overallScore: number; //max 100
  companyOverview: {
    name: string;
    summary: string; // 2-4 lines about the company
    industry: string;
    keyPoints: string[]; // 3-5 bullet points about company reputation, culture, products
  };
  ATS: {
    score: number; //rate based on ATS suitability
    tips: Tip[];
  };
  toneAndStyle: {
    score: number; //max 100
    tips: Tip[]; //give 3-4 tips
  };
  content: {
    score: number; //max 100
    tips: Tip[]; //give 3-4 tips
  };
  structure: {
    score: number; //max 100
    tips: Tip[]; //give 3-4 tips
  };
  skills: {
    score: number; //max 100
    tips: Tip[]; //give 3-4 tips
  }
}