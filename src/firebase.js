import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

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
// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);
export default app;
