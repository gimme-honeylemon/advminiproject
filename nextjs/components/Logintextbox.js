import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Logintextbox() {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
      noValidate
      autoComplete="off"
    >
      <Box display="flex" flexDirection="column">
        <TextField
          required
          id="outlined-email"
          label="Email address"
        />
        <TextField
          required
          id="outlined-password"
          label="Password"
          type="password"
        />
      </Box>
    </Box>
  );
}
