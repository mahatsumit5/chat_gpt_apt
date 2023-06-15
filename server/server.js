import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    message: "hellow from codex",
  });
});

app.post("/complete", async (req, res) => {
  try {
    console.log(req.body);
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 1,
      max_tokens: 3000,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });
    const data = await response.data;
    res.send({
      messsage: prompt,
      data,
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(8000, () =>
  console.log(`server is running on port http://localhost/8000`)
);
