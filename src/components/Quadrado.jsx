const Quadrado = ({onClick, valor}) => {
  return <button type="button" className="flex items-center justify-center" onClick={onClick}>{valor}</button>
}

export default Quadrado
