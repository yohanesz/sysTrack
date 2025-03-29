import psList from 'ps-list';
import express from 'express';
import cors from 'cors';
import os from 'os';
import oss from 'os-utils';


const app = express();
const port = 5000;
app.use(cors());

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

app.get('/api', async (req, res) => {
    try {
        const processes = await getProcesses();
        res.json(processes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao obter processos", details: error.message });
    }
});

app.get('/api/system-info', (req, res) => {
    const totalMem = os.totalmem(); // Memória total em bytes
    const freeMem = os.freemem();   // Memória livre em bytes
    const usedMem = totalMem - freeMem; // Memória usada em bytes

    // Usar os-utils para pegar o uso da CPU
    oss.cpuUsage(function(cpuUsage) {
        res.json({
            totalMemGB: (totalMem / (1024 ** 3)).toFixed(2), // Total de memória em GB
            freeMemGB: (freeMem / (1024 ** 3)).toFixed(2),   // Memória livre em GB
            usedMemGB: (usedMem / (1024 ** 3)).toFixed(2),   // Memória usada em GB
            ramUsagePercent: ((usedMem / totalMem) * 100).toFixed(2), // Percentual de memória usada
            cpuUsagePercent: (cpuUsage * 100).toFixed(2), // Percentual de uso da CPU
        });
    });
});





app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
