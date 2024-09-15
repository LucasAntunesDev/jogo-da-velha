import {Hash} from 'lucide-react'
import {useState, useEffect} from 'react'

const Placar = () => {
  const [resultados, setResultados] = useState({
    jogador1: 0,
    jogador2: 0,
    empates: 0,
  })

  useEffect(() => {
    const resultadosSalvos = JSON.parse(localStorage.getItem('resultados')) || {
      jogador1: 0,
      jogador2: 0,
      empates: 0,
    }
    setResultados(resultadosSalvos)
  }, [])

  const zerarPlacar = () => {
    localStorage.removeItem('resultados')
    setResultados({
      jogador1: 0,
      jogador2: 0,
      empates: 0,
    })
  }

  return (
    <main className="h-fit min-h-screen text-zinc-50">
      <h1 className="font-bold text-3xl md:text-5xl text-sky-500 my-8 mx-auto w-fit">
        Placar
      </h1>

      <div className="flex gap-x-8 items-center justify-center">
        <a href="/" className="btn-primary flex items-center gap-x-2 w-fit">
          <Hash className="block" />
          <span>Jogar</span>
        </a>

        <button type="button" className="w-fit" onClick={zerarPlacar}>
          Zerar placar
        </button>
      </div>

      {resultados.length === 0 ? (
        <p className="w-fit mx-auto my-8 text-3xl font-bold text-zinc-50 flex">
          Ainda não há jogos concluídos
        </p>
      ) : (
        <div className="p-8 text-center flex gap-x-4 m-auto w-fit">
          <p className="text-xl mb-2 p-4 rounded-2xl bg-slate-700 w-fit">
            <span className="font-bold">Jogador: </span>
            {resultados.jogador1}
          </p>
          <p className="text-xl mb-2 p-4 rounded-2xl bg-slate-700 w-fit">
            <span className="font-bold">Máquina: </span>
            {resultados.jogador2}
          </p>
          <p className="text-xl mb-2 p-4 rounded-2xl bg-slate-700 w-fit">
            <span className="font-bold">Empates: </span>
            {resultados.empates}
          </p>
        </div>
      )}
    </main>
  )
}

export default Placar
