'use client';

import { Box } from "@mui/material";
import ButtonAppBar from "@/components/AppBar";
import Reader from "@/components/Header"; // fixed path
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Box>
      {/* AppBar only on Home */}
      <ButtonAppBar />
      <Box>
        <Reader/>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to the Home Page
        </Typography>
        </Box>
      </Box>
  );
}
