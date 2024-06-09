// src/services/RepuestosService.js
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const repuestosCollection = collection(db, 'repuestos');

const saveRepuesto = async (repuesto) => {
  await addDoc(repuestosCollection, repuesto);
};

const updateRepuesto = async (repuesto) => {
  const repuestoRef = doc(repuestosCollection, repuesto.id);
  await updateDoc(repuestoRef, repuesto);
};

const deleteRepuesto = async (id) => {
  const repuestoRef = doc(repuestosCollection, id);
  await deleteDoc(repuestoRef);
};

export { saveRepuesto, updateRepuesto, deleteRepuesto, repuestosCollection };
