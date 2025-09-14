const personagem = document.getElementById('personagem')
const nomePersonagem = localStorage.getItem('personagemEscolhido') || 'nicolly';
const pedra = document.querySelector('.pedra')
const mensagem = document.querySelector('.mensagem')
const contador = document.getElementById('contador')


let pontuacao = 0
let gameOver = false
let pedraJaContado = false

const jump = () => {
  personagem.classList.add('pulo')
  setTimeout(() => {
 personagem.classList.remove('pulo')}, 500)
}

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

  if (pedra.offsetLeft < 0 && !pedraJaContado && !gameOver) {pontuacao++
    contador.innerText = pontuacao
    pedraJaContado = true

    if (pontuacao >= 25) {
      clearInterval(loop)
      document.querySelector('.final').style.display = 'flex'
      pedra.style.animation = 'none'
      pedra.style.left = `${pedra.offsetLeft}px`
    }
  }
  if (pedra.offsetLeft > 200) {
    pedraJaContado = false
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
const pedra = document.querySelector(".pedra")
let t = 3
const cron = setInterval(() => {
t--
if (t>0){
  contadorinicial.textContent = t
}
else {clearInterval(cron)
overlay.style.display = "none"
pedra.classList.add("animar")
 
iniciarJogo()
}}, 1000)})

function iniciarJogo() {
  console.log("Jogo Iniciado")
}
  
//movimento com TOUCH
let pulando = false

function pular() {
if (pulando) return 
  pulando = true
  personagem.classList.add('pulo')
  setTimeout(() => {
    personagem.classList.remove('pulo')
    pulando = false
  }, 600)
}
document.addEventListener("touchstart", pular)

document.addEventListener('touchstart', (e) => {
  if (gameOver) {
    location.reload()
  } else if (e.key === " ") {
    jump()
  }
})