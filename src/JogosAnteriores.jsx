import {Hash} from 'lucide-react'
import {useState, useEffect} from 'react'

const JogosAnteriores = () => {
  const [resultados, setResultados] = useState([])

  useEffect(() => {
    const resultadosAnteriores =
      JSON.parse(localStorage.getItem('resultados')) || []
    setResultados(resultadosAnteriores)
  }, [])

  return (
    <main className='h-fit min-h-screen text-zinc-50'>
      <h1 className="font-bold text-3xl md:text-5xl text-sky-500 my-8 mx-auto w-fit">
        Jogos anteriores
      </h1>

      <a
        href="/"
        className="btn-primary mx-auto flex items-center gap-x-2 w-fit">
        <Hash className="block" />
        <span>Jogar</span>
      </a>

      {resultados.length === 0 ? (
        <p className="w-fit mx-auto my-8 text-3xl font-bold text-zinc-50 flex">Ainda não há jogos concluídos</p>
      ) : (
        <ul>
          {resultados.map((resultado, index) => (
            <li key={index} className="border-b border-gray-700 py-2">
              <p>
                Jogo #{resultado.numero}
              </p>
              <p>Resultado: {resultado.resultado}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default JogosAnteriores
