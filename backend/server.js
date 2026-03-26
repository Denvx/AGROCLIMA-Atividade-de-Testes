const express = require("express");
const cors = require("cors");
const path = require("path");

const getWeather = require("./services/weatherService");
const getIrrigationAdvice = require("./utils/irrigationRule");

const app = express();
app.use(cors());

// serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/irrigation", async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ erro: "Parâmetros lat e lon são obrigatórios" });
    }

    try {
        const weather = await getWeather(lat, lon);
        const advice = getIrrigationAdvice(weather.temperature);

        
        res.json({
            temperature: weather.temperature,
            advice: advice
        });

    } catch (error) {
        
        res.status(500).json({ erro: "falha interna" });
    }
});

if (process.env.NODE_ENV !== "test") {
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
    });
}

module.exports = app;