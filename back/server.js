import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5001;
 // You can change this

app.use(
  cors({
    origin: ["https://chatai-1-2enq.onrender.com"], // Allow your frontend
    methods: ["GET", "POST"], // Allow necessary HTTP methods
    credentials: true, // Allow cookies (if needed)
  })
);

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API Endpoint to handle chat requests
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} :)`);
});
