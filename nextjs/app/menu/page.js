"use client";

import { useEffect, useState } from "react";
import { Box, IconButton, Typography, Snackbar, Alert } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import axios from "axios";
import MenuCard from "@/components/MenuCard";

export default function MenuGrid() {
  const router = useRouter();

  const [menuItems, setMenuItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ---------- Fetch menu and cart ----------
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:8008/menu");
        setMenuItems(res.data);
        setTotalQuantity(Array(res.data.length).fill(0));
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };
    fetchMenu();

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = storedCart.reduce((a, b) => a + b.quantity, 0);
    setCartCount(count);
  }, []);

  // Listen for cart updates from other pages
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((a, b) => a + b.quantity, 0);
      setCartCount(count);
    };
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  // ---------- Quantity change ----------
  const handleQuantityChange = (index, quantity) => {
    const updated = [...totalQuantity];
    updated[index] = quantity;
    setTotalQuantity(updated);
  };

  // ---------- Add to cart ----------
  const handleOrder = async (item, quantity) => {
    if (!token) {
      setSnackbar({
        open: true,
        message: "Login first to order",
        severity: "warning",
      });
      return;
    }
    if (quantity <= 0) return;

    // Update local cart
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = existingCart.findIndex((i) => i.id === item.id);

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push({
        id: item.id,
        name: item.product,
        price: item.price,
        image: item.image,
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    const count = existingCart.reduce((a, b) => a + b.quantity, 0);
    setCartCount(count);

    setSnackbar({
      open: true,
      message: `${item.product} added to cart!`,
      severity: "success",
    });

    // Send to backend
    try {
      await axios.post(
        "http://localhost:8008/orders",
        {
          status: "pending",
          item_id: item.id,
          quantity,
          total_price: item.price * quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.error("Failed to send order:", err);
      setSnackbar({
        open: true,
        message: "Failed to send order",
        severity: "error",
      });
    }
  };

  const totalItems = totalQuantity.reduce((a, b) => a + b, 0);

  return (
    <Box sx={{ px: 2, py: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 9 }}>
        <Box sx={{ width: 120 }} />
        <Typography
          variant="h4"
          sx={{ fontFamily: "'Poppins', sans-serif", color: "#2E4265", fontWeight: "bold", textShadow: "1px 1px 2px rgba(1,1,1,0.2)", textAlign: "center", flexGrow: 1 }}
        >
          L'heure bleue
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: 120, justifyContent: "flex-end" }}>
          <Box sx={{ position: "relative" }}>
            <IconButton onClick={() => router.push("/cart")} sx={{ color: "#2E4265" }}>
              <ShoppingCartIcon fontSize="large" />
            </IconButton>
            {cartCount > 0 && (
              <Box sx={{ position: "absolute", top: -5, right: -5, backgroundColor: "#2E4265", color: "white", borderRadius: "50%", minWidth: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: "bold", px: 0.5 }}>
                {cartCount}
              </Box>
            )}
          </Box>
          <IconButton onClick={() => router.push("/")} sx={{ color: "#2E4265" }}>
            <HomeIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      {/* Menu Grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 3, justifyItems: "center" }}>
        {menuItems.map((item, index) => (
          <MenuCard
            key={item.id}
            title={item.product}
            price={item.price}
            image={item.image}
            quantity={totalQuantity[index]}
            onQuantityChange={(q) => handleQuantityChange(index, q)}
            onOrder={() => handleOrder(item, 1)}
          />
        ))}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
