import O from './O'
import X from './X'
import Casa from './Casa'
import {useState} from 'react'

const Tabuleiro = () => {
  
  const combinacoesVitoria = [
    //Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonal decrescente
    [0, 4, 8],
    //Diagonal crescente
    [6, 4, 2],
  ]

  const zerarCasas = useState(Array(9).fill(null))

  const [casas, setCasas] = zerarCasas
  const [vencedor, setVencedor] = useState(null)
  const [casasVitoria, setCasasVitoria] = useState([])

  const jogadores = [0, 1]

  const [hidden , setHidden] = useState(true)

  const [jogadorAtual, setJogadorAtual] = useState(0)
  
  const [jogadasJogador1, setJogadasJogador1] = useState([])
  const [jogadasJogador2, setJogadasJogador2] = useState([])

  const [modoJogo, setModoJogo] = useState('fácil') 
  
  const [desativado, setDesativado] = useState(false) 

  const verificarVitoria = (jogadas) => {
    for (let combinacao of combinacoesVitoria) {
      if (combinacao.every(index => jogadas.includes(index))) {
        setCasasVitoria(combinacao)
        return true
      }
    }
    return false
  }

  const verificarEmpate = (casas) => {
    return casas.every(casa => casa !== null)
  }

  const reiniciarJogo = () => {
    setCasas(Array(9).fill(null))
    setJogadasJogador1([])
    setJogadasJogador2([])
    setJogadorAtual(0)
    setVencedor(null)
    setCasasVitoria([])
    setDesativado(false)
    setHidden(true)
  }

  const jogadaAleatoria = (novasCasas) => {
    let indexAleatorio

    do {
      indexAleatorio = Math.floor(Math.random() * 9)
    } while (novasCasas[indexAleatorio] !== null)

    return indexAleatorio
  }

  const jogadaDificil = (novasCasas) => {
    // Tenta bloquear o jogador 1
    for (let combinacao of combinacoesVitoria) {
      const jogadasJogador1NaCombinacao = combinacao.filter(index => jogadasJogador1.includes(index))
      const casasVaziasNaCombinacao = combinacao.filter(index => novasCasas[index] === null)
      if (jogadasJogador1NaCombinacao.length === 2 && casasVaziasNaCombinacao.length === 1) {
        return casasVaziasNaCombinacao[0]
      }
    }
    // Se não houver necessidade de bloquear, faz uma jogada aleatória
    return jogadaAleatoria(novasCasas)
  }

  const inserirValor = index => {
    const novasCasas = casas.slice()

    if (novasCasas[index] === null && !vencedor && !desativado) {
      if(jogadorAtual === 0){
        novasCasas[index] = <X />
        const novasJogadasJogador1 = [...jogadasJogador1, index]
        setJogadasJogador1(novasJogadasJogador1)
        setCasas(novasCasas)
        if (novasJogadasJogador1.length >= 3 && verificarVitoria(novasJogadasJogador1)) {
          setVencedor('Jogador 1')

          setHidden(false)
          return
        }
        setJogadorAtual(1)
        setDesativado(true) // Desativa os botões

        setTimeout(() => {
          const indexMaquina = modoJogo === 'fácil' ? jogadaAleatoria(novasCasas) : jogadaDificil(novasCasas)

          novasCasas[indexMaquina] = <O />

          const novasJogadasJogador2 = [...jogadasJogador2, indexMaquina]
          setJogadasJogador2(novasJogadasJogador2)
          setCasas(novasCasas)

          if (novasJogadasJogador2.length >= 3 && verificarVitoria(novasJogadasJogador2)) {
            setVencedor('Jogador 2')

            setHidden(false)
            return
          }

          setJogadorAtual(0)
          setDesativado(false)

          if (verificarEmpate(novasCasas)) {

            setHidden(false)

            alert('O jogo terminou empatado!')

            reiniciarJogo()
          }
        }, 500)
      }
    }
  }

  return (
    <>
      <header className="flex gap-x-8 mx-auto w-fit p-2 rounded shadow mb-6">
        {jogadores.map((jogador, index) => (
          <span
            className={`flex gap-x-2 font-bold ${
              jogadorAtual === jogador ? 'text-teal-400' : 'text-white'
            }`}
            key={index}>
            Jogador {jogador + 1}
            <p className="text-zinc-50 font-normal" key={index}>
              0
            </p>
          </span>
        ))}
      </header>

      <div className={`w-fit bg-slate-800 text-white p-4 rounded-2xl mx-auto my-4 ${hidden ? 'hidden' : 'flex'}`}>{vencedor} ganhou</div>

      <div className="flex justify-center mb-4">
        <button
          type="button"
          onClick={() => setModoJogo('fácil')}
          className={`py-2 px-4 mx-2 ${modoJogo === 'fácil' ? 'bg-green-600' : 'bg-gray-600'} text-white rounded`}
          disabled={desativado}>
          Fácil
        </button>
        <button
          type="button"
          onClick={() => setModoJogo('difícil')}
          className={`py-2 px-4 mx-2 ${modoJogo === 'difícil' ? 'bg-red-600' : 'bg-gray-600'} text-white rounded`}
          disabled={desativado}>
          Difícil
        </button>
      </div>

      <div className="grid grid-cols-3 grid-rows-3 *:border-2 *:border-slate-800 text-zinc-50 mx-auto h-72 w-7/12 max-h-screen bg-slate-900 rounded shadow-2xl">
        {casas.map((casa, index) => (
          <Casa
            onClick={() => inserirValor(index)}
            valor={casa}
            key={index}
            id={index}
            className={casasVitoria.includes(index) ? 'bg-emerald-600' : ''}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={reiniciarJogo}
        className={`${hidden ? 'hidden' : 'flex'} py-2 px-6 bg-sky-600 text-white leading-loose rounded-2xl hover:bg-sky-700 transition ease-in-out mx-auto my-4`}>
        Zerar Jogo
      </button>
    </>
  )
}

export default Tabuleiro
