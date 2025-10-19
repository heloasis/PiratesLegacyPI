const personagem = document.getElementById('personagem')
const nomePersonagem = localStorage.getItem('personagemEscolhido') || 'nicolly';
const barril = document.querySelector('.barril')
const mensagem = document.querySelector('.mensagem')
const contador = document.getElementById('contador')
const tutorial = document.getElementById('tutorial');


let pontuacao = 0
let gameOver = false
let barrilJaContado = false
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
  const barrilRect = barril.getBoundingClientRect()

  if (
    personagemRect.left < barrilRect.right &&
    personagemRect.right > barrilRect.left &&
    personagemRect.bottom > barrilRect.top
  ) {
    barril.style.animation = 'none'
    barril.style.left = `${barril.offsetLeft}px`

    personagem.style.animation = 'none';
    personagem.style.bottom = `${parseFloat(window.getComputedStyle(personagem).bottom.replace('px', ''))}px`
    personagem.src = `imagens/${nomePersonagem}.png`
    mensagem.style.display = 'flex'
    gameOver = true
  }

  if (barril.offsetLeft < 0 && !barrilJaContado && !gameOver) {pontuacao++
    contador.innerText = pontuacao
    barrilJaContado = true

    if (pontuacao >= 20
    ) {
      clearInterval(loop)
      document.querySelector('.final').style.display = 'flex'
      barril.style.animation = 'none'
      barril.style.left = `${barril.offsetLeft}px`
    }
  }
  if (barril.offsetLeft > 200) {
    barrilJaContado = false
  }}, 10)

document.addEventListener('keydown', (e) => {
  if (gameOver) {
    location.reload()
  } else if (e.key === " ") {
    jump() }})

personagem.src = `imagens/${nomePersonagem}.gif`
personagem.classList.add(nomePersonagem)
  

window.addEventListener("load", () => {
 const jogo = document.querySelector(".jogo")
 const overlay = document.getElementById("overlay")
const contadorinicial = document.getElementById("contadorinicial")
const barril = document.querySelector(".barril")
let t = 3
const cron = setInterval(() => {
t--
if (t>0){
  contadorinicial.textContent = t
}
else {clearInterval(cron)
overlay.style.display = "none"
barril.classList.add("animar")
 
iniciarJogo()
}}, 1000)})

function iniciarJogo() {
  console.log("Jogo Iniciado")
}