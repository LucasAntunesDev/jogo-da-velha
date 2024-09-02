const Casa = ({onClick, valor, id}) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center overflow-hidden hover:bg-slate-600 border-2 border-slate-800"
      onClick={onClick}
      id={id}>
      {valor}
    </button>
  )
}

export default Casa
