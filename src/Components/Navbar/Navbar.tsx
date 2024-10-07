import React from 'react'
import { IoLocationSharp } from 'react-icons/io5'
import { MdMyLocation } from 'react-icons/md'
import { TiWeatherPartlySunny } from 'react-icons/ti'
import Search from '../SearchBox/Search'

type Props = {}

const Navbar = ({}: Props) => {
  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-blue-950'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <div className='flex items-center justify-center gap-2'>
            <h2 className='text-gray-100 text-4xl'>Weather</h2>
            <TiWeatherPartlySunny className='text-white text-4xl'/>
        </div>
        {/* Search Bar Section */}
        <section className='flex gap-2 items-center'>
         <MdMyLocation  className='text-3xl text-white cursor-pointer'/>
         <IoLocationSharp  className='text-3xl text-white cursor-pointer'/>
         <p className='text-white text-xl'>Uzbekistan</p>
         <div>
            <Search/>
         </div>
        </section>
      </div>
    </nav>
  )
}

export default Navbar