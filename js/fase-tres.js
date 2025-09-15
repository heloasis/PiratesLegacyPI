const personagem = document.getElementById('personagem')
const nomePersonagem = localStorage.getItem('personagemEscolhido') || 'nicolly'
const pirata = document.getElementById('pirata')
const mensagempirata = document.getElementById('mensagempirata')
const textoOriginal = document.getElementById('textoOriginal')
const botaoContinuar = document.getElementById('botaoContinuar')

let posicaoX = 0
const velocidade = 15
let mensagemMostrada = false
let podeMover = true;

personagem.src = `imagens/${nomePersonagem}.gif`
personagem.classList.add(nomePersonagem)

const jump = () => {
  personagem.classList.add('pulo')
  setTimeout(() => {
 personagem.classList.remove('pulo')}, 700)
}
document.addEventListener('keydown', (evento) => {
  if (!podeMover) return

  if (evento.code === 'ArrowRight') {
    posicaoX += velocidade
  } else if (evento.code === 'ArrowLeft') {
    posicaoX -= velocidade
  } else if (evento.code === 'Space') {
    jump()}

  posicaoX = Math.max(0, Math.min(window.innerWidth - 50, posicaoX))
  personagem.style.left = posicaoX + 'px'
  verificarColisao()
})

function verificarColisao() {
  const rectPersonagem = personagem.getBoundingClientRect()
  const rectPirata = pirata.getBoundingClientRect()

  const colidiu = !(
    rectPersonagem.right < rectPirata.left ||
    rectPersonagem.left > rectPirata.right ||
    rectPersonagem.bottom < rectPirata.top ||
    rectPersonagem.top > rectPirata.bottom
  )

  const configPersonagens = {
    amanda:  { width: "210px" },
    nicolly: { width: "210px" },
    heloisa: { width: "230px" },
    maria:   { width: "255px" },
    gustavo: { width: "215px" }
  }

  if (colidiu && !mensagemMostrada) {
    mensagemMostrada = true
    podeMover = false
    personagem.src = `imagens/${nomePersonagem}.png`

    if (configPersonagens[nomePersonagem]) {
      personagem.style.width = configPersonagens[nomePersonagem].width
      if (configPersonagens[nomePersonagem].top) {
        personagem.style.top = configPersonagens[nomePersonagem].top
      }
    }
    mostrarMensagemDigitando(textoOriginal.innerText)
  }
}
function mostrarMensagemDigitando(texto) {
  const textoCompleto = texto
  textoOriginal.innerText = ''; 
  mensagempirata.style.display = 'block'
  botaoContinuar.style.display = 'none'

  let index = 0
  const escrever = setInterval(() => {
    textoOriginal.innerText += textoCompleto.charAt(index)
    index++

    if (index >= textoCompleto.length) {
      clearInterval(escrever)
      botaoContinuar.style.display = 'block'
    }
  }, 30)
}

botaoContinuar.addEventListener('click', () => {
  mensagempirata.style.display = 'none'
  botaoContinuar.style.display = 'none'
})


//movimento com TOUCH
let andando = false

function andar() {
if (andando && podeMover) {
 posicaoX += velocidade
 personagem.style.left = posicaoX + "px"
  verificarColisao();
  requestAnimationFrame(andar)}}

document.addEventListener("touchstart", () => {
  if (!andando) {
    andando = true
    andar()}})

document.addEventListener("touchend", () => {
  andando = false})
