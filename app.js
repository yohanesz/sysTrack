import psList from 'ps-list';
import express from 'express';
import cors from 'cors';
import os from 'os';
import oss from 'os-utils';
import { exec } from 'child_process';
import dotenv from "dotenv";
import { group } from 'console';
import { stderr } from 'process';

dotenv.config();

const app = express();
const port = 5000;
app.use(cors());


async function getProcesses() {
    try {
        const processes = await psList();
        // Filtra processos que não possuem um terminal (não são processos em segundo plano)
        const filteredProcesses = processes.filter(proc => proc.memory > 0 || proc.cpu > 0);
        
        return filteredProcesses.map(proc => ({
            pid: proc.pid,
            name: proc.name,
            cpu: proc.cpu,
            memory: proc.memory,
        }));

    } catch (error) {
        console.log(error.message);
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

app.post('/api/kill/:pid', (req, res) => {
    const pid = req.params.pid;
    // const senha = process.env.USER_PASSWORD;

    if (!pid) {
        return res.status(400).json({ error: 'PID não fornecido' });
    }

    exec(`kill ${pid}`, (error, stdout, stderr) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }

        res.json({ message: `Processo ${pid} encerrado com sucesso.` });
    });
});

app.post('/api/chmod/:user/:group/*', (req, res) => {
    let { user, group} = req.params;
    let dir = req.params[0];

    user = user === 'null' ? '' : user;
    group = group === 'null' ? '' : group;

    const comando = `chmod u=${user},g=${group} ${process.env.HOME}/${dir}`;
    

    exec(comando, (error, stdout, stderr) => {
        if (error) {
            console.error(`ERRO: ${error.message}`);
            return res.json({ error: error.message });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.json({ error: stderr });
        }

        console.log(`Comando [${comando}] executado com sucesso.`);
        res.json({ message: `Comando [${comando}] executado com sucesso.` });
    });
});




app.listen(process.env.PORTA, () => {
    console.log(`API rodando em http://localhost:${process.env.PORTA}`);
});
