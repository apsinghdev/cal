import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlLVeBJKyiG4fCvKPV1c1QNi3u-RCzt7M",
  authDomain: "calauth-6f6b7.firebaseapp.com",
  projectId: "calauth-6f6b7",
  storageBucket: "calauth-6f6b7.appspot.com",
  messagingSenderId: "143014531598",
  appId: "1:143014531598:web:11b00ab56c3f8103dde25f",
  measurementId: "G-6R3WLPCFW4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();