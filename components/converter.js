// Gerencia o estado da UI e chama a lógica de conversão.

import { useState, useEffect } from 'react';
import { convertValue, CONVERSION_UNITS } from '../utils/conversionLogic';
import History from './history';
import { exportToCSV } from '../utils/exportUtils';

export default function Converter() {
    // Estados para gerenciar a aplicação
    const [category, setCategory] = useState('Comprimento');
    const [inputValue, setInputValue] = useState('1');
    const [fromUnit, setFromUnit ] = useState ('Metros');
    const [toUnit, setToUnit] = useState('Pes');
    const [outputValue, setOutputValue] = useState('');
    const [history, setHistory] = useState([]); //Array para guardar o histórico

    const units = CONVERSION_UNITS[category] || {}; 

    // useEffect é usado para recalcular sempre que uma dependência mudar.
    // Isso torna a UI reativa.
    useEffect(() => {
        const result = convertValue(parseFloat(inputValue), fromUnit, toUnit, category);
        setOutputValue(result);
    }, [inputValue, fromUnit, toUnit, category]);

    // Função para lidar com a troca de categoria
    const handleCategoryChange = (e) => {
        const NewCategory = e.target.value;
        setCategory(NewCategory);

        // Reseta as unidades para as padrões da nova categoria para evitar estados inválidos
        const newUnits = Object.keys(CONVERSION_UNITS[NewCategory]);
        setFromUnit(newUnits[0]);
        setToUnit(newUnits[1] || newUnits[0]);
        setInputValue('1');
    };

    // Adiciona a conversão atual ao histórico
    const handleAddToHistory = () => {
        if (inputValue && outputValue) {
            const newEntry = {
                id: Date.now(), // Chave única para cada item
                from: `${inputValue} ${fromUnit}`,
                to: `${outputValue} ${toUnit}`,
                category: category,
            };
            // Adiciona a nova entrada da lista
            setHistory([newEntry, ...history]);
        }
    };

    // Limpa o histórico
    const handleClearHistory = () => {
        setHistory([]);
    };

    return (
        <div className="p-8 max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-white mb-6">Conversor Universal</h1>

            {/* Seleção de Categoria */}
            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
                <select id="category" value={category} onChange={handleCategoryChange} className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {Object.keys(CONVERSION_UNITS).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Inputs de Conversão */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                    <label htmlFor="input-value" className="block text-sm font-medium text-gray-300 mb-2">Valor</label>
                    <input type="number" id="input-value" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"/>
                </div>

                <div>
                    <label htmlFor="from-unit" className="block text-sm font-medium text-gray-300 mb-2">De</label>
                    <select id="from-unit" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600">
                        {Object.keys(units).map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="to-uniit" className="block text-sm font-medium text-gray-300 mb-2">Para</label>
                    <select id="to-unit" value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600">
                        {Object.keys(units).map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Resultado */}
            <div className="mt-6 text-center">
                <p className="text-gray-400">Resultado</p>
                <p className="text-4xl font-bold text-indigo-400">{outputValue}</p>
            </div>

            {/* Resultado */}
            <div className="mt-6 flex justify-center">
                <button onClick={handleAddToHistory} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Salvar no Histórico
                </button>
            </div>

            {/* Componente de Histórico */}
            <History
            history={history}
            onClear={handleClearHistory}
            onExport={() => exportToCSV(history, 'historico-conversoes.csv')}
            />
        </div>
    );
}
