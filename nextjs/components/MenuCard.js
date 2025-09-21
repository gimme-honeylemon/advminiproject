'use client';

import React, { useState } from 'react';
import { Card, Typography, Box, IconButton, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function MenuCard({ title, price, image, onQuantityChange }) {
  const [quantity, setQuantity] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleIncrease = () => {
    if (quantity < 20) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity); // immediately notify parent
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleDecrease = () => {
    const newQuantity = Math.max(quantity - 1, 0);
    setQuantity(newQuantity);
    onQuantityChange(newQuantity); // immediately notify parent
  };

  const handleCloseSnackbar = (_event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <>
      <Card
        sx={{
          width: 380,
          height: 410,
          borderRadius: 20,
          textAlign: 'center',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          border: '1px solid #2E4265',
        }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: 210,
            height: 210,
            borderRadius: '50%',
            objectFit: 'cover',
            mb: 2,
          }}
        />

        <Typography variant="subtitle1" fontWeight="bold">{title}</Typography>
        <Typography variant="body2">{price}$</Typography>

        <Box
          sx={{
            width: 224,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #2E4265',
            borderRadius: '30px',
            mt: 3,
            px: 1,
          }}
        >
          <IconButton size="small" onClick={handleDecrease}>
            <RemoveIcon fontSize="small" />
          </IconButton>

          <Box
            sx={{
              width: 59,
              height: 39,
              mx: 1,
              border: '1px solid #2E4265',
              borderRadius: '17.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>{quantity}</Typography>
          </Box>

          <IconButton size="small" onClick={handleIncrease}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          You have reached the maximum order quantity of 20.
        </Alert>
      </Snackbar>
    </>
  );
}
