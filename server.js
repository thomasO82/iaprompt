const express = require('express');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require('openai');
const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


app.listen(3012, () => console.log('Server started on port 8080'));


app.post('/api', async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
            response_format: "b64_json",
        });
        const image = response.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la génération de l'image" });
    }
});

