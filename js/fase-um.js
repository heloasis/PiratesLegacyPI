const personagem = document.getElementById('personagem');
const nomePersonagem = localStorage.getItem('personagemEscolhido') || 'nicolly';
const pescador = document.getElementById('pescador');
const mensagempescador = document.getElementById('mensagempescador');
const textoOriginal = document.getElementById('textoOriginal');
const botaoContinuar = document.getElementById('botaoContinuar');

let posicaoX = 0;
const velocidade = 15;
let mensagemMostrada = false;
let podeMover = true; 

// Começa com o GIF
personagem.src = `imagens/${nomePersonagem}.gif`;
personagem.classList.add(nomePersonagem);

// Movimento do personagem
document.addEventListener('keydown', (evento) => {
  if (!podeMover) return; // se não puder mover, ignora teclas

  if (evento.key === 'ArrowRight') {
    posicaoX += velocidade;
  } else if (evento.key === 'ArrowLeft') {
    posicaoX -= velocidade;
  }

  posicaoX = Math.max(0, Math.min(window.innerWidth - 50, posicaoX));
  personagem.style.left = posicaoX + 'px';

  verificarColisao();
});

function verificarColisao() {
  const rectPersonagem = personagem.getBoundingClientRect();
  const rectPescador = pescador.getBoundingClientRect();

  const colidiu = !(
    rectPersonagem.right < rectPescador.left ||
    rectPersonagem.left > rectPescador.right ||
    rectPersonagem.bottom < rectPescador.top ||
    rectPersonagem.top > rectPescador.bottom
  );

// Configurações específicas de cada personagem
const configPersonagens = {
  amanda:  { width: "210px" },
  nicolly: { width: "210px" },
  heloisa: { width: "230px" },
  maria:   { width: "255px" },
  gustavo: { width: "215px" }
};

// Quando encostar no pescador
if (colidiu && !mensagemMostrada) {
  mensagemMostrada = true;
  podeMover = false;
  personagem.src = `imagens/${nomePersonagem}.png`;

  // Aplica tamanho e posição personalizados
  if (configPersonagens[nomePersonagem]) {
    personagem.style.width = configPersonagens[nomePersonagem].width;
    personagem.style.top = configPersonagens[nomePersonagem].top;
  }

  mostrarMensagemDigitando(textoOriginal.innerText);
}

}

function mostrarMensagemDigitando(texto) {
  const textoCompleto = texto; // pega o texto atual do HTML
  textoOriginal.innerText = ''; // limpa antes de digitar
  mensagempescador.style.display = 'block';
  botaoContinuar.style.display = 'none';

  let index = 0;
  const escrever = setInterval(() => {
    textoOriginal.innerText += textoCompleto.charAt(index);
    index++;

    if (index >= textoCompleto.length) {
      clearInterval(escrever);
      botaoContinuar.style.display = 'block';
    }
  }, 30);
}

botaoContinuar.addEventListener('click', () => {
  mensagempescador.style.display = 'none';
  botaoContinuar.style.display = 'none';
});

