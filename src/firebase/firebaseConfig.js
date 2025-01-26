import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyC1Siu-5yZqCKkBCn6cN7s0N9iPK7Ht4_A',
  authDomain: 'songnotesapp-41de2.firebaseapp.com',
  projectId: 'songnotesapp-41de2',
  databaseURL: 'https://songnotesapp-41de2-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'songnotesapp-41de2.firebasestorage.app',
  messagingSenderId: '1037753895253',
  appId: '1:1037753895253:web:24f07504914ba314bc07dc',
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
export const storage = getStorage(app)
