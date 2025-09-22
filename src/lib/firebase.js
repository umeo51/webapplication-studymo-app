// Firebase configuration and initialization
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

// Firebase configuration (demo configuration for development)
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "skillhabit-demo.firebaseapp.com",
  projectId: "skillhabit-demo",
  storageBucket: "skillhabit-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

// For development, use emulators if available
if (location.hostname === 'localhost') {
  try {
    // Connect to Auth emulator
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
  } catch (error) {
    // Emulator already connected or not available
    console.log('Auth emulator connection skipped:', error.message)
  }
  
  try {
    // Connect to Firestore emulator
    connectFirestoreEmulator(db, 'localhost', 8080)
  } catch (error) {
    // Emulator already connected or not available
    console.log('Firestore emulator connection skipped:', error.message)
  }
}

export default app
