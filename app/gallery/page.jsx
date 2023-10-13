"use client"
import MobileGallery from '@/components/MobileGallery'
import WebGallery from '@/components/WebGallery'
import React, { Suspense } from 'react'

function gallery() {
  return (
    <div className='flex flex-col'>
      <div className='md:block hidden'>
        <WebGallery/>
      </div>
      <div className='block md:hidden'>
        <Suspense fallback={<p>Loading feed...</p>}>
        <MobileGallery/>
        </Suspense>
      </div>
    </div>
  )
}

export default gallery
