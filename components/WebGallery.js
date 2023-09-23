import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function WebGallery() {
    const [dbImages , setDbImages] = useState([])
    const [filter , setFilter] = useState("Result")
    
    const getimageUrls = async()=>{
        try {
            const dbImagesUrls = await fetch("/api/imageurl",{
                cache: "no-store"
            })
            if(!dbImages){
                console.log("Failed to get images");
            }

            const imagesFromDb = await dbImagesUrls.json()
            setDbImages(imagesFromDb.imageurls)

        } catch (error) {
            console.log(error);
        }
    }

    const filteredImages = ()=>{
      if (filter === 'Result') {
        return dbImages;
      }else if (filter === 'Photos') {
        return dbImages.filter(r => r.isResult === false)
      }
    }

    useEffect(()=>{
      getimageUrls()
    },[])

    useEffect(()=>{
      filteredImages()
    },[filter])


  return (
    <div className='mt-20 px-28 pt-14'>
        <div className='flex justify-between'>

        <h1 className='font-semibold text-3xl'>Gallery</h1>
        <div className='bg-gray-50 rounded-md p-0.5 space-y-5 animate-in shadow-md font-medium '>
        <select 
      className='p-2 rounded outline-none'
      name=""
      id=""
      value={filter}
      onChange={(e)=>setFilter(e.target.value)}
      >
        <option value="Result">Result</option>
        <option value="Photos">Photos</option>
      </select>
      </div>
        </div>

{/* images */}
      <div className='mt-6  p-3 w-full flex flex-col-reverse gap-3 '>
        <div className='grid grid-cols-4 gap-6'>
        {dbImages &&
        filteredImages().slice(0,4).map((res,i)=>(
        <div className=''>
          <Image priority src={res.imgUrl} width={300} height={300} alt={res.imgUrl}  className='w-auto h-auto aspect-auto' />
          </div>)) 
        }
        </div>

        <div className='grid grid-cols-2 mx-auto gap-6'>
        {dbImages &&
        filteredImages().slice(4,6).map((res,i)=>(
        <div className=''>
          <Image priority src={res.imgUrl} width={500} height={500} alt={res.imgUrl}  className='w-auto h-auto aspect-auto' />
          </div>)) 
        }
        </div>

        <div className='grid grid-cols-4 gap-6'>
        {dbImages &&
        filteredImages().slice(6,18).map((res,i)=>(
        <div className=''>
          <Image priority src={res.imgUrl} width={300} height={300} alt={res.imgUrl}  className='w-auto h-auto aspect-auto' />
          </div>)) 
        }
       </div>

       <div className='grid grid-cols-2 gap-6'>
        {dbImages &&
        filteredImages().slice(18,20).map((res,i)=>(
        <div className='mx-auto'>
          <Image priority src={res.imgUrl} width={500} height={500} alt={res.imgUrl}  className='w-auto h-auto aspect-auto' />
          </div>)) 
        }
       </div>

       <div className='grid grid-cols-4 gap-6'>
        {dbImages &&
        filteredImages().slice(20,filteredImages().length).map((res,i)=>(
        <div className=''>
          <Image priority src={res.imgUrl} width={300} height={300} alt={res.imgUrl}  className='w-auto h-auto aspect-auto' />
          </div>)) 
        }
       </div>

      </div>

    </div>
  )
}

export default WebGallery
