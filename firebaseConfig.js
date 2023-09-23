// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClPHWJ3cAJ-JelHfUN-0evlNZyd_7Dqxc",
  authDomain: "mehfilimage.firebaseapp.com",
  projectId: "mehfilimage",
  storageBucket: "mehfilimage.appspot.com",
  messagingSenderId: "145274884381",
  appId: "1:145274884381:web:cb7e39cc907eb2030951f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
export const storage = getStorage();