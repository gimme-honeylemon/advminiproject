'use client';

import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import MenuCard from "@/components/MenuCard";

export default function MenuGrid() {
  const router = useRouter();

  const menuItems = [
    { title: "Americano", price: 10, image: "/Americano-.png" },
    { title: "Espresso", price: 15, image: "/Espresso.png" },
    { title: "Black Coffee", price: 10, image: "/Black Coffee.png" },
    { title: "Latte", price: 15, image: "/Latte.png" },
    { title: "Cappuccino", price: 20, image: "/Cappuccino.png" },
    { title: "Mocha", price: 10, image: "/Mocha.png", big: true }, // 👈 only Mocha bigger
    { title: "Macchiato", price: 20, image: "/Macchiato.png" },
    { title: "Flat White", price: 18, image: "/Flat White.png" },
    { title: "Matcha Latte", price: 20, image: "/Matcha.png" },
  ];

  const [totalQuantity, setTotalQuantity] = useState(Array(menuItems.length).fill(0));

  const handleQuantityChange = (index, quantity) => {
    const updated = [...totalQuantity];
    updated[index] = quantity;
    setTotalQuantity(updated);
  };

  const totalItems = totalQuantity.reduce((a, b) => a + b, 0);

  return (
    <Box sx={{ px: 2, py: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 9 }}>
        <Box sx={{ width: 120 }} />
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: "#2E4265",
            fontWeight: 'bold',
            textShadow: "1px 1px 2px rgba(1, 1, 1, 0.2)",
            textAlign: 'center',
            flexGrow: 1,
          }}
        >
          L'heure bleue
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 120, justifyContent: 'flex-end' }}>
          <Box sx={{ position: 'relative' }}>
            <IconButton onClick={() => router.push("/cart")} sx={{ color: "#2E4265" }}>
              <ShoppingCartIcon fontSize="large" />
            </IconButton>
            {totalItems > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  backgroundColor: "#2E4265",
                  color: "white",
                  borderRadius: "50%",
                  minWidth: 20,
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  px: 0.5,
                }}
              >
                {totalItems}
              </Box>
            )}
          </Box>
          <IconButton onClick={() => router.push("/")} sx={{ color: "#2E4265" }}>
            <HomeIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      {/* Menu Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
          gap: 3,
          justifyItems: 'center',
        }}
      >
        {menuItems.map((item, index) => (
          <MenuCard
            key={index}
            title={item.title}
            price={item.price}
            image={item.image}
            big={item.big || false}   // 👈 pass Mocha flag
            onQuantityChange={(q) => handleQuantityChange(index, q)}
          />
        ))}
      </Box>
    </Box>
  );
}
