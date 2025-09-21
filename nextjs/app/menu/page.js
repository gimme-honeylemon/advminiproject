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
    { title: "Coffee", price: 5, image: "/images/coffee.jpg" },
    { title: "Tea", price: 4, image: "/images/tea.jpg" },
    { title: "Cake", price: 6, image: "/images/cake.jpg" },
    { title: "Croissant", price: 3, image: "/images/croissant.jpg" },
    { title: "Sandwich", price: 7, image: "/images/sandwich.jpg" },
    { title: "Juice", price: 4, image: "/images/juice.jpg" },
    { title: "Smoothie", price: 6, image: "/images/smoothie.jpg" },
    { title: "Muffin", price: 3, image: "/images/muffin.jpg" },
    { title: "Bagel", price: 4, image: "/images/bagel.jpg" },
    { title: "Pancake", price: 5, image: "/images/pancake.jpg" },
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
      {/* Header with centered logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        
        {/* Left placeholder to balance the centered logo */}
        <Box sx={{ width: 120 }} /> {/* same width as icons container */}

        {/* Centered Logo / Title */}
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

        {/* Icons on right */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 120, justifyContent: 'flex-end' }}>
          {/* Cart */}
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

          {/* Home */}
          <IconButton onClick={() => router.push("/")} sx={{ color: "#2E4265" }}>
            <HomeIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      {/* Menu Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
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
            onQuantityChange={(q) => handleQuantityChange(index, q)}
          />
        ))}
      </Box>
    </Box>
  );
}
