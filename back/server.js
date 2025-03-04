import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Gemini API

dotenv.config();
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Gemini setup with proper API version
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelInstance = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

app.get("/", (req, res) => {
  res.send("Welcome to the Pitchwave Chat API!");
});

app.post("/chat", async (req, res) => {
  try {
    const { message, model } = req.body;
    console.log("Incoming Request:", req.body); // Debug incoming data

    if (!message) {
      return res.status(400).json({ error: "Message parameter is required." });
    }

    let reply = "No response from AI.";

    if (model === "gemini") {
      console.log("GenAI initialized successfully.");

      try {
        const chat = await modelInstance.startChat({ history: [] });
        const response = await chat.sendMessage(message);

        console.log("Gemini Response:", response); // Debug Gemini API response
        reply = response.response.text() || reply;
      } catch (geminiError) {
        console.error("Gemini API Error:", geminiError);
        return res.status(500).json({ error: "Gemini API request failed." });
      }
    }

    console.log("Final Reply:", reply);
    res.json({ reply });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
