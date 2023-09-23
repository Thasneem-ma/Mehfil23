import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import { useRouter } from 'next/navigation';
import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

// async function fetchAllFirebaseImageUrls() {
//   const storageRef = ref(storage,'images');
  

//   try {
//     // const storageItems = await listAll(storageRef);
//     listAll(storageRef)
//   .then((res) => {
//     res.prefixes.forEach((folderRef) => {
//       // All the prefixes under listRef.
//       // You may call listAll() recursively on them.
//     });
//     res.items.forEach((itemRef) => {
//       // All the items under listRef.
//       console.log(storageRef);
//     });
//   })
//     // if (storageItems.ok) {
//     // }
//     // if (imageUrls.ok) {
//     //   console.log("imageUrls ok");
//     // }else{
//     //   console.log("something went wrong imageUrls");
//     // }
//     // return imageUrls;
//   } catch (error) {
//     console.error('Error fetching Firebase image URLs:', error);
//     throw error;
//   }
// }

// async function deleteMissingImagesFromFirebaseStorage(missingUrls) {
//   const storageRef = ref(storage,'files/images');

//   try {
//     for (const url of missingUrls) {
//       const imageRef = ref(storageRef, url);
//       await deleteObject(imageRef);
//       console.log(`Deleted image from Firebase Storage: ${url}`);
//     }
//   } catch (error) {
//     console.error('Error deleting image from Firebase Storage:', error);
//     throw error;
//   }
// }

function RemoveImageButton({ id }) {
  // const router = useRouter();

  const deleteImageFromMongo = async () => {
    const confirmed = confirm("Are you sure you want to remove this participant");

    if (confirmed) {
      const res = await fetch(`/api/imageurl?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        console.log("Failed to delete images");
      }

      try {
        const dbImages = await fetch("/api/imageurl").then(response => response.json());
        const dbImageUrls = dbImages.imageurls.map(image => image.imgUrl);

        const firebaseImageUrls = await fetchAllFirebaseImageUrls();
        const missingUrls = firebaseImageUrls.filter(url => !dbImageUrls.includes(url));

        await deleteMissingImagesFromFirebaseStorage(missingUrls);
      } catch (error) {
        console.log(error);
      }

      // router.refresh();
    }
  }

  return (
    <button onClick={deleteImageFromMongo} className='flex text-center text-black w-full font-semibold hover:text-teal-800 py-4 items-center justify-center space-x-2'>
      <RiDeleteBin6Line size={20} />
      <h1 className='text-lg'>Delete</h1>
    </button>
  );
}

export default RemoveImageButton;
