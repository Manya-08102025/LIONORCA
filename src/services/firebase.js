import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'

// Firebase configuration using Vite environment variables
// Replace or configure these in .env / .env.local
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY' &&
  firebaseConfig.projectId
)

let app = null
let auth = null
let db = null

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
    auth = getAuth(app)
    db = getFirestore(app)
    console.info('⚡ [Firebase] Initialized live Firebase project:', firebaseConfig.projectId)
  } catch (error) {
    console.warn('⚠️ [Firebase] Initialization failed, falling back to local storage:', error)
  }
} else {
  console.info('ℹ️ [Firebase] Live credentials not yet set in .env. Operating in Local/Hybrid persistence mode.')
}

export {
  app,
  auth,
  db,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
}

