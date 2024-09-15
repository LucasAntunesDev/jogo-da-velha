const Modal = ({hidden, reiniciarJogo, resultado}) => {
  if (hidden) return

  let mensagem = ''
  if (resultado === 'Jogador') {
    mensagem = 'Vitória do jogador!'
  } else if (resultado === 'Máquina') {
    mensagem = 'Vitória da máquina!'
  } else if (resultado === 'Empate') {
    mensagem = 'O jogo terminou em empate!'
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-50 z-50 backdrop-blur-sm text-white">
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4">{mensagem}</h2>
        <button onClick={reiniciarJogo} className="btn-primary">
          Jogar Novamente
        </button>
      </div>
    </div>
  )
}

export default Modal
