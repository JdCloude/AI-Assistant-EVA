'use client';

import { initializeApp, FirebaseApp, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

let app: FirebaseApp;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.warn('Missing Firebase environment variables:', missingEnvVars);
  console.warn('Firebase features will be disabled. Please set the required environment variables in your Vercel deployment.');
}

// Initialize Firebase
try {
  app = getApp();
} catch (e: any) {
  if (!firebaseConfig.apiKey || missingEnvVars.length > 0) {
    console.warn("Firebase configuration incomplete. Firebase features will be disabled.");
    app = null as any;
  } else {
    try {
      app = initializeApp(firebaseConfig);
      console.log('Firebase initialized successfully');
    } catch (error: any) {
      console.error("Error initializing Firebase:", error);
      app = null as any;
    }
  }
}

export const auth: Auth = app ? getAuth(app) : null as any;

export default app;
