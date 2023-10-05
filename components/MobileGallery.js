import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BsFillArrowUpSquareFill } from 'react-icons/bs'

function MobileGallery() {
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
    <div className='mt-20 px-[8%] pt-14 space-y-12 pb-12'>
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
        {/* button */}
        {dbImages.length > 1 &&
        <button onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}>
          <BsFillArrowUpSquareFill className='fixed left-[85%] top-[80%] bg-white rounded-md shadow-lg animate-bounce' size={38} />
        </button>}
        

{/* images */}
        <div className='space-y-6'>
        {filteredImages().slice(filteredImages().length-1, filteredImages().length).map((t,i)=>(
          <div className='mx-auto flex justify-center' key={i}>
          <Image src={t.imgUrl} width={410} height={410} priority alt={t.imgUrl} />
        </div>
        ))}
      <div className='mx-auto flex flex-wrap-reverse gap-4'>
        
      { filteredImages() &&
        filteredImages().slice(0,filteredImages().length-1).map((t,i)=>(
          <div className='' key={i}>
            <Image src={t.imgUrl} width={170} height={200} priority alt={t.imgUrl} />
          </div>
        ))}
        { filteredImages().length > 2 &&
        filteredImages().slice(0,filteredImages().length-1).map((t,i)=>(
          <div className='' key={i}>
            <Image src={t.imgUrl} width={170} height={200} priority alt={t.imgUrl} />
          </div>
        ))}
      </div>
      </div>
          {dbImages.length > 1 && 
          <div className='justify-center text-center hover:cursor-pointer'>
        <h1 className='text-sm font-medium'>Published by</h1>
        <h1 className='text-xs'>Standing Committee</h1>
        <div  className='mx-auto w-36 h-0.5 bg-teal-900 relative top-1'></div>
      </div>}
      
    </div>
  )
}

export default MobileGallery
