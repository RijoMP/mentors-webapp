// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBe3wr61qEU5bEy_oa35Rkrcltnnkis2y4",
  authDomain: "my-klee-app.firebaseapp.com",
  databaseURL: "https://my-klee-app.firebaseio.com",
  projectId: "my-klee-app",
  storageBucket: "my-klee-app.appspot.com",
  messagingSenderId: "467415369049",
  appId: "1:467415369049:web:632539ef4f20baf50a7848",
  measurementId: "G-E4591G7MN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,app,db}