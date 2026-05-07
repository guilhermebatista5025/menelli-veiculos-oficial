const whatsappNumber = "5527999849266";

function toggleWaModal() {
    const modal = document.getElementById('waModal');
    modal.classList.toggle('active');
}

function sendWaMsg(message) {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function sendWaInput() {
    const nome = document.getElementById('waName').value;
    const msg = document.getElementById('waInput').value;

    if (msg.trim() !== "") {
        const textoFinal = nome ? `Olá, me chamo ${nome}. ${msg}` : msg;
        sendWaMsg(textoFinal);
        
        // Limpa campos e fecha
        document.getElementById('waName').value = "";
        document.getElementById('waInput').value = "";
        toggleWaModal();
    } else {
        alert("Por favor, digite uma mensagem.");
    }
}

// Fecha se clicar fora da caixa branca
window.onclick = function(event) {
    const modal = document.getElementById('waModal');
    if (event.target == modal) {
        toggleWaModal();
    }
}