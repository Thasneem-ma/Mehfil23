"use client"
import PublishimageForm from '@/components/PublishimageForm'
import UplaodedImagesAd from '@/components/UplaodedImagesAd'
import React from 'react'

function publishimage() {
  return (
    <div className="w-full p-28 space-y-16">
      <div className='space-y-4'>
      <h1 className='font-semibold text-3xl ml-6'>Upload Images</h1>
      <PublishimageForm/>
      </div>
      <UplaodedImagesAd/>
    </div>
  )
}

export default publishimage
