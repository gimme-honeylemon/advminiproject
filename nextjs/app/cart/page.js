"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { Add, Remove, ShoppingCartOutlined, ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (id, change) => {
    setCartItems((items) => {
      const updated = items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleContinueShopping = () => router.push("/menu");

  const handleSendOrder = async () => {
    if (totalItems === 0) {
      alert("Your cart is empty!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login first to order!");
      return;
    }

    try {
      for (const item of cartItems.filter((i) => i.quantity > 0)) {
        await axios.post(
          "http://localhost:8008/orders",
          {
            status: "pending",
            item_id: item.id,
            quantity: item.quantity,
            total_price: item.price * item.quantity,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      alert(`Order sent! Total: $${totalPrice}`);
      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (err) {
      console.error("Order failed:", err);
      alert("Failed to send order.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FCFAF8", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box sx={{ padding: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleContinueShopping}
            sx={{
              color: "#2E4265",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              padding: 0,
            }}
          >
            Continue Shopping
          </Button>

          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              color: "#2E4265",
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            L'heure bleue
          </Typography>

          <Box sx={{ width: { xs: 80, sm: 100, md: 120 } }} />
        </Box>

        <Box sx={{ height: 1, backgroundColor: "#E0E0E0", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", mb: 2 }} />
      </Box>

      <Container maxWidth="md" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: "#2E4265",
            fontWeight: "bold",
            mb: 1,
            textAlign: "left",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Shopping Cart
        </Typography>

        <Typography
          sx={{
            color: "#666",
            textAlign: "left",
            mb: 4,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
          }}
        >
          You have <span style={{ color: "#FF6B6B" }}>{totalItems}</span>{" "}
          {totalItems === 1 ? "item" : "items"} in your cart.
        </Typography>

        {totalItems === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              p: { xs: 4, sm: 6, md: 8 },
              backgroundColor: "#E0EBFF",
              borderRadius: 4,
              mb: 4,
              minHeight: { xs: 200, sm: 250, md: 300 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <ShoppingCartOutlined sx={{ fontSize: { xs: 60, sm: 80, md: 100 }, color: "#2E4265", mb: 2 }} />
            <Typography
              variant="h5"
              sx={{
                color: "#2E4265",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "bold",
              }}
            >
              No item in your cart yet :(
            </Typography>
          </Box>
        ) : (
          <Box sx={{ mb: 4 }}>
            {cartItems
              .filter((item) => item.quantity > 0)
              .map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    mb: 2,
                    backgroundColor: "white",
                    borderRadius: 3,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item xs={2}>
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            color: "#2E4265",
                            fontWeight: "bold",
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            color: "#2E4265",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          ${item.price}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                          <IconButton onClick={() => updateQuantity(item.id, -1)}>
                            <Remove />
                          </IconButton>
                          <Typography variant="h6" sx={{ minWidth: 30, textAlign: "center" }}>
                            {item.quantity}
                          </Typography>
                          <IconButton onClick={() => updateQuantity(item.id, 1)}>
                            <Add />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
          </Box>
        )}

        {/* Footer */}
        <Box
          sx={{
            backgroundColor: "#E0EBFF",
            borderRadius: "16px 16px 0 0",
            p: { xs: 2, sm: 3, md: 4 },
            mt: "auto",
            position: "sticky",
            bottom: 0,
            boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h5" sx={{ color: "#2E4265", fontWeight: "bold" }}>
                Total
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={{ textAlign: "center", color: "#2E4265", fontWeight: "bold" }}>
                ${totalPrice}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={handleSendOrder}
                fullWidth
                disabled={totalItems === 0}
                sx={{
                  height: 50,
                  borderRadius: "25px",
                  backgroundColor: "#FFFFFF",
                  color: "#2E4265",
                  border: "2px solid #2E4265",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#2E4265", color: "#FFFFFF" },
                }}
              >
                Send Order
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
