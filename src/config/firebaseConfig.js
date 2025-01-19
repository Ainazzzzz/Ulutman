import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
   apiKey: 'AIzaSyDfoUbmeD1y9Pot6jxCi4k3t2bQjjv-wTA',
   authDomain: 'ulutman-7269b.firebaseapp.com',
   projectId: 'ulutman-7269b',
   storageBucket: 'ulutman-7269b.firebasestorage.app',
   messagingSenderId: '929008418668',
   appId: '1:929008418668:web:1c00bf4af076b6446d3d49',
   measurementId: 'G-PFBZ5CQV95',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
