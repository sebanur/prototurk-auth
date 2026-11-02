// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import store from "../store";
import { login as loginHandle, logout as logoutHandle } from "../store/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7s8myLDe1jY3h3kYvkxgVnsUoj4ETiUs",
  authDomain: "prototurk-auth-60cc3.firebaseapp.com",
  projectId: "prototurk-auth-60cc3",
  storageBucket: "prototurk-auth-60cc3.firebasestorage.app",
  messagingSenderId: "204677981227",
  appId: "1:204677981227:web:59bea35eb13d722da9366e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profil güncellendi.");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const resetPassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Parolanız güncellendi.");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(
      `Doğrulama maili ${auth.currentUser.email} adresine gönderildi, lütfen kontrol edin!`,
    );
  } catch (error) {
    toast.error(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      loginHandle({
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        uid: user.uid,
      }),
    );
  } else {
    store.dispatch(logoutHandle());
  }
});

export default app;
