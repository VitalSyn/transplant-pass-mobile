import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

interface Config {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: Config = {
  apiKey: "AIzaSyDBGM5cfs9XqpPfR2kuk2Hd1csQYDyAihE",
  authDomain: "transplantpass-25f0a.firebaseapp.com",
  projectId: "transplantpass-25f0a",
  storageBucket: "transplantpass-25f0a.appspot.com",
  messagingSenderId: "528972308259",
  appId: "1:528972308259:web:533a36fc8e5925fb5ab696",
  measurementId: "G-R9XPXRT6RF"
};

const app = initializeApp(firebaseConfig);
export const authInstance = initializeAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDownloadURL,
  ref,
  setDoc,
  updateDoc,
  uploadBytes
};