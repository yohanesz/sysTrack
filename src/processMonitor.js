async function encerrarProcesso(pid) {

    try {
        const response = await fetch(`http://localhost:5000/api/kill/${pid}`, { 
            method: 'POST' 
        });

        if (!response.ok) {
            throw new Error(`Erro ao encerrar processo ${pid}`);
        }

        console.log(`Processo ${pid} encerrado com sucesso.`);
        fetchProcesses(); 
    } catch (error) {
        console.error(error);
    }
}

async function fetchProcesses() {
    const response = await fetch('http://localhost:5000/api');  // Alterado para a nova rota da API
    const data = await response.json();

    const processList = document.getElementById('processList');
    processList.innerHTML = ''; // Limpa a lista atual

    // Adiciona os processos à tela
    data.forEach(process => {
        const processItem = document.createElement('div');
        processItem.classList.add('shadow-md', 'w-200', 'rounded-lg', 'p-4', 'h-35','dark:bg-gray-800');
        const container = document.createElement('div');
        container.classList.add('flex', 'justify-between', "items-end");
        processItem.appendChild(container);
        container.innerHTML = `
            <div>
                <p class="font-bold text-gray-900 dark:text-white">PID: ${process.pid}</p>
                <p class="font-normal text-gray-500 dark:text-gray-400">Nome: ${process.name}</p>
                <p class="font-normal text-gray-500 dark:text-gray-400">CPU: ${process.cpu}%</p>
                <p class="font-normal text-gray-500 dark:text-gray-400">Memória: ${process.memory} KB</p>
            </div>
        `;
        const encerrar = document.createElement('button');
        encerrar.addEventListener('click', () => encerrarProcesso(process.pid));
        encerrar.classList.add('text-white', 'bg-blue-700', 'hover:bg-blue-800', "font-bold", "rounded-lg", "text-sm", "px-5", "py-2.5", "me-2", "mb-2", "dark:bg-blue-600", "dark:hover:bg-blue-700", "cursor-pointer");
        encerrar.textContent = 'Encerrar'
        container.appendChild(encerrar);
        processList.appendChild(processItem);
    });
}

    
setInterval(fetchProcesses, 5000);
fetchProcesses();  
