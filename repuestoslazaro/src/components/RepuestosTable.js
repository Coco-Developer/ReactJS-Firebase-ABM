import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Box, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { Edit, Delete, GridOnOutlined, FormatListBulletedOutlined } from '@mui/icons-material';
import Popup from './Popup';
import { deleteRepuesto } from '../services/RepuestosService';
import { db } from '../firebaseConfig'; // Asegúrate de que esta sea la ruta correcta a tu configuración de firebase
import { collection, onSnapshot } from 'firebase/firestore';

const styles = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  },
};

const RepuestosTable = ({ onEdit }) => {
  const [repuestos, setRepuestos] = useState([]);
  const [popup, setPopup] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'repuestos'), (snapshot) => {
      const repuestosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRepuestos(repuestosData);
      setSearchResults(repuestosData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteRepuesto(id);
      setPopup({ open: true, message: 'Repuesto eliminado', severity: 'success' });
    } catch (error) {
      console.error('Error al eliminar el repuesto:', error);
      setPopup({ open: true, message: 'Error al eliminar el repuesto', severity: 'error' });
    }
  }, []);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
    const results = repuestos.filter(repuesto =>
      repuesto.Nombre.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  }, [repuestos]);

  const handleChangeView = useCallback(() => {
    const newViewMode = viewMode === 'grid' ? 'list' : 'grid';
    setViewMode(newViewMode);
  }, [viewMode]);

  const handlePopupClose = useCallback(() => {
    setPopup({ ...popup, open: false });
  }, [popup]);

  return (
    <>
      
      <Box style={styles.overlay} sx={{ textAlign: 'right', marginBottom: 2 }}>
      <TextField
        type="text"
        placeholder="Buscar repuesto"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginBottom: 2, width: '100%' }}
      />
        <IconButton onClick={handleChangeView}>
          {viewMode === 'grid' ? <GridOnOutlined /> : <FormatListBulletedOutlined />}
        </IconButton>
      </Box>
      {viewMode === 'grid' ? (
        <Box style={styles.overlay} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {searchResults.map(repuesto => (
            <Box key={repuesto.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.33% - 16px)' }, padding: 2, border: '1px solid #ddd', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                {repuesto.Nombre}
              </Typography>
              <Typography>
                <strong>Modelo:</strong> {repuesto.Modelo}
              </Typography>
              <Typography>
                <strong>Descripción:</strong> {repuesto.Descripcion}
              </Typography>
              <Typography>
                <strong>Precio:</strong> ${repuesto.Precio}
              </Typography>
              <Typography>
                <strong>Cantidad:</strong> {repuesto.Cantidad}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <IconButton onClick={() => onEdit(repuesto)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(repuesto.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((repuesto) => (
                <TableRow key={repuesto.id}>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {repuesto.Nombre}
                    </Typography>
                  </TableCell>
                  <TableCell>{repuesto.Modelo}</TableCell>
                  <TableCell>{repuesto.Descripcion}</TableCell>
                  <TableCell>${repuesto.Precio}</TableCell>
                  <TableCell>{repuesto.Cantidad}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEdit && onEdit(repuesto)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(repuesto.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Popup
        open={popup.open}
        message={popup.message}
        severity={popup.severity}
        onClose={handlePopupClose}
      />
    </>
  );
};

export default RepuestosTable;
