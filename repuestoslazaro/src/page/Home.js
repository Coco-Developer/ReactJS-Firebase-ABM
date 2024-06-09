// src/page/Home.js
import React, { useState, useEffect } from 'react';
import RepuestosTable from '../components/RepuestosTable';
import RepuestoForm from '../components/RepuestoForm';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

const Home = () => {
  const [currentRepuesto, setCurrentRepuesto] = useState(null); 
  const [repuestos, setRepuestos] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'repuestos'), (snapshot) => {
      const repuestosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRepuestos(repuestosData);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (repuesto) => {
    setCurrentRepuesto(repuesto);
    setOpen(true);
  };

  const handleUpdateTable = () => {
    setOpen(false); 
  };

  const handleClose = () => {
    setCurrentRepuesto(null);
    setOpen(false);
  };

  const handleAdd = () => {
    setCurrentRepuesto(null);
    setOpen(true);
  };

  return (
    <div style={{ position: 'relative', paddingTop: '125px' }}>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        sx={{ position: 'fixed', top: '85px', zIndex: 1000 }}
      >
        Agregar Repuesto
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentRepuesto ? "Editar Repuesto" : "Agregar Repuesto"}</DialogTitle>
        <DialogContent>
          <RepuestoForm
            currentRepuesto={currentRepuesto}
            onClose={handleClose}
            onUpdateTable={handleUpdateTable}
          />
        </DialogContent>
      </Dialog>
      <RepuestosTable onEdit={handleEdit} repuestos={repuestos} />
    </div>
  );
};

export default Home;
