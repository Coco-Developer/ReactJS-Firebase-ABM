import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button, Box, CircularProgress, DialogActions } from '@mui/material';
import Popup from './Popup';
import { saveRepuesto, updateRepuesto } from '../services/RepuestosService';

const initialState = {
  FechaAlta: new Date().toISOString().split('T')[0],
  Nombre: '',
  Modelo: '',
  Descripcion: '',
  Precio: '',
  Cantidad: ''
};

const RepuestoForm = ({ currentRepuesto, onClose, onUpdateTable }) => {
  const [repuesto, setRepuesto] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    setRepuesto(currentRepuesto ? currentRepuesto : initialState);
  }, [currentRepuesto]);

  const handleChange = useCallback((e) => {
    setRepuesto(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleSaveRepuesto = useCallback(async () => {
    try {
      setLoading(true);
      if (currentRepuesto && currentRepuesto.id) {
        await updateRepuesto(repuesto);
       
      } else {
        await saveRepuesto(repuesto);
     
      }
      onUpdateTable();
      onClose();
    } catch (error) {
      console.error('Error al guardar el repuesto:', error);
      
    } finally {
      setLoading(false);
    }
  }, [currentRepuesto, onClose, onUpdateTable, repuesto]);

  const handlePopupOpen = useCallback(() => {
    if (currentRepuesto && currentRepuesto.id) {
      setPopup({ open: true, message: 'Repuesto actualizado', severity: 'success' });
    } else {
      setPopup({ open: true, message: 'Repuesto agregado', severity: 'success' });
    }
  }, [currentRepuesto]);

  const handlePopupClose = useCallback(() => {
    setPopup({ ...popup, open: false });
  }, [popup]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Box
      component="form"
      onSubmit={(e) => { e.preventDefault(); handleSaveRepuesto(); handlePopupOpen(); }}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2, backgroundColor: '#e0f7fa', borderRadius: 1 }}
    >
      <TextField
        name="Nombre"
        label="Nombre"
        value={repuesto.Nombre}
        onChange={handleChange}
        required
      />
      <TextField
        name="Modelo"
        label="Modelo"
        value={repuesto.Modelo}
        onChange={handleChange}
        required
      />
      <TextField
        name="Descripcion"
        label="Descripción"
        value={repuesto.Descripcion}
        onChange={handleChange}
        required
      />
      <TextField
        name="Precio"
        label="Precio"
        value={repuesto.Precio}
        onChange={handleChange}
        required
        type="number"
      />
      <TextField
        name="Cantidad"
        label="Cantidad"
        value={repuesto.Cantidad}
        onChange={handleChange}
        required
        type="number"
      />
      <TextField
        name="FechaAlta"
        label="Fecha Alta"
        type="date"
        value={repuesto.FechaAlta}
        onChange={handleChange}
        required
        InputLabelProps={{ shrink: true }}
      />

      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancelar</Button>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Guardar'}
        </Button>
      </DialogActions>

      <Popup
        open={popup.open}
        message={popup.message}
        severity={popup.severity}
        onClose={handlePopupClose}
      />
    </Box>
  );
};

export default RepuestoForm;
