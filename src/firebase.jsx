// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDtO0CZ_mloRGJT4_kaob4XWI1AtdfhG0",
  authDomain: "snapscreen-react-auth.firebaseapp.com",
  projectId: "snapscreen-react-auth",
  storageBucket: "snapscreen-react-auth.appspot.com",
  messagingSenderId: "815282908",
  appId: "1:815282908:web:487bd87c1f075fe4a71219",
  measurementId: "G-V522GMP34Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
