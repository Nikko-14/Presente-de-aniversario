// Data do aniversário: 6 de Abril 2026 às 00:00
const dataAniversario = new Date('2026-04-06T00:00:00').getTime();

// Atualiza contador a cada segundo
function atualizarContador() {
    const agora = new Date().getTime();
    const diferenca = dataAniversario - agora;

    // Calcula dias, horas, minutos e segundos
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Atualiza no HTML
    document.getElementById('dias').textContent = dias.toString().padStart(2, '0');
    document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
    document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
    document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');
}

// Abre o presente
function abrirPresente() {
    const caixa = document.getElementById('caixaPresente');
    const botao = document.querySelector('.btn-presente');
    
    botao.style.display = 'none';
    caixa.style.display = 'block';
    setTimeout(() => {
        document.querySelector('.conteudo-presente').classList.add('mostrar');
    }, 100);
    
    // Explosão de corações
    explosaoCoracoes();
    
    // Som festivo
    tocarSom();
}

// Explosão de corações
function explosaoCoracoes() {
    for(let i = 0; i < 30; i++) {
        setTimeout(() => {
            const coracao = document.createElement('div');
            coracao.innerHTML = ['💖', '💕', '💗', '🌹', '✨'][Math.floor(Math.random() * 5)];
            coracao.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: 70vh;
                font-size: ${Math.random() * 30 + 25}px;
                pointer-events: none;
                z-index: 9999;
                animation: floatUp 3s linear forwards;
            `;
            document.body.appendChild(coracao);
            
            setTimeout(() => coracao.remove(), 3000);
        }, i * 100);
    }
}

// Som do presente
function tocarSom() {
    try {
        const contexto = new (window.AudioContext || window.webkitAudioContext)();
        const notas = [523, 659, 784, 659, 523]; // Dó, Mi, Sol, Mi, Dó
        
        notas.forEach((frequencia, i) => {
            setTimeout(() => {
                const oscilador = contexto.createOscillator();
                const ganho = contexto.createGain();
                
                oscilador.connect(ganho);
                ganho.connect(contexto.destination);
                
                oscilador.frequency.value = frequencia;
                oscilador.type = 'sine';
                
                ganho.gain.setValueAtTime(0.3, contexto.currentTime);
                ganho.gain.exponentialRampToValueAtTime(0.01, contexto.currentTime + 0.4);
                
                oscilador.start(contexto.currentTime);
                oscilador.stop(contexto.currentTime + 0.4);
            }, i * 150);
        });
    } catch(e) {
        // Som não suportado
    }
}

// Inicia contador
atualizarContador();
setInterval(atualizarContador, 1000);