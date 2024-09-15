import { XMarkIcon } from '@heroicons/react/16/solid'

const Modal = ({hidden, reiniciarJogo, vencedor}) => {
  return (
    <div
      className={`z-20 ${
        hidden ? 'hidden' : 'flex flex-col'
      } backdrop-blur-sm w-screen h-screen absolute justify-center items-center`}>
      <div
        className={`bg-slate-800/60 text-white leading-loose flex-col justify-center items-center w-10/12 rounded-2xl mx-auto min-h-64 z-10 fixed backdrop-blur-sm `}>
        <div className="flex w-full justify-end">
          <button
            onClick={reiniciarJogo}
            className="inline-flex  m-4 hover:*:text-white/80">
            <XMarkIcon className="size-5" />
          </button>
        </div>

        <p className="m-auto size-fit font-bold text-5xl text-teal-600">
          {vencedor === 'Jogador 1' ? 'Jogaador 1' : 'A máquina'} ganhou
        </p>

        <button
          type="button"
          onClick={reiniciarJogo}
          className={`${
            hidden ? 'hidden' : 'flex'
          } py-2 px-6 bg-sky-500 text-white leading-loose rounded-2xl hover:bg-sky-600 transition ease-in-out mx-auto my-12`}>
          Zerar Jogo
        </button>
      </div>
    </div>
  )
}

export default Modal
