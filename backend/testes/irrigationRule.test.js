/**
 * ================================================================
 * Arquivo: irrigationRule.test.js
 * Descrição: Testes unitários da regra de negócio de irrigação
 *
 * Autor: Denvx
 * Data de criação: 25/03/2026
 *
 * Tecnologias utilizadas:
 *  - Jest → framework de testes unitários
 *
 * Objetivo dos testes:
 *  Validar se a função responsável por gerar recomendações de
 *  irrigação retorna o conselho correto com base na temperatura.
 *
 * Regras esperadas do sistema (definidas na atividade):
 *  • Temperatura 35°C → Irrigação URGENTE
 *  • Temperatura 25°C → Irrigação moderada
 *  • Temperatura 10°C → Não irrigar
 *
 * Estes testes validam a regra de negócio isoladamente,
 * sem dependência de API ou servidor.
 * ================================================================
 */

const getAdvice = require("../utils/irrigationRule");

/**
 * Suite de testes da regra de irrigação
 */
describe("Testes unitários - Regra de Irrigação", () => {

    /**
     * Temperaturas muito altas exigem irrigação urgente.
     */
    test("Temperatura 35°C → Irrigação URGENTE", () => {
        expect(getAdvice(35)).toBe("Irrigação URGENTE");
    });

    /**
     * Temperaturas moderadas exigem irrigação moderada.
     */
    test("Temperatura 25°C → Irrigação moderada", () => {
        expect(getAdvice(25)).toBe("Irrigação moderada");
    });

    /**
     * Temperaturas baixas não exigem irrigação.
     */
    test("Temperatura 10°C → Não irrigar", () => {
        expect(getAdvice(10)).toBe("Não irrigar");
    });

});