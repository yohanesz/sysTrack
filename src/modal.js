const body = document.querySelector('body');

export function modal(mensagem, status) {
    let div = document.getElementById('divModal');

    if (!div) {
        div = document.createElement('div');
        div.id = 'divModal';
        div.style.padding = '16px';
        div.style.borderRadius = '8px';
        div.style.position = "fixed";
        div.style.width = '300px';
        div.style.top = '0px';
        div.style.left = '0';
        div.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
        body.appendChild(div);
    }

    if (status === 1) {
        div.innerHTML = `
            <div style="background-color: #1f2937; padding: 15px; border-radius: 8px; position:absolute;" >
            <div class="p-2 mb-4 text-sm rounded-xl bg-gray-50 font-normal" role="alert" style="color: #33cd95">
                <span class="font-semibold mr-2"> Sucess: </span> ${mensagem}
            </div>
            </div>`;
    } else if (status === 2) {
        div.innerHTML = `
          <div style="background-color: #1f2937; padding: 15px; border-radius: 8px; position:absolute;" >
            <div class="p-2 mb-4 text-sm rounded-xl bg-gray-50 font-normal" role="alert" style="color: #f87171">
                <span class="font-semibold mr-2"> Error: </span> ${mensagem}
            </div>
            </div>`;
    }

    div.style.display = 'block';

    setTimeout(() => fecharModal(div), 7000);
}

function fecharModal(div) {
    if (div) {
        div.style.display = 'none';
    }
}
