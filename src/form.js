const selectUser = document.getElementById('select-user');

async function listUsers() {
    try {
        const response = await fetch('http://localhost:5000/api/getUsers');
        const data = await response.json();

        // Garante que a API retorna um array válido
        if (!Array.isArray(data.users)) {
            throw new Error("A resposta da API não contém uma lista de usuários válida.");
        }

        // Limpa as opções anteriores
        selectUser.innerHTML = '';

        // Adiciona uma opção padrão
        const defaultOption = document.createElement('option');
        defaultOption.textContent = "Selecione um usuário";
        defaultOption.value = "";
        selectUser.appendChild(defaultOption);

        // Adiciona os usuários à lista
        data.users.forEach(user => {
            const option = document.createElement('option');
            option.textContent = user;  // Nome do usuário
            option.value = user;  // Pode usar o nome ou o id
            selectUser.appendChild(option);
        });

    } catch (error) {
        console.error("Erro ao listar usuários:", error);
    }
};

listUsers();




// <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
//                   <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                
//                     <option>United States</option>
//                     <option>Canada</option>
//                     <option>France</option>
//                     <option>Germany</option> 
//                   </select>