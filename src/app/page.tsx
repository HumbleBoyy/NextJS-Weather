"use client"

import Navbar from "@/Components/Navbar/Navbar";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { format, fromUnixTime, parseISO } from "date-fns";


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
          <section>
            <div>
              <h2 className="flex gap-1 text-2xl items-end">
               <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
               <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})</p>
              </h2>
            </div>
          </section>

          {/* Weekly forecast data */}
          <section>

          </section>
      </main>
    </div>
  );
}
