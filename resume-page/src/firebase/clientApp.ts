// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { FirebaseApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCauZo-imU-pJk8VJPxsJRJXoOwkWJAAAg",
  authDomain: "myresumepage-42803.firebaseapp.com",
  projectId: "myresumepage-42803",
  storageBucket: "myresumepage-42803.appspot.com",
  messagingSenderId: "354577582024",
  appId: "1:354577582024:web:2253ef0ccc3ce4e1cd22fd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

