const personagem = document.getElementById('personagem')
const nomePersonagem = localStorage.getItem('personagemEscolhido') || 'nicolly';
const bandeira = document.querySelector('.bandeira')
const mensagem = document.querySelector('.mensagem')
const contador = document.getElementById('contador')
const tutorial = document.getElementById('tutorial');


let pontuacao = 0
let gameOver = false
let bandeiraJaContada = false
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
  }, 700);
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
  const bandeiraRect = bandeira.getBoundingClientRect()

  if (
    personagemRect.left < bandeiraRect.right &&
    personagemRect.right > bandeiraRect.left &&
    personagemRect.bottom > bandeiraRect.top
  ) {
    bandeira.style.animation = 'none'
    bandeira.style.left = `${bandeira.offsetLeft}px`

    personagem.style.animation = 'none';
    personagem.style.bottom = `${parseFloat(window.getComputedStyle(personagem).bottom.replace('px', ''))}px`
    personagem.src = `imagens/${nomePersonagem}.png`
    mensagem.style.display = 'flex'
    gameOver = true
  }

  if (bandeira.offsetLeft < 0 && !bandeiraJaContada && !gameOver) {
    pontuacao++
    contador.innerText = pontuacao
    bandeiraJaContada = true

    if (pontuacao >= 25) {
      clearInterval(loop)
      document.querySelector('.final').style.display = 'flex'
      bandeira.style.animation = 'none'
      bandeira.style.left = `${bandeira.offsetLeft}px`
    }
  }

  if (bandeira.offsetLeft > 200) {
    bandeiraJaContada = false
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
  const bandeira = document.querySelector(".bandeira")
  let t = 3
  const cron = setInterval(() => {
    t--
    if (t > 0) {
      contadorinicial.textContent = t
    } else {
      clearInterval(cron)
      overlay.style.display = "none"
      bandeira.classList.add("animar")
      iniciarJogo()
    }
  }, 1000)
})

function iniciarJogo() {
  console.log("Jogo Iniciado")
}
