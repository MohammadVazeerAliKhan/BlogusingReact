// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbPoiA5Bbgpxa8t3kkvMjlQ3UIWOly9ww",
  authDomain: "blogging-app-c649d.firebaseapp.com",
  projectId: "blogging-app-c649d",
  storageBucket: "blogging-app-c649d.appspot.com",
  messagingSenderId: "794919397395",
  appId: "1:794919397395:web:806e664f1829c5cad7b7e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
