"use client";

import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Snackbar, Alert } from '@mui/material';

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loginResult, setLoginResult] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setSnackbarMessage('Please enter email and password');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setLoginResult('');
      return;
    }

    setLoginResult(`Welcome, ${loginEmail}! You clicked Login.`);
    setSnackbarMessage('Login successful!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleSignUp = () => {
    setSnackbarMessage('Redirect to Sign Up page');
    setSnackbarSeverity('info');
    setOpenSnackbar(true);
    setLoginResult('');
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid
      container
      style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}
    >
      <form
        onSubmit={handleLoginSubmit}
        style={{
          width: 636,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          type="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          sx={{ height: 56 }}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          sx={{ height: 56 }}
        />

        <div style={{ display: 'flex', width: '100%', marginTop: 16, gap: 16 }}>
          <Button
            type="submit"
            fullWidth
            sx={{
              height: 56,
              borderRadius: 28,
              backgroundColor: '#2E4265',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#55709E',
              },
            }}
          >
            Login
          </Button>

          <Button
            fullWidth
            onClick={handleSignUp}
            sx={{
              height: 56,
              borderRadius: 28,
              backgroundColor: '#8C9EBE',
              color: '#2E4265',
              '&:hover': {
                backgroundColor: '#395380ff',
                color: '#FFFFFF',
                boxShadow: 3,
              },
            }}
          >
            Sign Up
          </Button>
        </div>

        {loginResult && (
          <Typography variant="subtitle1" color="primary" style={{ marginTop: 20 }}>
            {loginResult}
          </Typography>
        )}
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
