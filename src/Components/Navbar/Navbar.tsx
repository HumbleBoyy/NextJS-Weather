import React from 'react'
import { TiWeatherPartlySunny } from 'react-icons/ti'

type Props = {}

const Navbar = ({}: Props) => {
  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-blue-950'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <div className='flex items-center justify-center gap-2'>
            <h2 className='text-gray-500 text-3xl'>Weather</h2>
            <TiWeatherPartlySunny className='text-white text-3xl'/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar