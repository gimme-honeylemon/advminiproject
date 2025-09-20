"use client";

import React, { useState } from "react";
import { 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  Link,
  Box,
  Container
} from '@mui/material';
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration data:', formData);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FCFAF8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Column - Coffee Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}
            >
              {/* Coffee beans image */}
              <Box
                component="img"
                src="https://i.pinimg.com/736x/82/d5/97/82d597f5602bc309037a588ffe7c03e6.jpg"
                alt="Arabica Coffee"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 2
                }}
              />
            </Box>
          </Grid>

          {/* Right Column - Sign Up Form */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: 4,
                maxWidth: 500,
                margin: '0 auto'
              }}
            >
              {/* Main Heading */}
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "Fira Code iScript, Menlo, Monaco, 'Courier New', monospace",
                  color: "#2E4265",
                  marginBottom: 2,
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(1, 1, 1, 0.2)",
                }}
              >
                L'heure bleue
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: '#2E4265',
                  marginBottom: 1
                }}
              >
                Sign up
              </Typography>
              
              <Typography
                sx={{
                  color: '#666',
                  marginBottom: 3,
                  fontSize: '0.9rem'
                }}
              >
                Let's get you all set up so you can access your personal account.
              </Typography>

              <form onSubmit={handleSubmit}>
                {/* Name Fields */}
                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ height: 56 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ height: 56 }}
                    />
                  </Grid>
                </Grid>

                {/* Email and Phone Fields */}
                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ height: 56 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ height: 56 }}
                    />
                  </Grid>
                </Grid>

                {/* Password Fields */}
                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ height: 56 }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ height: 56 }}
                    />
                  </Grid>
                </Grid>

                {/* Terms Checkbox */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      sx={{ color: "#2E4265" }}
                    />
                  }
                  label={
                    <Typography sx={{ color: "#2E4265", fontSize: '0.9rem' }}>
                      I agree to all the{' '}
                      <Link href="#" underline="hover" sx={{ color: "#2E4265" }}>
                        Terms
                      </Link>
                      {' '}and{' '}
                      <Link href="#" underline="hover" sx={{ color: "#2E4265" }}>
                        Privacy Policies
                      </Link>
                    </Typography>
                  }
                  sx={{ marginBottom: 3 }}
                />

                {/* Create Account Button */}
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: '#2E4265',
                    color: '#FFFFFF',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginBottom: 2,
                    '&:hover': { backgroundColor: '#1F2D4D' },
                  }}
                >
                  Create account
                </Button>

                {/* Login Link */}
                <Typography sx={{ textAlign: 'center', color: '#666' }}>
                  Already have an account?{' '}
                  <Link 
                    href="#" 
                    onClick={handleLogin}
                    underline="hover" 
                    sx={{ color: "#2E4265", fontWeight: 'bold' }}
                  >
                    Login
                  </Link>
                </Typography>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}