"use client";

import React, { useState } from "react";
import { TextField, Button, Grid, Typography, FormControlLabel, Checkbox, Link, Snackbar, Alert } from '@mui/material';
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      setSnackbarMessage('Please enter email and password');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      setSnackbarMessage('Please enter a valid email address');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (!acceptTerms) {
      setSnackbarMessage('Please accept the Terms and Conditions');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    // ✅ Login success
    setSnackbarMessage('Login successful!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);

    // 🔑 Save token to localStorage so Menu page knows user is logged in
    localStorage.setItem("token", "dummy_token_value"); // replace with real token from backend
    localStorage.setItem("user", JSON.stringify({ email: loginEmail }));

    setTimeout(() => {
      router.push("/menu"); // redirect to menu
    }, 1000);
  };

  const handleSnackbarClose = () => setOpenSnackbar(false);
  const handleRegister = () => router.push("/Register");

  return (
    <Grid container style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCFAF8' }}>
      <Grid item>
        <form
          onSubmit={handleLoginSubmit}
          style={{ width: 636, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Typography variant="h2" style={{
            fontFamily: "'Poppins', sans-serif",
            color: "#2E4265",
            marginBottom: 40,
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(1,1,1,0.2)",
          }}>
            L'heure bleue
          </Typography>

          <TextField fullWidth label="Email address" variant="outlined" margin="normal" type="text"
            value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} sx={{ height: 56 }}
          />
          <TextField fullWidth label="Password" variant="outlined" margin="normal" type="password"
            value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} sx={{ height: 56 }}
          />

          <Grid container alignItems="center" justifyContent="space-between" style={{ marginTop: 10 }}>
            <Grid item xs={10}>
              <FormControlLabel
                control={<Checkbox checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />}
                label="I accept the Terms and Conditions"
                sx={{ color: "#2E4265" }}
              />
            </Grid>
            <Grid item>
              <FormControlLabel control={<Checkbox />} label="Remember password" sx={{ color: "#2E4265" }} />
            </Grid>
            <Grid item>
              <Link href="#" underline="hover">Forgot password?</Link>
            </Grid>
          </Grid>

          <Grid container spacing={4} justifyContent="center" style={{ marginTop: 30 }}>
            <Grid item>
              <Button type="submit" sx={{
                height: 56,
                width: 167,
                fontWeight: 'bold',
                borderRadius: '80px',
                backgroundColor: '#2E4265',
                color: '#FFFFFF',
                '&:hover': { backgroundColor: '#8C9EBE', color: '#2E4265' },
              }}>
                Sign in
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleRegister} sx={{
                height: 56,
                width: 167,
                fontWeight: 'bold',
                borderRadius: '80px',
                backgroundColor: '#8C9EBE',
                color: '#2E4265',
                '&:hover': { backgroundColor: '#2E4265', color: '#FFFFFF' },
              }}>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>

        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
}
