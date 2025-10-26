import fs from "fs";
import axios from "axios";
import { prepareInstructions } from "../Constant/prompt.js";



export const anaylyzeResume = async (req, res) => {
    try {
        const { companyName, jobTitle, jobDescription } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "Please Insert file!" })
        }

        if (!companyName || !jobTitle || !jobDescription) {
            return res.status(400).json({ message: 'Please fill the details!' })
        }

        if (!file.mimetype.includes("pdf")) {
            return res.status(400).json({ message: "File should be in PDF format!" })
        }

        const binaryFileToBase64Str = convertIntoBase64(file.path)

        fs.unlink(file.path, (err) => { })


        const prompt = prepareInstructions({ jobTitle, jobDescription });

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
        return res.status(500).json({ message: "Internal Server Error! please try after some time." });
    }
}


function convertIntoBase64(filePath) {
    const fileData = fs.readFileSync(filePath);
    const base64String = fileData.toString("base64");
    return base64String;
}

