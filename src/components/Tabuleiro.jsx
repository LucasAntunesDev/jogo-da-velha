import O from './O'
import X from './X'
import Quadrado from './Quadrado'
import {useDebugValue, useState} from 'react'

export const Tabuleiro = () => {
  const quadrados = ['00', '01', '02', '11', '11', '12', '20', '21', '22']

  const [valor, setValor] = useState(O)

  const jogadores = [0, 1]
  
  const [jogadorAtual, setjogadorAtual] = useState(0)

  const inserirValor = () => {
    
    jogadorAtual === 0 ? setValor(X) : setValor(O)
    jogadorAtual === 0 ? setjogadorAtual(1) : setjogadorAtual(0)

    console.log(jogadorAtual)
  }

  return (
    <>
      <header className='flex gap-x-8 bg-slate-800 mx-auto w-fit p-2 rounded shadow my-2'>
        {jogadores.map(jogador => (
          <span className='text-teal-400 flex gap-x-2'>Jogador: <p className='text-zinc-50'>{jogador}</p></span>
        ))}
      </header>

      <div className="grid grid-cols-3 grid-rows-3 *:border-2 *:border-slate-100/10 text-zinc-50 h-screen">
        {quadrados.map((quadrado, index) => (
          <Quadrado onClick={inserirValor} valor={valor} key={index} />
        ))}
        {/* <Quadrado onClick={inserirValor} valor={valor} key="1" />
      <Quadrado onClick={inserirValor} valor={valor} key="2" />
      <Quadrado onClick={inserirValor} valor={valor} key="3" />
      <Quadrado onClick={inserirValor} valor={valor} key="4" />
      <Quadrado onClick={inserirValor} valor={valor} key="5" />
      <Quadrado onClick={inserirValor} valor={valor} key="6" />
      <Quadrado onClick={inserirValor} valor={valor} key="7" />
      <Quadrado onClick={inserirValor} valor={valor} key="8" />
      <Quadrado onClick={inserirValor} valor={valor} key="9" /> */}
      </div>
    </>
  )
}
