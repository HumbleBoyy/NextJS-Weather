'use client'

import React, { useState } from 'react'
import { IoLocationSharp } from 'react-icons/io5'
import { MdMyLocation } from 'react-icons/md'
import { TiWeatherPartlySunny } from 'react-icons/ti'
import Search from '../SearchBox/Search'
import axios from 'axios'

type Props = {}

const Navbar = ({}: Props) => {

    const[city, setCity] = useState("");
    const[error, setError] = useState("");
    const[suggestions, setSuggestions] = useState<string>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_APP_KEY;

    async function handleInputChange(value: string){
        setCity(value);
        if(value.length >= 3){
            try{
                const response = await axios.get(
                     `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${apiKey}`
                )
                const suggestions = response.data.list.map((items:any)=> items.name)

                setSuggestions(suggestions);
                setError('')
                setShowSuggestions(true)
            }catch(error){
               setSuggestions([])
               setShowSuggestions(false)
            }
        }else{
               setSuggestions([])
               setShowSuggestions(false)
        }
    }
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
         <div className='relative'>
            <Search
              value={city}
              onChange={(e)=> handleInputChange(e.target.value)}
            />
            <SuggetionBox
            {...{
              showSuggestions,
              suggestions,
              error
            }}
          />
         </div>
        </section>
      </div>
    </nav>
  )
}
function SuggetionBox({
    showSuggestions,
    suggestions,
    handleSuggestionClick,
    error
  }: {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (item: string) => void;
    error: string;
  }) {
    return (
      <>
        {((showSuggestions && suggestions.length > 1) || error) && (
          <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2">
            {error && suggestions.length < 1 && (
              <li className="text-red-500 p-1 "> {error}</li>
            )}
            {suggestions.map((item, i) => (
              <li
                key={i}
                onClick={() => handleSuggestionClick(item)}
                className="cursor-pointer p-1 rounded   hover:bg-gray-200"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }


export default Navbar
