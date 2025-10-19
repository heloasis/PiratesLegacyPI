const personagem = document.getElementById('personagem');
const nomePersonagem = localStorage.getItem('personagemEscolhido');
const bau = document.getElementById('bau');
const mensagembau = document.getElementById('mensagembau');
const textoOriginal = document.getElementById('textoOriginal');
const botaoContinuar = document.getElementById('botaoContinuar');
const tutorial = document.getElementById('tutorial');

let posicaoX = 0;
const velocidade = 15;
let mensagemMostrada = false;
let podeMover = true;
let andando = false;

const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const tamanhosPersonagem = {
  heloisa: { png: isMobile ? '20vw' : '15vw', gif: isMobile ? '14vw' : '8vw' }, 
  nicolly: { png: isMobile ? '24vw' : '12vw', gif: isMobile ? '22vw' : '11vw' },
  amanda: { png: isMobile ? '18vw' : '12vw', gif: isMobile ? '16vw' : '8vw' },
  maria: { png: isMobile ? '18vw' : '13vw', gif: isMobile ? '12vw' : '8vw' },
  gustavo: { png: isMobile ? '20vw' : '12vw', gif: isMobile ? '16vw' : '8vw' }
};

const configPersonagens = {
  amanda:  { width: "210px" },
  nicolly: { width: "210px" },
  heloisa: { width: "230px" },
  maria:   { width: "255px" },
  gustavo: { width: "215px" }
};

function atualizarPersonagem(estado) {
  personagem.src = `imagens/${nomePersonagem}${estado === 'gif' ? '.gif' : '.png'}`;
  personagem.style.width = tamanhosPersonagem[nomePersonagem][estado];
}

atualizarPersonagem('png');
bau.src = "imagens/bau.png";

if (isMobile) {
  tutorial.innerHTML = `👉 Toque e segure na tela para andar`;
} else {
  tutorial.innerHTML = `➡️ Use as setas para se mover até o baú <br>`;
}

const jump = () => {
  if (!podeMover) return;
  atualizarPersonagem('gif');
  personagem.classList.add('pulo');
  setTimeout(() => {
    personagem.classList.remove('pulo');
    atualizarPersonagem('png');
  }, 700);
};

document.addEventListener('keydown', (evento) => {
  if (!podeMover) return;
  if (tutorial) tutorial.style.display = 'none';

  if (evento.code === 'ArrowRight' || evento.code === 'ArrowLeft') {
    if (!andando) {
      atualizarPersonagem('gif');
      andando = true;
    }
    posicaoX += evento.code === 'ArrowRight' ? velocidade : -velocidade;
  } else if (evento.code === 'Space') {
    jump();
  }

  posicaoX = Math.max(0, Math.min(window.innerWidth - 50, posicaoX));
  personagem.style.left = posicaoX + 'px';
  verificarColisao();
});

document.addEventListener('keyup', (evento) => {
  if (evento.code === 'ArrowRight' || evento.code === 'ArrowLeft') {
    andando = false;
    atualizarPersonagem('png');
  }
});

function andar() {
  if (andando && podeMover) {
    posicaoX += velocidade;
    personagem.style.left = posicaoX + "px";
    verificarColisao();
    requestAnimationFrame(andar);
  }
}

document.addEventListener("touchstart", () => {
  if (!podeMover) return;
  if (tutorial) tutorial.style.display = 'none';
  atualizarPersonagem('gif');
  andando = true;
  andar();
});

document.addEventListener("touchend", () => {
  andando = false;
  atualizarPersonagem('png');
});

function verificarColisao() {
  const rectPersonagem = personagem.getBoundingClientRect();
  const rectBau = bau.getBoundingClientRect();

  const colidiu = !(
    rectPersonagem.right < rectBau.left ||
    rectPersonagem.left > rectBau.right ||
    rectPersonagem.bottom < rectBau.top ||
    rectPersonagem.top > rectBau.bottom
  );

  if (colidiu && !mensagemMostrada) {
    mensagemMostrada = true;
    podeMover = false;
    atualizarPersonagem('png');
    bau.src = "imagens/aberto.png";

    if (configPersonagens[nomePersonagem]) {
      personagem.style.width = configPersonagens[nomePersonagem].width;
    }

    mostrarMensagemDigitando(textoOriginal.innerText);
  }
}

function mostrarMensagemDigitando(texto) {
  const textoCompleto = texto;
  textoOriginal.innerText = '';
  mensagembau.style.display = 'block';


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
  mensagembau.style.display = 'none';
  botaoContinuar.style.display = 'none';
  podeMover = true;
});
