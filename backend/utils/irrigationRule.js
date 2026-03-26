module.exports = function getIrrigationAdvice(temp) {
    if (temp >= 35) return "Irrigação URGENTE";
    if (temp >= 25) return "Irrigação moderada";
    if (temp >= 10) return "Não irrigar";
    return "Irrigação URGENTE";
};