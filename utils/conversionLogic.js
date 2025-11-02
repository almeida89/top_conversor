// Objeto que armazena todas as nossas catergorias e suas unidades.
// A estrutura é: { categoria: { unidade: fator_para_base, ...}}
// A primeira unidade de cada categoria é considerada a "base".

export const CONVERSION_UNITS = {
    Comprimento: {
        Metros: 1,
        Quilometros: 1000,
        Milhas: 1609.34,
        Pes: 0.3048,
    },
    Peso: {
        Gramas: 1,
        Quilogramas: 1000,
        Libras: 453.592,
        Oncas: 28.3495,
    },
    Temperatura: {
        Celsius: 'celsius', // Casos especiais como temperatura precisam de tratamento diferente.
        Fahrenheit: 'fahrenheit',
        Kelvin: 'kelvin',
    },
};

// Função principal que realiza a conversão.
export function convertValue(value, fromUnit, toUnit, category) {
    if (isNaN(value)) return ''; // Retorna vazio se o input não for um número.   

    const units = CONVERSION_UNITS[category];
    if (!units) return ''; // Categoria inválida.

    // Lógica especial para temperatura.
    if (category === 'Temperatura') {
        let tempInCelsius;

        // Primeiro, converte o valor de entrada para Celsius (nossa base interna)
        if (fromUnit === 'Fahrenheit') {
            tempInCelsius = (value - 32) * (5 / 9);
        } else if (fromUnit === 'Kelvin') {
            tempInCelsius = value - 273.15;
        } else {
            tempInCelsius = value; // Já está em Celsius
        }

        // Agora, converte de Celsius para a unidade de saída desejada
        if (toUnit === 'Fahrenheit') {
            return (tempInCelsius * (9 / 5) + 32).toFixed(2);
        } else if (toUnit === 'Kelvin') {
            return (tempInCelsius + 273.15).toFixed(2);
        }
        return tempInCelsius.toFixed(2); // Saída em Celsius
    }

    // Lógica geral para outras categorias (comprimento, peso, etc.)
    const fromFactor = units[fromUnit];
    const toFactor = units[toUnit];

    // 1. Converte o valor de entrada para unidade base (fator 1).
    const valueInBaseUnit = value * fromFactor;
    // 2. Converte da unidade base para a unidade de saída.
    const result = valueInBaseUnit / toFactor;

    return result.toFixed(4); // Arredonda para 4 casas decimais para precisão.

}