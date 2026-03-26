/**
 * ================================================================
 * Arquivo: server.test.js
 * Descrição: Testes de integração básicos da rota /irrigation
 *
 * Autor: Denvx
 * Data de criação: 25/03/2026
 *
 * Tecnologias utilizadas:
 *  - Jest → framework de testes
 *  - Supertest → testes de requisições HTTP
 *
 * Objetivo dos testes:
 *  Validar o funcionamento geral da rota principal da API,
 *  garantindo que o servidor responde corretamente e retorna
 *  os dados esperados.
 *
 * Estratégia:
 *  O serviço externo de clima é mockado para evitar chamadas
 *  reais à internet e garantir previsibilidade nos testes.
 *
 * O que é validado:
 *  ✔ Status HTTP da resposta
 *  ✔ Presença dos campos essenciais no JSON retornado
 * ================================================================
 */

const request = require("supertest");
const app = require("../server");

/**
 * Mock do serviço externo de clima.
 * Sempre retorna temperatura fixa para estabilizar os testes.
 */
jest.mock("../services/weatherService", () => {
    return jest.fn(() => Promise.resolve({ temperature: 32 }));
});

/**
 * Suite de testes da rota GET /irrigation
 */
describe("Testes de integração - Endpoint /irrigation", () => {

    /**
     * Verifica se o endpoint responde com sucesso.
     */
    test("Deve retornar status HTTP 200", async () => {
        const res = await request(app)
            .get("/irrigation?lat=-12&lon=-38");

        expect(res.statusCode).toBe(200);
    });

    /**
     * Verifica se o JSON retornado contém os dados essenciais.
     */
    test("Deve retornar JSON com temperature e advice", async () => {
        const res = await request(app)
            .get("/irrigation?lat=-12&lon=-38");

        expect(res.body.temperature).toBeDefined();
        expect(res.body.advice).toBeDefined();
    });

});