const personagem = document.getElementById('personagem');
const nomePersonagem = localStorage.getItem('personagemEscolhido') || 'nicolly'; 
const pedra = document.querySelector('.pedra');
const mensagem = document.querySelector('.mensagem');
const contador = document.getElementById('contador');


let pontuacao = 0;
let gameOver = false;
let pedraJaContado = false;

// pulo
const jump = () => {
  personagem.classList.add('pulo');
  setTimeout(() => {
    personagem.classList.remove('pulo');
  }, 600);
};

const loop = setInterval(() => {
  if (gameOver) return;

  const personagemPosition = parseFloat(window.getComputedStyle(personagem).bottom.replace('px', ''));
  const pedraposition = pedra.offsetLeft;

  // colisão
  if (pedraposition <= 120 && pedraposition > 0 && personagemPosition < 12) {
   pedra.style.animation = 'none';
   pedra.style.left = `${pedraposition}px`;

    personagem.style.animation = 'none';
    personagem.style.bottom = `${personagemPosition}px`;
  
   personagem.src = `imagens/${nomePersonagem}.png`;
    mensagem.style.display = 'flex';
    gameOver = true;
  }

  // Contar ponto quando a pedra passa
  if (pedraposition < 0 && !pedraJaContado && !gameOver) {
    pontuacao++;
    contador.innerText = pontuacao;
    pedraJaContado = true;

  if (pontuacao >= 30) {
  clearInterval(loop);

  // Mostra a mensagem final
  document.querySelector('.final').style.display = 'flex';
  // PARAR BARRIL
pedra.style.animation = 'none';
pedra.style.left = `${espinhosposition}px`;
}
  }
  // Quando pedra voltar para direita, pode contar de novo
  if (pedraposition > 200) {
   pedraJaContado = false;
  }

}, 10);

// Teclado
document.addEventListener('keydown', (e) => {
  if (gameOver) {
    location.reload(); // Reinicia o jogo
  } else if (e.key === " ") {
    jump();
  }
})

personagem.src = `imagens/${nomePersonagem}.gif`; 
personagem.classList.add(nomePersonagem);
  
//contador antes de comecar
window.addEventListener("load", () => {
 const jogo = document.querySelector(".jogo")
 const overlay = document.getElementById("overlay")
const contadorinicial = document.getElementById("contadorinicial")
const pedra = document.querySelector(".pedra")
let t = 3
const cron = setInterval(() => {
t--
if (t>0){
  contadorinicial.textContent = t;
}
else {clearInterval(cron)
overlay.style.display = "none"
pedra.classList.add("animar")
 
iniciarJogo()
}
}, 1000)
})

function iniciarJogo() {
  console.log("Jogo Iniciado");
}
  