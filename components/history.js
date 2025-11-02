// Renderiza os dados que recebe via `props`

export default function History({ history, onClear, onExport}) {
    // Se não houver histórico, não renderiza nada.
    if (history.length === 0) {
        return null;
    }

    return (
        <div className="mt-8 pt-6 border-t border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4">Histórico</h2>
            <ul className="space-y-2">
                {history.map((item) => (
                    <li key={item.id} className="p-3 bg-gray-700 rounded-lg flex justify-between items-center">
                        <span className="text-gray-300">{item.category}</span>
                        <span className="text-white font-mono">{item.from} → {item.to}</span>
                    </li>
                ))}
            </ul>

            {/* Botões de ação do histórico */}
            <div className="mt-4 flex gap-4">
                <button onClick={onExport} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Exportar (CSV)
                </button>
                <button onClick={onClear} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Limpar Histórico
                </button>
            </div>
        </div>
    );
}