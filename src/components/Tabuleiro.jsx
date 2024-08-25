import  O  from './O'
import  X  from './X'

export const Tabuleiro = () => {

  return (
    <div className="grid grid-cols-4 grid-rows-4 *:border-2 *:border-white/20 text-zinc-50 h-screen">
      <div className='flex items-center justify-center'><O/></div>
      <div className='flex items-center justify-center'><O/></div>
      <div className='flex items-center justify-center'><O/></div>
      <div className='flex items-center justify-center'><O/></div>
      <div className='flex items-center justify-center'><O/></div>
      <div className='flex items-center justify-center'><O/></div>
      <div className='flex items-center justify-center'><O/></div>
      <div className='flex items-center justify-center'><O/></div>
      <div className='flex items-center justify-center'><O/></div>
      <div className='flex items-center justify-center'><X/></div>
      <div className='flex items-center justify-center'><X/></div>
      <div className='flex items-center justify-center'><X/></div>
      <div className='flex items-center justify-center'><X/></div>
      <div className='flex items-center justify-center'><X/></div>
      <div className='flex items-center justify-center'><X/></div>
      <div className='flex items-center justify-center'><X/></div>
    </div>
  )
}
