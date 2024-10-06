import {useState} from 'react'
import {ArrowRightIcon} from '@heroicons/react/16/solid'
import Tabuleiro from './components/Tabuleiro'
import Modal from './components/Modal'

const Jogo = () => {
  const combinacoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Vertical
    [0, 4, 8],
    [6, 4, 2], // Diagonais
  ]

  const [resultado, setResultado] = useState(null)
  const [casasVitoria, setCasasVitoria] = useState([])
  const [jogadorAtual, setJogadorAtual] = useState(0)
  const [jogadasJogador1, setJogadasJogador1] = useState([])
  const [jogadasJogador2, setJogadasJogador2] = useState([])
  const [desativado, setDesativado] = useState(false)

  //Casas
  const [casas, setCasas] = useState(() => {
    const casasLocalStorage = localStorage.getItem('casas')
    if (casasLocalStorage) {
      try {
        const casasSalvas = JSON.parse(casasLocalStorage)

        const jogadasJ1 = casasSalvas
          .map((item, index) => (item === 'X' ? index : -1))
          .filter(index => index !== -1)
        const jogadasJ2 = casasSalvas
          .map((item, index) => (item === 'O' ? index : -1))
          .filter(index => index !== -1)

        setJogadasJogador1(jogadasJ1)
        setJogadasJogador2(jogadasJ2)

        return casasSalvas
      } catch (error) {
        console.error('Erro ao analisar casas do localStorage:', error)
        return Array(9).fill(null)
      }
    }
    return Array(9).fill(null)
  })

  const [trancarDificuldade, setTrancarDificuldade] = useState(
    localStorage.getItem('trancar_dificuldade') || false
  )
  const [dificuldade, setDificuldade] = useState(
    localStorage.getItem('dificuldade') || 'fácil'
  )
  const [hidden, setHidden] = useState(true)

  const handleDificuldade = dificuldade => {
    setDificuldade(dificuldade)
    localStorage.setItem('dificuldade', dificuldade)
  }

  const handleTrancarDificuldade = () => {
    setTrancarDificuldade(true)
    localStorage.setItem('trancar_dificuldade', true)
  }

  const atualizarLocalStorage = resultado => {
    const resultados = JSON.parse(localStorage.getItem('resultados')) || {
      jogador1: 0,
      jogador2: 0,
      empates: 0,
    }

    if (resultado === 'Jogador') {
      resultados.jogador1 += 1
    } else if (resultado === 'Máquina') {
      resultados.jogador2 += 1
    } else if (resultado === 'Empate') {
      resultados.empates += 1
    }

    localStorage.setItem('resultados', JSON.stringify(resultados))
  }

  const verificarVitoria = jogadas => {
    for (let combinacao of combinacoesVitoria) {
      if (combinacao.every(index => jogadas.includes(index))) {
        setCasasVitoria(combinacao)
        return true
      }
    }
    return false
  }

  const verificarEmpate = novasCasas => novasCasas.every(casa => casa !== null)

  const reiniciarJogo = () => {
    setCasas(Array(9).fill(null))
    setJogadasJogador1([])
    setJogadasJogador2([])
    setJogadorAtual(0)
    setResultado(null)
    setCasasVitoria([])
    setDesativado(false)
    setHidden(true)
    setTrancarDificuldade(false)
    localStorage.removeItem('trancar_dificuldade')
    localStorage.removeItem('dificuldade')
    localStorage.removeItem('casas')
  }

  const jogadaAleatoria = novasCasas => {
    let indexAleatorio
    do {
      indexAleatorio = Math.floor(Math.random() * 9)
    } while (novasCasas[indexAleatorio] !== null)
    return indexAleatorio
  }

  const bloquear = (verificador, novasCasas) => {
    for (let combinacao of combinacoesVitoria) {
      const [a, b, c] = combinacao
      const [primeiro, segundo, terceiro] = [
        novasCasas[a],
        novasCasas[b],
        novasCasas[c],
      ]

      if (
        (primeiro === verificador &&
          segundo === verificador &&
          terceiro === null) ||
        (primeiro === verificador &&
          terceiro === verificador &&
          segundo === null) ||
        (segundo === verificador &&
          terceiro === verificador &&
          primeiro === null)
      ) {
        return combinacao.find(index => novasCasas[index] === null)
      }
    }
    return null
  }

  const jogadaDificil = novasCasas => {
    const jogadaGanhar = bloquear('O', novasCasas)
    if (jogadaGanhar !== null) {
      return jogadaGanhar
    }

    const jogadaBloquear = bloquear('X', novasCasas)
    if (jogadaBloquear !== null) {
      return jogadaBloquear
    }

    return jogadaAleatoria(novasCasas)
  }

  const handleClick = index => {
    const novasCasas = casas.slice()

    if (novasCasas[index] === null && !resultado && !desativado) {
      if (jogadorAtual === 0) {
        novasCasas[index] = 'X'
        localStorage.setItem('casas', JSON.stringify(novasCasas))
        const novasJogadasJogador1 = [...jogadasJogador1, index]
        setJogadasJogador1(novasJogadasJogador1)
        handleTrancarDificuldade()
        setCasas(novasCasas)

        if (
          novasJogadasJogador1.length >= 3 &&
          verificarVitoria(novasJogadasJogador1)
        ) {
          setResultado('Jogador')
          atualizarLocalStorage('Jogador')
          setHidden(false)
          return
        }

        if (verificarEmpate(novasCasas)) {
          setResultado('Empate')
          atualizarLocalStorage('Empate')
          setHidden(false)
          return
        }

        setJogadorAtual(1)
        setDesativado(true)

        setTimeout(() => {
          const indexMaquina =
            dificuldade === 'fácil'
              ? jogadaAleatoria(novasCasas)
              : jogadaDificil(novasCasas)

          novasCasas[indexMaquina] = 'O'
          localStorage.setItem('casas', JSON.stringify(novasCasas))
          const novasJogadasJogador2 = [...jogadasJogador2, indexMaquina]
          setJogadasJogador2(novasJogadasJogador2)
          setCasas(novasCasas)

          if (
            novasJogadasJogador2.length >= 3 &&
            verificarVitoria(novasJogadasJogador2)
          ) {
            setResultado('Máquina')
            atualizarLocalStorage('Máquina')
            setHidden(false)
            return
          }

          if (verificarEmpate(novasCasas)) {
            setResultado('Empate')
            atualizarLocalStorage('Empate')
            setHidden(false)
            return
          }

          setJogadorAtual(0)
          setDesativado(false)
        }, 500)
      }
    }
  }

  return (
    <>
      <Modal
        hidden={hidden}
        reiniciarJogo={reiniciarJogo}
        resultado={resultado}
      />

      <header className="flex flex-col gap-x-8 mx-auto w-fit p-2 rounded mb-6 items-center">
        <a
          href="/placar"
          className="text-white inline-flex hover:text-white/80 items-center gap-x-2">
          Ver jogos anteriores <ArrowRightIcon className="size-5" />
        </a>

        <div className="flex gap-x-8 mx-auto w-fit p-2">
          {[0, 1].map((jogador, index) => (
            <span
              className={`flex gap-x-2 font-bold ${
                jogadorAtual === jogador ? 'text-teal-400' : 'text-white'
              }`}
              key={index}>
              Jogador {jogador + 1}
            </span>
          ))}
        </div>
      </header>

      <div className="flex justify-center mb-4">
        <button
          type="button"
          onClick={() => handleDificuldade('fácil')}
          className={`py-2 px-4 mx-2 disabled:cursor-not-allowed ${
            dificuldade === 'fácil'
              ? 'bg-emerald-600 disabled:bg-emerald-600/50'
              : 'bg-slate-600'
          } text-white rounded`}
          disabled={trancarDificuldade}>
          Fácil
        </button>
        <button
          type="button"
          onClick={() => handleDificuldade('difícil')}
          className={`py-2 px-4 mx-2 disabled:cursor-not-allowed ${
            dificuldade === 'difícil'
              ? 'bg-rose-600 disabled:bg-rose-600/50'
              : 'bg-slate-600'
          } text-white rounded`}
          disabled={trancarDificuldade}>
          Difícil
        </button>
      </div>

      <Tabuleiro
        casas={casas}
        casasVitoria={casasVitoria}
        handleClick={handleClick}
      />
    </>
  )
}

export default Jogo
