// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDralyc1OZJLj-o92-FU1J7cJP6IxoNWzs",
  authDomain: "fir-auth-bb2cc.firebaseapp.com",
  projectId: "fir-auth-bb2cc",
  storageBucket: "fir-auth-bb2cc.appspot.com",
  messagingSenderId: "289635228650",
  appId: "1:289635228650:web:57bca289d9898a63063093"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;