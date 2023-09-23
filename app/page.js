"use client"
import Image from 'next/image'
// import { Montserrat } from 'next/font/google'
import Banner from '@/components/Banner'
import TeamPointDisplay from '@/components/TeamPointDisplay'
import Theme from '@/components/Theme'
import GalleryDisplayBox from '@/components/GalleryDisplayBox'
import Head from 'next/head'



// const inter = Montserrat({ subsets: ['cyrillic-ext'] })

export default function Home() {
  return (
    <div className='container mx-auto flex flex-col body'>
      <Head>
      <title>Mehfil App</title>
      
      </Head>
     <Banner/>
     <TeamPointDisplay/>
     <Theme/>
     <GalleryDisplayBox/>
    </div>
  )
}
