'use client';

import { Box } from "@mui/material";
import ButtonAppBar from "@/components/AppBar";
import Reader from "@/components/Header"; // fixed path

export default function Home() {
  return (
    <Box>
      {/* AppBar only on Home */}
      <ButtonAppBar />
      <Box>
        <Reader/>
        </Box>


    </Box>
  );
}
