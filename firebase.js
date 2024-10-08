import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDkilDZkw82m9TzGpJGI4O8EXvwuCexWB4",
  authDomain: "project-4-a90d9.firebaseapp.com",
  projectId: "project-4-a90d9",
  storageBucket: "project-4-a90d9.appspot.com",
  messagingSenderId: "284439369525",
  appId: "1:284439369525:web:f7aa071c274c5514941e7c",
  measurementId: "G-36T37J0Z7W"
};

let app;
let db;


if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export { db };
