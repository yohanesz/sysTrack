const body = document.querySelector('body');

export function modal(mensagem, status) {
    let div = document.getElementById('divModal');

    if (!div) {
        div = document.createElement('div');
        div.id = 'divModal';
        div.style.padding = '16px';
        div.style.borderRadius = '8px';
        div.style.width = '300px';
        div.style.top = '20px';
        div.style.right = '20px';
        div.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
        body.appendChild(div);
    }

    if (status === 1) {
        div.innerHTML = `
            <div style="background-color: #f9fafb; border-left: 4px solid #00bba7; padding: 12px; border-radius: 8px; position:absolute;" >
                <div class="p-4 mb-4 text-sm text-gray-900 rounded-xl bg-gray-50 font-normal" role="alert">
                    <span class="font-semibold mr-2">Alert</span> Your subscription payment is due
                </div>
            </div>`;
    } else if (status === 2) {
        div.innerHTML = `
            <div style="background-color: current-color; border-left: 4px solid #DC2626; padding: 12px; border-radius: 8px; position:absolute;">
                <div style="display: flex; align-items: center;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background-color: #FECACA; border: 4px solid #FCA5A5; color: #991B1B;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </span>
                    <div style="margin-left: 10px;">
                        <h3 style="color: #991B1B; font-size: 16px; margin: 0;">Erro!</h3>
                        <p style="color: #991B1B; font-size: 14px; margin: 0;">${mensagem}</p>
                    </div>
                </div>
            </div>`;
    }

    div.style.display = 'block';

    setTimeout(() => fecharModal(div), 5000);
}

function fecharModal(div) {
    if (div) {
        div.style.display = 'none';
    }
}
