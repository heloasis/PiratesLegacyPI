const personagem = document.getElementById('personagem');
const nomePersonagem = localStorage.getItem('personagemEscolhido') || 'nicolly'; 
const bandeira = document.querySelector('.bandeira');
const mensagem = document.querySelector('.mensagem');
const contador = document.getElementById('contador');

let pontuacao = 0;
let gameOver = false;
let bandeiraJaContado = false;

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
  const bandeiraposition = bandeira.offsetLeft;

  // colisão
  if (bandeiraposition <= 120 && bandeiraposition > 0 && personagemPosition < 12) {
    bandeira.style.animation = 'none';
    bandeira.style.left = `${bandeiraposition}px`;

    personagem.style.animation = 'none';
    personagem.style.bottom = `${personagemPosition}px`;
   personagem.src = `imagens/${nomePersonagem}.png`;

    mensagem.style.display = 'flex';
    gameOver = true;
  }

  // Contar ponto quando o barril passa
  if (bandeiraposition < 0 && !bandeiraJaContado && !gameOver) {
    pontuacao++;
    contador.innerText = pontuacao;
    bandeiraJaContado = true;

  if (pontuacao >= 20) {
  clearInterval(loop);

  // Mostra a mensagem final
  document.querySelector('.final').style.display = 'flex';

  // PARAR BARRIL
  bandeira.style.animation = 'none';
  bandeira.style.left = `${barrilposition}px`;
}
  }

  // Quando barril voltar para direita, pode contar de novo
  if (bandeiraposition > 200) {
    bandeiraJaContado = false;
  }

}, 10);

// Teclado
document.addEventListener('keydown', (e) => {
  if (gameOver) {
    location.reload(); // Reinicia o jogo
  } else if (e.key === " ") {
    jump();
  }
});

personagem.src = `imagens/${nomePersonagem}.gif`; 
personagem.classList.add(nomePersonagem);
