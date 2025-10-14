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

  // ---------- State ----------
  const [menuItems, setMenuItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ---------- Get token from localStorage ----------
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ---------- Hardcoded menu (fallback if backend fails) ----------
  // const fallbackMenu = [
  //   { id: 1, product: "Americano", price: 10, image: "/Americano.png" },
  //   { id: 2, product: "Espresso", price: 15, image: "/Espresso.png" },
  //   { id: 3, product: "Black Coffee", price: 10, image: "/Black Coffee.png" },
  //   { id: 4, product: "Latte", price: 15, image: "/Latte.png" },
  //   { id: 5, product: "Cappuccino", price: 20, image: "/Cappuccino.png" },
  //   { id: 6, product: "Mocha", price: 10, image: "/Mocha.png", big: true },
  //   { id: 7, product: "Macchiato", price: 20, image: "/Macchiato.png" },
  //   { id: 8, product: "Flat White", price: 18, image: "/Flat White.png" },
  //   { id: 9, product: "Matcha", price: 20, image: "/Matcha.png" },
  // ];

  // ---------- Fetch menu from backend ----------
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:8008/menu");
        setMenuItems(res.data);
        setTotalQuantity(Array(res.data.length).fill(0));
      } catch (err) {
        console.error("Error fetching menu, using fallback:", err);
        setMenuItems(fallbackMenu);
        setTotalQuantity(Array(fallbackMenu.length).fill(0));
      }
    };
    fetchMenu();
  }, []);

  // ---------- Handle quantity change ----------
  const handleQuantityChange = (index, quantity) => {
    const updated = [...totalQuantity];
    updated[index] = quantity;
    setTotalQuantity(updated);
  };

  // ---------- Handle order click ----------
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

    try {
      const total_price = item.price * quantity;

      const res = await axios.post(
        "http://localhost:8008/orders",
        {
          status: "pending",
          item_id: item.id,
          quantity: quantity,
          total_price: total_price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token to backend
          },
        }
      );

      console.log("Order success:", res.data);

      setSnackbar({
        open: true,
        message: `${item.product} ordered successfully!`,
        severity: "success",
      });
    } catch (err) {
      console.error("Order failed:", err);
      setSnackbar({
        open: true,
        message: "Order failed. Try again.",
        severity: "error",
      });
    }
  };

  const totalItems = totalQuantity.reduce((a, b) => a + b, 0);

  return (
    <Box sx={{ px: 2, py: 2 }}>
      {/* ---------- Header ---------- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 9,
        }}
      >
        <Box sx={{ width: 120 }} />
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: "#2E4265",
            fontWeight: "bold",
            textShadow: "1px 1px 2px rgba(1, 1, 1, 0.2)",
            textAlign: "center",
            flexGrow: 1,
          }}
        >
          L'heure bleue
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: 120,
            justifyContent: "flex-end",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <IconButton
              onClick={() => router.push("/cart")}
              sx={{ color: "#2E4265" }}
            >
              <ShoppingCartIcon fontSize="large" />
            </IconButton>
            {totalItems > 0 && (
              <Box
                sx={{
                  position: "absolute",
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

      {/* ---------- Menu Grid ---------- */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          justifyItems: "center",
        }}
      >
        {Array.isArray(menuItems) &&
          menuItems.map((item, index) => (
            <MenuCard
              key={item.id || index}
              title={item.product || item.title}
              price={item.price}
              image={item.image || `/${item.product}.png`}
              big={item.product === "Mocha" || item.big}
              quantity={totalQuantity[index]}
              onQuantityChange={(q) => handleQuantityChange(index, q)}
              onOrder={() => handleOrder(item, totalQuantity[index])}
            />
          ))}
      </Box>

      {/* ---------- Snackbar ---------- */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
