"use client"
import Image from 'next/image'
// import { Montserrat } from 'next/font/google'
import Banner from '@/components/Banner'
import TeamPointDisplay from '@/components/TeamPointDisplay'
import Theme from '@/components/Theme'
import GalleryDisplayBox from '@/components/GalleryDisplayBox'
import Head from 'next/head'
import { Suspense } from 'react'



// const inter = Montserrat({ subsets: ['cyrillic-ext'] })

export default function Home() {
  return (
    <div className='container duration-200 mx-auto flex flex-col body'>
      <Head>
      <title>Mehfil App</title>
      
      </Head>
     <Banner/>
     <Suspense fallback={<p>Team points are loading</p>}>
     <TeamPointDisplay/>
     </Suspense>
     <Theme/>
     <GalleryDisplayBox/>
    </div>
  )
}
