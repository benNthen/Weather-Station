'use client'

import Image from 'next/image'
import Navbar from './components/Navbar'
import { useQuery } from 'react-query'
import axios from 'axios'

// https://api.openweathermap.org/data/2.5/forecast?q=auckland&appid={27d3f45558f287e055aa204e4f0d0855}

interface WeatherData {
  cod: string
  message: number
  cnt: number
  list: WeatherListItem[]
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

interface WeatherListItem {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  pop: number
  sys: {
    pod: string
  }
  dt_txt: string
}

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    'repoData',
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=auckland&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=20`
      )
      return data
    }
    // fetch(
    //   'https://api.openweathermap.org/data/2.5/forecast?q=auckland&appid=27d3f45558f287e055aa204e4f0d0855&cnt=20'
    // ).then((res) => res.json())
  )

  console.log('data', data?.city.name)

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    )

  return (
    <div className="flex flex-col gap-4 bg-gray-199 min-h-screen">
      <Navbar />
    </div>
  )
}

