const Casa = ({onClick, valor, id}) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center overflow-hidden hover:bg-neutral-600 bg-neutral-800 rounded-lg transicao"
      onClick={onClick}
      id={id}>
      {valor}
    </button>
  )
}

export default Casa
