import Casa from './Casa'

const Tabuleiro = ({casas, casasVitoria, handleClick}) => {
  const safeCasas = Array.isArray(casas) ? casas : Array(9).fill(null)

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 rounded-xl text-zinc-50 mx-auto h-72 w-7/12 max-h-screen bg-slate-900 shadow-2xl text-3xl">
      {safeCasas.map((casa, index) => (
        <Casa
          onClick={() => handleClick(index)}
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
