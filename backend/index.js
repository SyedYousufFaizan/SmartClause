const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs")
            
require("dotenv").config()
const apiKey = process.env.MISTRAL_API_KEY;

let chatResponse = null;

const getMistralResponse = async (promptText) => {
  const { Mistral } = await import('@mistralai/mistralai');

  const client = new Mistral({
    apiKey: process.env.MISTRAL_API_KEY,
  });

  chatResponse = await client.chat.complete({
    model: 'mistral-medium',
    messages: [
      { role: 'user', content: promptText }
    ],
     completion_args: {
      "temperature": 0.0,
    },
  });

  return chatResponse; 
};

const app = express();
const port = 8080;

app.use(cors());
const upload = multer({ dest: "./uploads" });

app.get("/", (req, res) => {
  // console.log("GET /");
  res.send("Server is running!");
  
});

app.post("/api/upload", upload.single("contract"), async (req, res, next) => {

  //parsing the uploaded file
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ error: "No file was uploaded" });
  }
  //chencking for extention of the file
  const filePath = req.file.path
  const ext = req.file.originalname.split(".").pop().toLowerCase()
  let text = " "
  try{
    if (ext === "pdf"){
      const dataBuffer = fs.readFileSync(filePath)
      const pdfData = await pdfParse(dataBuffer);
      text = pdfData.text;
    } else if (ext === "docx") {
      const buffer = fs.readFileSync(filePath);
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (ext === "txt") {
      text = fs.readFileSync(filePath, "utf8");
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }
    res.json({text})
  }
  catch(err){
    console.log("parsing error,", err)
    res.status(400).json({ error: "Error parsing file " });
    next(err)
  }finally {
    //deleting the file after getting the parsed data
    fs.unlink(filePath, (err) => {
      if (err) console.error("Cleanup failed", err);
    });
  }
});

app.post("/api/analyzer", express.json() ,async(req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }
    
    const prompt = `
                      You are a legal contract reviewer. Analyze this contract text very thorougly, go through each clause carefully and identify any clauses that are risky, overly broad, or even somewhat unusual, and return them.

                      Respond strictly in **valid JSON format** with the following structure:

                      
                        contract_analysis {
                          "clauses": [
                             {
                              "clause": "text of the clause",
                              "risk": "why it is risky",
                              "risk_level": "low | medium | high",
                              "suggestion": "how to improve the clause"
                            },
                            { ... }
                          ],
                          "general_suggestions": [
                            "broad or overall suggestions to improve contract fairness, jurisdiction, clarity, etc."
                          ]
                        }
                        
                      

                      Ensure:
                      - You extract the full clause text.
                      - You dont leave out any flagged clauses 
                      - You do not include markdown, code formatting, or extra explanation outside the JSON object.

                      Contract Text:
                      """${text}"""
                  `;
    try {
    const response = await getMistralResponse(prompt);

    res.json({
      result: response.choices[0].message.content,
    });

  } catch (err) {
    console.error("Mistral error:", err);
    res.status(500).json({ error: "Analysis failed" });
  }

    })



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


//some minimal error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: `${err.message} | Please try again .`
  });
});


