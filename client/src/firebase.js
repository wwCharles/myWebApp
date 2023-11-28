// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "juiced23-fcf04.firebaseapp.com",
  databaseURL: "https://juiced23-fcf04-default-rtdb.firebaseio.com",
  projectId: "juiced23-fcf04",
  storageBucket: "juiced23-fcf04.appspot.com",
  messagingSenderId: "507411198484",
  appId: "1:507411198484:web:5c8719cb42c83c31fa6d01",
  measurementId: "G-7ZP97TF7GG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
