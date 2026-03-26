/**
 * ================================================================
 * Arquivo: integration.test.js
 * Descrição: Testes de integração da rota /irrigation da API AgroClima
 *
 * Autor: Denvx
 * Data de criação: 25/03/2026
 *
 * Tecnologias utilizadas:
 *  - Jest → framework de testes
 *  - Supertest → testes de requisições HTTP
 *
 * Objetivo dos testes:
 *  Validar o comportamento da rota /irrigation sem depender da API externa.
 *  Para isso, o serviço de clima é MOCKADO (simulado).
 *
 * O que é testado:
 *  ✔ Status HTTP da resposta
 *  ✔ Retorno em formato JSON
 *  ✔ Estrutura dos dados retornados
 *  ✔ Tratamento de erro quando faltam parâmetros obrigatórios
 * ================================================================
 */

const request = require("supertest");
const app = require("../server");

/**
 * Mock do serviço externo de clima.
 *
 * Em testes automatizados NÃO devemos depender de internet ou APIs reais,
 * pois isso tornaria os testes lentos e instáveis.
 *
 * Aqui simulamos o retorno do weatherService com temperatura fixa = 32°C.
 */
jest.mock("../services/weatherService", () => {
    return jest.fn(() => Promise.resolve({ temperature: 32 }));
});

/**
 * Suite de testes da rota GET /irrigation
 */
describe("Testes de integração - Rota /irrigation", () => {

    /**
     * Testa se a rota responde corretamente sem erros internos.
     * Esperado: Status HTTP 200 (OK)
     */
    test("Rota responde com status 200", async () => {
        const response = await request(app)
            .get("/irrigation?lat=-12&lon=-38");

        expect(response.statusCode).toBe(200);
    });

    /**
     * Testa se o servidor retorna dados no formato JSON.
     * Isso garante que a API segue o padrão REST esperado.
     */
    test("Resposta deve estar no formato JSON", async () => {
        const response = await request(app)
            .get("/irrigation?lat=-12&lon=-38");

        expect(response.headers["content-type"]).toContain("json");
    });

    /**
     * Testa se o corpo da resposta possui os campos essenciais.
     * Campos esperados:
     *  - temperature → temperatura obtida do serviço de clima
     *  - advice → recomendação de irrigação baseada na regra de negócio
     */
    test("Resposta deve conter temperatura e conselho de irrigação", async () => {
        const response = await request(app)
            .get("/irrigation?lat=-12&lon=-38");

        expect(response.body.temperature).toBeDefined();
        expect(response.body.advice).toBeDefined();
    });

    /**
     * Testa comportamento quando parâmetros obrigatórios não são enviados.
     * A API deve retornar um objeto de erro.
     */
    test("Sem parâmetros deve retornar mensagem de erro", async () => {
        const response = await request(app).get("/irrigation");

        expect(response.body.erro).toBeDefined();
    });

});