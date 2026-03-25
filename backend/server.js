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

    try {
        const weather = await getWeather(lat, lon);
        const advice = getIrrigationAdvice(weather.temperature);

        
        res.json({
            temp: weather.temp,
            advice: advice
        });

    } catch (error) {
        
        res.json({ erro: "falha interna" });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

module.exports = app;