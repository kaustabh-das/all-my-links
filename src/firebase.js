import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "@firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyD1cNjpw-meIML-xl4XSfO4bB4hmPWRD5A",
  authDomain: "auth--development-d3b88.firebaseapp.com",
  projectId: "auth--development-d3b88",
  storageBucket: "auth--development-d3b88.appspot.com",
  messagingSenderId: "999341807400",
  appId: "1:999341807400:web:60b2d11a3df6244788221d",
});

export const auth = app.auth();
export const db = getFirestore(app);
export default app;
