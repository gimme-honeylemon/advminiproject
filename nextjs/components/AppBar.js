"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";


export default function ButtonAppBar() {
  const route = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#8C9EBE", height: "130px" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // ✅ centers vertically
            gap: "140px",
            height: "100%", // ✅ ensures full height usage
          }}
        >
          <Button
            onClick={() => route.push("/menu")}
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "25px",
              color: "white",
              '&:hover': { color: '#1F2D4D' },
            }}
          >
            Menu
          </Button>
          <Button
            onClick={() => route.push("/cart")}
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "25px",
              color: "white",
              '&:hover': { color: '#1F2D4D' },
            }}
          >
            Cart
          </Button>
          <Button
            onClick={() => route.push("/login")}
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "25px",
              color: "white",
              '&:hover': { color: '#1F2D4D' },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
