
import ScoreBadge from "./ScoreBadge";
import ScoreCircle from "./ScoreCircle";

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-green-600'
        : score > 49
            ? 'text-yellow-600' : 'text-red-600';

    return (
        <div className="resume-summary ">
            <div className="category">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <p className="text-xl">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-xl">
                    <span className={textColor + " font-bold"}>{score}</span>/100
                </p>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex items-center">
                <ScoreCircle score={feedback.ATS.score} />
                <div className="flex flex-col gap-4">
                    <h2 className="!text-xl font-bold">Your Resume Score</h2>
                    <p className="text-xs text-gray-500">The score is calculated based on variable listed below</p>
                </div>
            </div>

            <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
            <Category title="Content" score={feedback.content.score} />
            <Category title="Structure" score={feedback.structure.score} />
            <Category title="Skills" score={feedback.skills.score} />
        </div>
    )
}
export default Summary
