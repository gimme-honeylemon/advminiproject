"use client";

import React, { useState } from "react";
import { TextField, Button, Grid, Typography, FormControlLabel, Checkbox, Link, Snackbar, Alert } from '@mui/material';
import { useRouter } from "next/navigation"; // ✅ import router

export default function LoginPage() {
  const router = useRouter(); // ✅ initialize router

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
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
    setSnackbarMessage('Login successful!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleRegister = () => {
    router.push("/Register"); // ✅ goes to /register page
  };

  return (
    <Grid
      container
      style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCFAF8' }}
    >
      <Grid item>
        <form
          onSubmit={handleLoginSubmit}
          style={{
            width: 636,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Heading */}
          <Typography
            variant="h2"
            style={{
              fontFamily: "Cinzel",
              color: "#2E4265",
              marginBottom: 40,
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            L'heure bleue
          </Typography>

          {/* Email & Password */}
          <TextField
            fullWidth
            label="Email address"
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

          {/* Checkboxes and Forgot password */}
          <Grid container alignItems="center" justifyContent="space-between" style={{ marginTop: 10 }}>
            <Grid item xs={10}>
              <FormControlLabel
                control={<Checkbox />}
                label="I accept the Terms and Conditions"
                sx={{ color: "#2E4265" }}
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                control={<Checkbox />}
                label="Remember password"
                sx={{ color: "#2E4265" }}
              />
            </Grid>

            <Grid item>
              <Link href="#" underline="hover">
                Forgot password?
              </Link>
            </Grid>
          </Grid>

          {/* Buttons side by side */}
          <Grid
            container
            spacing={4}
            justifyContent="center"
            style={{ marginTop: 30 }}
          >
            <Grid item>
              <Button
                type="submit"
                sx={{
                  height: 56,
                  width: 167,
                  borderRadius: 28,
                  backgroundColor: '#2E4265',
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: '#1F2D4D' },
                }}
              >
                Sign in
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleRegister} // ✅ navigate when clicked
                sx={{
                  height: 56,
                  width: 167,
                  borderRadius: 28,
                  backgroundColor: '#8C9EBE',
                  color: '#2E4265',
                  '&:hover': { backgroundColor: '#2E4265', color: '#FFFFFF' },
                }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
}
