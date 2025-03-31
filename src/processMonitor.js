import {exec} from 'child_process';

async function fetchProcesses() {
        const response = await fetch('http://localhost:5000/api');  // Alterado para a nova rota da API
        const data = await response.json();

        const processList = document.getElementById('processList');
        processList.innerHTML = ''; // Limpa a lista atual

        // Adiciona os processos à tela
        data.forEach(process => {
            const processItem = document.createElement('div');
            processItem.classList.add('shadow-md', 'w-200', 'rounded-lg', 'p-4', 'h-35','dark:bg-gray-800');
            processItem.innerHTML = `
                <div class="flex justify-between items-end">
                <div>
                    <p class="font-bold text-gray-900 dark:text-white">PID: ${process.pid}</p>
                    <p class="font-normal text-gray-500 dark:text-gray-400">Nome: ${process.name}</p>
                    <p class="font-normal text-gray-500 dark:text-gray-400">CPU: ${process.cpu}%</p>
                    <p class="font-normal text-gray-500 dark:text-gray-400">Memória: ${process.memory} KB</p>
                </div>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer">Encerrar</button>
            </div>

            `;
            processList.appendChild(processItem);
        });
}

function encerrarProcesso(pid) {
    const comando = `kill -SIGTERM ${pid}`;

    exec(comando, (erro, stdout, stderr) => {
        if (erro) {
            console.error(`Erro ao encerrar o processo ${pid}: ${erro.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`Processo ${pid} encerrado com sucesso.`);
    });
}


    
setInterval(fetchProcesses, 5000);
fetchProcesses();  
