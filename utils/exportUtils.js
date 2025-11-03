// Função isolada para lidar com a lógica de exportação para CSV

// Converte um array de objetos para uma string CSV.
function convertToCSV(data) {
    const headers = Object.keys(data[0]);
    const headerRow = headers.join(',');

    const rows = data.map(obj => {
        return headers.map(header => {
            // Garante que valores com vírgula sejam encapsulados em aspas
            const value = String(obj[header]);
            return value.includes(',') ? `"${value}"` : value;
        }).join(',');
    });

    return [headerRow, ...rows].join('\n');
}

// Função que cria um link de download para o arquivo CSV
export function exportToCSV (data, filename) {
    if (data.length === 0) {
        alert("O histórico está vazio!");
        return;
    }

    const csvString = convertToCSV(data);
    const blob = new Blob([csvString], {type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
