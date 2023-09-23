"use client"
import MobileGallery from '@/components/MobileGallery'
import WebGallery from '@/components/WebGallery'
import React from 'react'

function gallery() {
  return (
    <div className='flex flex-col'>
      <div className='md:block hidden'>
        <WebGallery/>
      </div>
      <div className='block md:hidden'>
        <MobileGallery/>
      </div>
    </div>
  )
}

export default gallery
