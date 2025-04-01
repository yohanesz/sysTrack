import { modal } from './modal.js'

const botaoAtribuir = document.getElementById('btn-atribuir');

botaoAtribuir.addEventListener('click', async (evento) => {
    evento.preventDefault();

    const user = document.getElementById('select-user').value;
    const group = document.getElementById('select-group').value;
    const dir = document.getElementById('dir').value;

    const url = `http://localhost:5000/api/chmod/${user}/${group}/${dir}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        modal(data.message, 1);
        
        if (!response.ok) {
            modal(data.error, 2);
            console.log(error.message);
        }

    } catch (error) {
        modal(`Erro ao enviar requisição: ${error.message}`, 2);
        console.log(error.message);
    }

});