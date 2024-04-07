import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firebaseApp } from "./../firebase"; // Assuming you export firebaseApp from firebaseConfig.js

const db = getFirestore(firebaseApp);

// Create operation
export const createDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // Return the ID of the newly created document
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Read operation (Get all documents in a collection)
export const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

// Update operation
export const updateDocument = async (collectionName, documentId, newData) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, newData);
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

// Delete operation
export const deleteDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};
