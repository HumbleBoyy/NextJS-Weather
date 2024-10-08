"use client"

import Navbar from "@/Components/Navbar/Navbar";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { format, fromUnixTime, parseISO } from "date-fns";
import Container from "@/Components/Container/Container";
import { convertKelvinToCelcius } from "@/utils/convertToKelvinCelcius";
import WeatherIcon from "@/Components/Icons/WeatherIcon";
import { getDayAndNightIcon } from "@/utils/getDayAndNight";


interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
export default function Home() {
  // const[place, setPlace] = useState(placeAtom)
  
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_APP_KEY;

  const { isLoading, error, data, refetch } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${apiKey}&cnt=56`
      );
      return data;
    }
  );

  console.log(data)

  const firstData = data?.list[0];
  console.log(firstData)

  if(isLoading) return(
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">LOADING...</p>
    </div>
  )

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar/>
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          {/* Today data */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="flex gap-1 text-2xl items-end">
               <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
               <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})</p>
              </h2>
              <Container className="gap-10 px-6 items-center">
                  <div className="flex flex-col px-4 text-white">
                      <span className="text-5xl">
                        {convertKelvinToCelcius(firstData?.main.temp ?? 0)}°C
                      </span>
                      <p className="text-xs space-x-1 whitespace-nowrap">
                        <span className="">Feels like </span>
                        {convertKelvinToCelcius(firstData?.main.feels_like ?? 0)}°C
                      </p>
                      <p className="text-xs space-x-2">
                          <span>
                          {convertKelvinToCelcius(firstData?.main.temp_min ?? 0)}
                          °C↓{"  "}
                          </span>
                          <span>
                          {"  "}
                         {convertKelvinToCelcius(firstData?.main.temp_max ?? 0)}
                         °C↑
                          </span>
                      </p>
                  </div>
                  {/* Time and weather icon */}
                  <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between">
                    {data?.list.map((item, index)=> (
                        <div key={index} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                           <p className="whitespace-nowrap">{format(parseISO(item.dt_txt), "h:mm a")}</p>
                            <WeatherIcon iconName={getDayAndNightIcon(item.weather[0].icon, item.dt_txt)}/>
                           <p>{convertKelvinToCelcius(item?.main.temp ?? 0)}°C</p>
                        </div>
                     ))}
                  </div>
              </Container>
            </div>
          </section>

          {/* Weekly forecast data */}
          <section>

          </section>
      </main>
    </div>
  );
}
