import fs from "fs";
import axios from "axios";
import { prepareInstructions } from "../Constant/prompt.js";



export const anaylyzeResume = async (req, res, next) => {
    try {
        const { companyName, jobTitle, jobDescription } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "Please Insert file!" })
        }

        if (!companyName || !jobTitle || !jobDescription) {
            return res.status(400).json({ message: 'Please fill the details!' })
        }

        const binaryFileToBase64Str = convertIntoBase64(file.path)

        fs.unlink(file.path, (err) => { })


        const prompt = prepareInstructions({ jobTitle, jobDescription, companyName });

        const payload = {
            contents: [{
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            mimeType: "application/pdf",
                            data: binaryFileToBase64Str
                        }
                    }
                ]
            }],
            systemInstruction: {
                parts: [{ text: prompt }]
            },
        }


        const response = await axios.post(process.env.GEMINI_API_URL, JSON.stringify(payload), {
            headers: {
                "Content-Type": "application/json",
            },
        })



        const candidate = response.data?.candidates?.[0];
        if (candidate && candidate.content?.parts?.[0]?.text) {
            const analysisText = candidate.content.parts[0].text;

            return res.status(200).json({ message: "successfull", content: analysisText })
        } else {
            return res.status(500).json({ message: "Could not retrieve analysis!" });
        }
    } catch (error) {
        console.log(error)
        next(error);
    }
}


function convertIntoBase64(filePath) {
    const fileData = fs.readFileSync(filePath);
    const base64String = fileData.toString("base64");
    return base64String;
}

