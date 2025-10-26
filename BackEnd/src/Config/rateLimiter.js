import rateLimit from "express-rate-limit";


const limiter = rateLimit({
    windowMs:  5 * 60 * 1000,
    max:3,
    message:"can't analyze more than 3 resume in short amount of time! try after some time"
})

export default limiter