import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDpi7IrHULMcnfOPNNvGq68ZMunEl-ofJM",
  authDomain: "crocheton-shop.firebaseapp.com",
  projectId: "crocheton-shop",
  storageBucket: "crocheton-shop.firebasestorage.app",
  messagingSenderId: "458986692215",
  appId: "1:458986692215:web:dea0b67f69ff1fa9b93072",
  measurementId: "G-HV75BZQJ5K"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);