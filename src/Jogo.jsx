import {useState, useEffect} from 'react'
import {ArrowRightIcon} from '@heroicons/react/16/solid'
import O from './components/O'
import X from './components/X'
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

  const [casas, setCasas] = useState(Array(9).fill(null))
  const [resultado, setResultado] = useState(null)
  const [casasVitoria, setCasasVitoria] = useState([])
  const [jogadorAtual, setJogadorAtual] = useState(0)
  const [jogadasJogador1, setJogadasJogador1] = useState([])
  const [jogadasJogador2, setJogadasJogador2] = useState([])
  const [modoJogo, setModoJogo] = useState('fácil')
  const [desativado, setDesativado] = useState(false)
  const [trancarDificuldade, setTrancarDificuldade] = useState(false)
  const [hidden, setHidden] = useState(true)

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
  }

  const jogadaAleatoria = novasCasas => {
    let indexAleatorio
    do {
      indexAleatorio = Math.floor(Math.random() * 9)
    } while (novasCasas[indexAleatorio] !== null)
    return indexAleatorio
  }

  const jogadaDificil = novasCasas => {
    for (let combinacao of combinacoesVitoria) {
      const jogadasJogador1NaCombinacao = combinacao.filter(index =>
        jogadasJogador1.includes(index)
      )
      const casasVaziasNaCombinacao = combinacao.filter(
        index => novasCasas[index] === null
      )
      if (
        jogadasJogador1NaCombinacao.length === 2 &&
        casasVaziasNaCombinacao.length === 1
      ) {
        return casasVaziasNaCombinacao[0]
      }
    }
    return jogadaAleatoria(novasCasas)
  }

  const inserirValor = index => {
    const novasCasas = casas.slice()

    if (novasCasas[index] === null && !resultado && !desativado) {
      if (jogadorAtual === 0) {
        novasCasas[index] = <X />
        const novasJogadasJogador1 = [...jogadasJogador1, index]
        setJogadasJogador1(novasJogadasJogador1)
        setTrancarDificuldade(true)
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
            modoJogo === 'fácil'
              ? jogadaAleatoria(novasCasas)
              : jogadaDificil(novasCasas)

          novasCasas[indexMaquina] = <O />
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

  useEffect(() => {
    const resultados = JSON.parse(localStorage.getItem('resultados')) || {
      jogador1: 0,
      jogador2: 0,
      empates: 0,
    }
    console.log(resultados)
  }, [])

  return (
    <>
      <Modal
        hidden={hidden}
        reiniciarJogo={reiniciarJogo}
        resultado={resultado}
      />

      <header className="flex flex-col gap-x-8 mx-auto w-fit p-2 rounded shadow mb-6 items-center">
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
          onClick={() => setModoJogo('fácil')}
          className={`py-2 px-4 mx-2 disabled:cursor-not-allowed ${
            modoJogo === 'fácil'
              ? 'bg-emerald-600 disabled:bg-emerald-600/50'
              : 'bg-slate-600'
          } text-white rounded`}
          disabled={trancarDificuldade}>
          Fácil
        </button>
        <button
          type="button"
          onClick={() => setModoJogo('difícil')}
          className={`py-2 px-4 mx-2 disabled:cursor-not-allowed ${
            modoJogo === 'difícil'
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
        inserirValor={inserirValor}
      />
    </>
  )
}

export default Jogo
