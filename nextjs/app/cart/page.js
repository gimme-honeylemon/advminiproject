"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Container,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { Add, Remove, ShoppingCartOutlined, ArrowBack } from '@mui/icons-material';
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  
  // Cart items - starts empty, items will be added from menu page
  const [cartItems, setCartItems] = useState([]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleContinueShopping = () => {
    router.push("/menu");
  };

  const handleSendOrder = () => {
    if (totalItems === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`Order sent! Total: $${totalPrice}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FCFAF8',
        padding: 0
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: '#8C9EBE',
          padding: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={handleContinueShopping}
          sx={{
            color: "#2E4265",
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          Continue Shopping
        </Button>
        
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: "#2E4265",
            textShadow: "2px 2px 4px rgba(1, 1, 1, 0.2)",
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          L'heure bleue
        </Typography>

        <Box sx={{ width: 120 }} /> {/* Spacer for centering */}
      </Box>

      <Container maxWidth="md" sx={{ padding: 3 }}>
        {/* Shopping Cart Title */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: "#2E4265",
            fontWeight: 'bold',
            marginBottom: 1,
            textAlign: 'center'
          }}
        >
          Shopping Cart
        </Typography>

        {/* Cart Status */}
        <Typography
          sx={{
            color: "#666",
            textAlign: 'center',
            marginBottom: 4,
            fontSize: '1.1rem'
          }}
        >
          You have <span style={{ color: '#FF6B6B' }}>{totalItems}</span> <span style={{ color: '#FF6B6B' }}>{totalItems === 1 ? 'item' : 'items'}</span> in your cart.
        </Typography>

        {/* Empty Cart State */}
        {totalItems === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              padding: 6,
              backgroundColor: '#8C9EBE',
              borderRadius: 3,
              marginBottom: 4,
              opacity: 0.8
            }}
          >
            <ShoppingCartOutlined
              sx={{
                fontSize: 80,
                color: "#2E4265",
                marginBottom: 2
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: "#2E4265",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 'bold'
              }}
            >
              No item in your cart yet :(
            </Typography>
          </Box>
        )}

        {/* Cart Items */}
        <Box sx={{ marginBottom: 4 }}>
          {cartItems.filter(item => item.quantity > 0).map((item) => (
            <Card
              key={item.id}
              sx={{
                marginBottom: 2,
                backgroundColor: 'white',
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}
            >
              <CardContent sx={{ padding: 3 }}>
                <Grid container alignItems="center" spacing={3}>
                  {/* Coffee Image */}
                  <Grid item xs={2}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  </Grid>

                  {/* Item Name */}
                  <Grid item xs={4}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        color: "#2E4265",
                        fontWeight: 'bold'
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Grid>

                  {/* Price */}
                  <Grid item xs={2}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        color: "#2E4265",
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      ${item.price}
                    </Typography>
                  </Grid>

                  {/* Quantity Controls */}
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                      }}
                    >
                      <IconButton
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity === 0}
                        sx={{
                          backgroundColor: '#F5F5F5',
                          '&:hover': { backgroundColor: '#E0E0E0' },
                          '&:disabled': { backgroundColor: '#F5F5F5' }
                        }}
                      >
                        <Remove />
                      </IconButton>
                      
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          color: "#2E4265",
                          fontWeight: 'bold',
                          minWidth: 30,
                          textAlign: 'center'
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      
                      <IconButton
                        onClick={() => updateQuantity(item.id, 1)}
                        sx={{
                          backgroundColor: '#F5F5F5',
                          '&:hover': { backgroundColor: '#E0E0E0' }
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Cart Footer */}
        <Box
          sx={{
            backgroundColor: '#8C9EBE',
            borderRadius: 3,
            padding: 3,
            position: 'sticky',
            bottom: 20,
            opacity: 0.8
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={4}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "#2E4265",
                  fontWeight: 'bold'
                }}
              >
                Total
              </Typography>
            </Grid>
            
            <Grid item xs={4}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "#2E4265",
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                ${totalPrice}
              </Typography>
            </Grid>
            
            <Grid item xs={4}>
              <Button
                onClick={handleSendOrder}
                fullWidth
                sx={{
                  height: 50,
                  borderRadius: '25px',
                  backgroundColor: '#2E4265',
                  color: '#FFFFFF',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  '&:hover': { backgroundColor: '#1F2D4D' },
                  '&:disabled': { backgroundColor: '#8C9EBE' }
                }}
                disabled={totalItems === 0}
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