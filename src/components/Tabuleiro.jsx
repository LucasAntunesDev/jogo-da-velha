import Casa from './Casa'

const Tabuleiro = ({casas, casasVitoria, inserirValor}) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 *:border-2 *:bg-slate-800 gap-1 *:rounded-xl text-zinc-50 mx-auto h-72 w-7/12 max-h-screen bg-slate-900 rounded shadow-2xl">
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
  )
}

export default Tabuleiro
