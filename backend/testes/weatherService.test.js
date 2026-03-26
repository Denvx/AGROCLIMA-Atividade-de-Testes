/**
 * ================================================================
 * Arquivo: weatherService.test.js
 * Descrição: Testes unitários do serviço de clima (weatherService)
 *
 * Autor: Denvx
 * Data de criação: 25/03/2026
 *
 * Tecnologias utilizadas:
 *  - Jest → framework de testes
 *
 * Objetivo dos testes:
 *  Validar se o serviço de clima interpreta corretamente a resposta
 *  da API externa Open-Meteo.
 *
 * Estratégia:
 *  A biblioteca Axios é MOCKADA para evitar chamadas reais à internet,
 *  garantindo testes rápidos, previsíveis e independentes de serviços externos.
 *
 * O que é testado:
 *  ✔ Parsing correto do JSON retornado pela API
 *  ✔ Extração correta da temperatura
 * ================================================================
 */

const axios = require("axios");
const getWeather = require("../services/weatherService");

/**
 * Mock da biblioteca Axios.
 * Substitui requisições HTTP reais por respostas simuladas.
 */
jest.mock("axios");

/**
 * Suite de testes do Weather Service
 */
describe("Testes unitários - Weather Service", () => {

    /**
     * Testa se a temperatura é extraída corretamente
     * da estrutura JSON retornada pela API externa.
     *
     * Estrutura esperada da API:
     * data.current_weather.temperature
     */
    test("Deve retornar temperatura corretamente", async () => {

        // Simulação da resposta da API externa
        axios.get.mockResolvedValue({
            data: {
                current_weather: {
                    temperature: 28
                }
            }
        });

        // Execução da função testada
        const result = await getWeather(-12, -38);

        // Validação do resultado esperado
        expect(result.temperature).toBe(28);
    });

});