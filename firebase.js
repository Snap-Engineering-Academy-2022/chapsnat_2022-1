// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYsAqN7flgN6gxQQQgaEkcuQ4dkXoVAcM",
  authDomain: "chatsnap-e07cf.firebaseapp.com",
  projectId: "chatsnap-e07cf",
  storageBucket: "chatsnap-e07cf.appspot.com",
  messagingSenderId: "852658759144",
  appId: "1:852658759144:web:6e8c9ac598775d6d25b05d",
  measurementId: "G-LKQTQPPCEE"
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;







//NEW VERSION

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCYsAqN7flgN6gxQQQgaEkcuQ4dkXoVAcM",
//   authDomain: "chatsnap-e07cf.firebaseapp.com",
//   projectId: "chatsnap-e07cf",
//   storageBucket: "chatsnap-e07cf.appspot.com",
//   messagingSenderId: "852658759144",
//   appId: "1:852658759144:web:6e8c9ac598775d6d25b05d",
//   measurementId: "G-LKQTQPPCEE"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// let firebase = {app, db}
// export default firebase;

