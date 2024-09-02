const Modal = ({vencedor, onClick, mostarModal}) => {
  return (
    <div className={`bg-slate-800/60 text-white leading-loose flex-col justify-center items-center w-10/12 rounded-2xl mx-auto min-h-64 z-10 fixed backdrop-blur-sm ${mostarModal ? 'flex' : 'hidden'}`}>
      
      <p>
        {/* {typeof resultado === 'number'
          ? resultado === 0
            ? 'Jogador 1 Ganhou'
            : 'Jogador 2 Ganhou'
          : 'O jogo terminou empatado'} */}
          {vencedor} Ganhou
      </p>
      
      <button
        type="button"
        onClick={onClick}
        className="flex py-2 px-6 bg-sky-600 text-white leading-loose rounded-2xl hover:bg-sky-700 transition ease-in-out mx-auto my-4">
        Zerar Jogo
      </button>

    </div>
  )
}

export default Modal
