"use client"
import React, { useEffect, useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from '../firebaseConfig'



function PublishimageForm() {
  const [images,setImages] = useState([])
  const [imgUrl , setImgUrl] = useState('')
  const [uploadProgress , setUploadProgress] = useState()
  const [isResult,setIsResult] = useState(true)

useEffect(() => {console.log(imgUrl);},[imgUrl])

  const handlePublishingImages = async(e)=> {
    e.preventDefault();
    
    if (images.length > 0) {
      images.forEach((image) => {
        const name = image.name;
        const storageRef = ref(storage, `images/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          async() => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            await getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
              setImgUrl(url);
              try {
                const res = await fetch("/api/imageurl",{
                  method: "POST",
                  headers:{
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({imgUrl : url , isResult})
                })
                
              } catch (error) {
                console.log(error);
              }
            });
          }
        );
      });
    }

    
  

    
  }

    useEffect(() =>{
      setUploadProgress(undefined)
    },[images])


  return (
    <form 
    onSubmit={handlePublishingImages}
    className="flex items-center justify-center w-full bg-teal-900 hover:bg-teal-800 rounded-xl">
       
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full
       rounded-lg cursor-pointer pb-10 ">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-4 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" 
            strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207
             5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p className="mb-2 text-sm text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          <p className="text-xs text-white">UPLOAD ONLY JPG IMAGES OF RESULTS OR FRAMES.<br></br> DO NOT UPLOAD THOSE TOGETHER. (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" accept='image/*' multiple 
        className="hidden"
        onChange={(e)=>setImages(Array.from(e.target.files))} />
        {images.length > 0 ? <div className='flex flex-col items-center text-center space-y-1.5'>
          <div className='flex space-x-3'>
            <div className='space-x-0.5 text-white'>
            <input 
            type="radio"
            id='result'
            name='imagecat'
            required
            value={true}
            onChange={(e)=>setIsResult(e.target.value)}
            />
            <label htmlFor="result">Result</label>
            </div>


            <div className='space-x-0.5 text-white'>
            <input 
            type="radio"
            id='frame'
            name='imagecat'
            required
            value={false}
            onChange={(e)=>setIsResult(e.target.value)}
            />
            <label htmlFor="frames">Frames</label>
            </div>
          </div>
        <div className='inline-flex space-x-1'>{images.map((img,i)=><h1 className='text-white ' key={i}>{img.name + " "} ,</h1>)}</div>
        {!uploadProgress && <button 
          type='submit'
          className='bg-white w-fit p-2 px-6 text-lg font-medium text-teal-900'>Upload</button> }
          
          {uploadProgress < 100 && <div className="w-full bg-teal-900 rounded-full h-1.5 ">
              <div className="bg-white h-1.5 rounded-full" style={{width: uploadProgress }} ></div>
            </div> }
            {uploadProgress == 100 && <h1 className='text-white font-semibold'>Uploaded Succesfully</h1>}
          </div>
        : null}
      
      </label>
    </form>
  )
}

export default PublishimageForm
