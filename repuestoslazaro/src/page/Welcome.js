import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate} from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh', // Cambiado a minHeight para asegurar que ocupe al menos toda la altura de la pantalla
                textAlign: 'center',
                              
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Color blanco con opacidad del 50%
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Sombra ligera
            }}
        >
            <Typography variant="h3" gutterBottom>
                ¡Bienvenido!
            </Typography>
            <Typography variant="h5" gutterBottom>
                Gestiona tus repuestos fácilmente.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/repuestos')}
                sx={{ mt: 3 }}
            >
                Ingresar a la base de datos
            </Button>
        </Box>
        
        
 
    );
   
    
};


export default Welcome;
