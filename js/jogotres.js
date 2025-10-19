const personagem = document.getElementById('personagem')
const nomePersonagem = localStorage.getItem('personagemEscolhido') || 'nicolly';
const pedra = document.querySelector('.pedra')
const mensagem = document.querySelector('.mensagem')
const contador = document.getElementById('contador')
const tutorial = document.getElementById('tutorial');


let pontuacao = 0
let gameOver = false
let pedraJaContada = false
let jogoComecou = false;
let pulando = false;


const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isMobile) {
  tutorial.innerHTML = `👉 Toque e segure na tela para andar`;
} else {
  tutorial.innerHTML = `➡️ Pressione ESPAÇO para pular os obstáculos! <br>`;
}

const jump = () => {
  if (gameOver || pulando) return;

  if (!jogoComecou) {
    iniciarJogo();
    tutorial.style.display = 'none';
    jogoComecou = true;
  }

  pulando = true;
  personagem.classList.add('pulo');
  setTimeout(() => {
    personagem.classList.remove('pulo');
    pulando = false;
  }, 600);
};

document.addEventListener('keydown', (e) => {
  if (gameOver) {
    location.reload();
  } else if (e.key === " ") {
    jump();
  }
});

document.addEventListener('touchstart', () => {
  if (gameOver) {
    location.reload();
  } else {
    jump();
  }
});


const loop = setInterval(() => {
  if (gameOver) return
  const personagemRect = personagem.getBoundingClientRect()
  const pedraRect = pedra.getBoundingClientRect()

  if (
    personagemRect.left < pedraRect.right &&
    personagemRect.right > pedraRect.left &&
    personagemRect.bottom > pedraRect.top
  ) {
    pedra.style.animation = 'none'
    pedra.style.left = `${pedra.offsetLeft}px`

    personagem.style.animation = 'none';
    personagem.style.bottom = `${parseFloat(window.getComputedStyle(personagem).bottom.replace('px', ''))}px`
    personagem.src = `imagens/${nomePersonagem}.png`
    mensagem.style.display = 'flex'
    gameOver = true
  }

  if (pedra.offsetLeft < 0 && !pedraJaContada && !gameOver) {
    pontuacao++
    contador.innerText = pontuacao
    pedraJaContada = true

    if (pontuacao >= 30) {
      clearInterval(loop)
      document.querySelector('.final').style.display = 'flex'
      pedra.style.animation = 'none'
      pedra.style.left = `${pedra.offsetLeft}px`
    }
  }

  if (pedra.offsetLeft > 200) {
    pedraJaContada = false
  }

}, 10)

document.addEventListener('keydown', (e) => {
  if (gameOver) {
    location.reload()
  } else if (e.key === " ") {
    jump()
  }
})

personagem.src = `imagens/${nomePersonagem}.gif`
personagem.classList.add(nomePersonagem)
  

window.addEventListener("load", () => {
  const jogo = document.querySelector(".jogo")
  const overlay = document.getElementById("overlay")
  const contadorinicial = document.getElementById("contadorinicial")
  const pedra = document.querySelector(".pedra")
  let t = 3
  const cron = setInterval(() => {
    t--
    if (t > 0) {
      contadorinicial.textContent = t
    } else {
      clearInterval(cron)
      overlay.style.display = "none"
      pedra.classList.add("animar")
      iniciarJogo()
    }
  }, 1000)
})

function iniciarJogo() {
  console.log("Jogo Iniciado")
}
