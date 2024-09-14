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