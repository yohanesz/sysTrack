import psList from 'ps-list';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 4000;

// Usando import.meta.url para definir o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Função para pegar os processos
async function getProcesses() {
    try {
        const processes = await psList();
        return processes.map(proc => ({
            pid: proc.pid,
            name: proc.name,
            cpu: proc.cpu,
            memory: proc.memory,
        }));
    } catch (error) {
        console.error("Erro ao obter processos:", error);
        return [];
    }
}

// Rota para obter os processos
app.get('/api/processes', async (req, res) => {
    try {
        const processes = await getProcesses();
        res.json(processes); // Envia os processos como JSON
    } catch (error) {
        res.status(5000).json({ error: "Erro ao obter processos", details: error.message });
    }
});
