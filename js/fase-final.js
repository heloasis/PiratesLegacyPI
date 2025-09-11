const personagem = document.getElementById('personagem')
const nomePersonagem = localStorage.getItem('personagemEscolhido')
const bau = document.getElementById('bau')
const mensagembau = document.getElementById('mensagembau')
const textoOriginal = document.getElementById('textoOriginal')
const botaoContinuar = document.getElementById('botaoContinuar')

let posicaoX = 0
const velocidade = 15
let mensagemMostrada = false
let podeMover = true

personagem.src = `imagens/${nomePersonagem}.gif`
personagem.classList.add(nomePersonagem)
bau.src = "imagens/bau.png"

document.addEventListener('keydown', (evento) => {
  if (!podeMover) return
  if (evento.key === 'ArrowRight') {
    posicaoX += velocidade
  } else if (evento.key === 'ArrowLeft') {
    posicaoX -= velocidade
  }

  posicaoX = Math.max(0, Math.min(window.innerWidth - 50, posicaoX))
  personagem.style.left = posicaoX + 'px'
  verificarColisao();
})

function verificarColisao() {
  const rectPersonagem = personagem.getBoundingClientRect()
  const rectBau = bau.getBoundingClientRect()
  const colidiu = !(
    rectPersonagem.right < rectBau.left ||
    rectPersonagem.left > rectBau.right ||
    rectPersonagem.bottom < rectBau.top ||
    rectPersonagem.top > rectBau.bottom
  );


const configPersonagens = {
  amanda:  { width: "210px"},
  nicolly: { width: "210px"},
  heloisa: { width: "230px"},
  maria:   { width: "255px"},
  gustavo: { width: "215px"}
};

if (colidiu && !mensagemMostrada) {
  mensagemMostrada = true
  podeMover = false
  personagem.src = `imagens/${nomePersonagem}.png`
bau.src = "imagens/aberto.png"

  if (configPersonagens[nomePersonagem]) {
    personagem.style.width = configPersonagens[nomePersonagem].width
  }
  mostrarMensagemDigitando(textoOriginal.innerText)
}}

function mostrarMensagemDigitando(texto) {
  const textoCompleto = texto; 
  textoOriginal.innerText = ''
  mensagembau.style.display = 'block'
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
  mensagembau.style.display = 'none'
  botaoContinuar.style.display = 'none'
  podeMover = true
})

