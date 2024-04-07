// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";

// import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const apiKey = process.env.FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey,
  authDomain: "sukuul.firebaseapp.com",
  projectId: "sukuul",
  storageBucket: "sukuul.appspot.com",
  messagingSenderId: "907746753137",
  appId: "1:907746753137:web:ee8f3ec3ae64d395c939d0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// try {
//   const docRef = await addDoc(collection(db, "courses"), {
//     id: "course1",
//     name: "Algebra",
//     teacherId: "teacher1",
//     classId: "class1",
//     createdAt: "2024-04-07T00:00:00Z",
//     updatedAt: "2024-04-07T08:00:00Z",
//   });

//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

export { firebaseApp };
