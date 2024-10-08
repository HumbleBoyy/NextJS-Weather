import React from 'react'
import { FaEye, FaWind } from 'react-icons/fa';
import { FiDroplet } from 'react-icons/fi';
import { ImMeter } from 'react-icons/im';
import { WiSunrise, WiSunset } from 'react-icons/wi';

export interface WeatherDetailsProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure:string;
    sunrise:string;
    sunset:string
}

const WeatherDetails = (props: WeatherDetailsProps) => {

    const {
        visibility = "25km",
        humidity = "61%",
        windSpeed = "7 km/h",
        airPressure = "1012 hPa",
        sunrise = "6:20",
        sunset = "18:50"
    } = props
  return (
    <>
      <SingleWeatherDetailProps
        icon={<FaEye />}
        information="Visibility"
        value={props.visibility}
      />
       <SingleWeatherDetailProps
        icon={<FiDroplet />}
        information="Humidity"
        value={props.humidity}
      />
        <SingleWeatherDetailProps
        icon={<FaWind />}
        information="windSpeed"
        value={props.windSpeed}
      />
       <SingleWeatherDetailProps
        icon={<ImMeter />}
        information="Air Pressure"
        value={props.airPressure}
      />
        <SingleWeatherDetailProps
        icon={<WiSunrise />}
        information="Sunrise"
        value={props.sunrise}
      />
        <SingleWeatherDetailProps
        icon={<WiSunset />}
        information="Sunset"
        value={props.sunset}
      />
    </>
  )
}
 
export interface SingleWeatherDetailProps {
    information: string;
    icon: React.ReactNode;
    value: string
}

function SingleWeatherDetailProps(props: SingleWeatherDetailProps){
  return(
    <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold'>
         <p className='whitespace-nowrap'>{props.information}</p>   
         <div className='text-3xl'>{props.icon}</div>  
         <p>{props.value}</p>
    </div>
  )
}
export default WeatherDetails