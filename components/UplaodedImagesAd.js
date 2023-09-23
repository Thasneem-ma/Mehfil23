import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import RemoveImageButton from './RemoveImageButton';


function UplaodedImagesAd() {
    const [dbImages , setDbImages] = useState([])

    const router = useRouter()

    const getimageUrls = async() =>{
        try {
            const fetchedUrls = await fetch("/api/imageurl",{
                cache:"no-store",
            })

            if (!fetchedUrls) {
                console.log("something went wrong while fetching images");                
            }
            const fetchedDt = await fetchedUrls.json()
            setDbImages(fetchedDt.imageurls)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getimageUrls();
    },[])

  return (
    <>
      {dbImages.length > 1 &&
    <div className='p-14 bg-teal-50 w-full space-y-8'>
      <h1 className='text-2xl font-medium'>Uploaded Images</h1>
      <div className='grid grid-cols-4 gap-3 items-start'>
        {dbImages.map((t,i)=>(
          <div key={i} className='shadow-md '>
            <Image priority src={t.imgUrl} width={500} height={200} alt={t._id} />
            <RemoveImageButton id={t._id} />
          </div>
        ))}
      </div>
      </div>
    }
    </>
  )
}

export default UplaodedImagesAd
