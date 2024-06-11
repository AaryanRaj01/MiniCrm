import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDwQQNtkoZrEjAg0WZYVHfg1BizpXv8dmk",
    authDomain: "assignapp-cf1a3.firebaseapp.com",
    projectId: "assignapp-cf1a3",
    storageBucket: "assignapp-cf1a3.appspot.com",
    messagingSenderId: "591973545940",
    appId: "1:591973545940:web:e01bbfc92dbef09f104841"
};


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
