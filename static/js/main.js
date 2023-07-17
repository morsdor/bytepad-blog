// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeCAF0Wjrtn88GmOUZYIMakeI1EYeJ2rs",
  authDomain: "bytepad-blog.firebaseapp.com",
  projectId: "bytepad-blog",
  storageBucket: "bytepad-blog.appspot.com",
  messagingSenderId: "847010403993",
  appId: "1:847010403993:web:450178da7b358d233a8a08",
  measurementId: "G-0R9KRMEPLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);