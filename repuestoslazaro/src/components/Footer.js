import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#282c34', padding: 2, textAlign: 'center', mt: 3 }}>
      <Typography variant="body2" color="white">
        © 2024 Repuestos App. - LAZARO 29009
      </Typography>
    </Box>
  );
};

export default Footer;
