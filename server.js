import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Import OpenAI (assuming no Configuration object is needed)
import fs from 'fs';
import multer from 'multer';

dotenv.config();

const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        console.log('file', file);
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file');
let filePath; // Declare filePath variable here

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }

        filePath = req.file.path; // Assign value to filePath here
        // Continue with your route logic
    });
});

app.post('/images', async (req, res) => {
    try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Initialize OpenAI with API Key directly
        const response = await openai.images.generate({
            prompt: req.body.message,
            n: 3,
            size: "1024x1024",
        });
        console.log(response);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

app.post('/variations', async (req, res) => {
    try {
      const { n } = req.body; // Get the value of n from the request body
      if (!filePath) {
        return res.status(400).json({ error: "No image file uploaded." });
      }
  
      const openai = new OpenAI();
      const variationResponse = await openai.images.createVariation({
        image: fs.createReadStream(filePath),
        n: n || 1 // Use the value of n from the request body, default to 1 if not provided
      });
  
      console.log(variationResponse.data); // Check the response in console
      res.send(variationResponse.data); // Send the response to the client
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while processing your request." }); // Return JSON error response
    }
  });
  


app.listen(PORT, () => console.log("Your server is running on PORT: " + PORT));
