module.exports = function getIrrigationAdvice(temp) {
    if (temp > 30) return "Irrigação moderada";
    if (temp >= 20) return "Não irrigar";
    return "Irrigação URGENTE";
};